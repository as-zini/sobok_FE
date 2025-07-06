import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Text,
  View
} from 'react-native';
import styled from '@emotion/native';
import SnowFlakeIcon from './SnowFlakeIcon';
import { minToHour } from '../../util';

const originalDays = ['일', '월', '화', '수', '목', '금', '토', ''];
const loopedDays = [...originalDays, ...originalDays, ...originalDays];
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 3.5;

const SaveTimeAtHome = ({ totalList }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(originalDays.length);

  useEffect(() => {
    setTimeout(() => {
      listRef.current?.scrollToOffset({
        offset: itemWidth * originalDays.length,
        animated: false
      });
    }, 100);
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const onMomentumScrollEnd = (event) => {
    let offsetX = event.nativeEvent.contentOffset.x;
    let newIndex = Math.round(offsetX / itemWidth);

    if (newIndex < originalDays.length) {
      newIndex += originalDays.length;
      offsetX = newIndex * itemWidth;
    } else if (newIndex >= originalDays.length * 2) {
      newIndex -= originalDays.length;
      offsetX = newIndex * itemWidth;
    }

    setSelectedIndex(newIndex);
    listRef.current?.scrollToOffset({ offset: offsetX, animated: false });
  };

  const isRedText = (index) => Math.abs(index - selectedIndex) === 2;

  const getSelectedTime = () => {
    const dayIndex = selectedIndex % originalDays.length;
    const map = {
      0: minToHour(totalList.saturday),
      1: minToHour(Object.values(totalList).reduce((sum, e) => sum + e, 0)),
      2: minToHour(totalList.sunday),
      3: minToHour(totalList.monday),
      4: minToHour(totalList.tuesday),
      5: minToHour(totalList.wednesday),
      6: minToHour(totalList.thursday),
      7: minToHour(totalList.friday)
    };
    return map[dayIndex] || '3H 15M';
  };

  return (
    <Container>
      <TimeText>{getSelectedTime()}</TimeText>
      <SubText>의 자투리 시간이{`\n`}생깁니다!</SubText>
      <SnowFlakeIcon color="white" size={16} />

      <SliderContainer>
        <Animated.FlatList
          ref={listRef}
          data={loopedDays}
          keyExtractor={(_, idx) => idx.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={itemWidth}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onScroll={handleScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          snapToOffsets={loopedDays.map((_, i) => i * itemWidth)}
          contentContainerStyle={{ paddingHorizontal: itemWidth * 3 }}
          renderItem={({ item, index }) => (
            <ItemContainer width={itemWidth}>
              <DayText
                style={{
                  fontSize: isRedText(index) ? 20 : 16,
                  color: isRedText(index) ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)',
                  fontWeight: isRedText(index) ? '600' : '500'
                }}
              >
                {item}
              </DayText>
              <Line style={{ height: isRedText(index) ? 26 : 16 }} />
            </ItemContainer>
          )}
        />
      </SliderContainer>
    </Container>
  );
};

export default SaveTimeAtHome;

const Container = styled.View`
  align-items: center;
  margin-top: 50px;
`;

const TimeText = styled.Text`
  font-size: 34px;
  font-weight: 500;
  color: #fff;
`;

const SubText = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: 500;
  text-align: center;
`;

const SliderContainer = styled.View`
  width: 80%;
  height: 100px;
  overflow: hidden;
`;

const ItemContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
`;

const DayText = styled.Text`
  margin-right: 50px;
`;

const Line = styled.View`
  width: 2px;
  background-color: #e0e0e0;
  margin-right: 50px;
`;
