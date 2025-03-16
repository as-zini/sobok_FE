import React, { useRef, useState, useEffect } from "react";
import { View, Text, Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
import SnowFlakeIcon from "./SnowFlakeIcon";
import { minToHour } from "../../util";

const originalDays = ["일", "월", "화", "수", "목", "금", "토",""];
const loopedDays = [...originalDays, ...originalDays,...originalDays]; // 루프 구조로 만듦
const screenWidth = Dimensions.get("window").width;
const itemWidth = screenWidth / 3.5; // 간격 줄이기

const SaveTimeAtHome = ({totalList}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(originalDays.length);

  useEffect(() => {
    // 초기 중앙 인덱스 설정
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollToOffset({
          offset: itemWidth * originalDays.length,
          animated: false,
        });
      }
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
      newIndex += originalDays.length; // 처음으로 돌아감
      offsetX = newIndex * itemWidth;
    } else if (newIndex >= originalDays.length * 2) {
      newIndex -= originalDays.length; // 끝으로 돌아감
      offsetX = newIndex * itemWidth;
    }

    setSelectedIndex(newIndex); // 선택된 요일 업데이트

    listRef.current.scrollToOffset({
      offset: offsetX,
      animated: false,
    });
  };

  // 글자 크기를 동적으로 계산
  const calculateFontSize = (index) => {
    const distance = Math.abs(index - selectedIndex);
    const scale = 1 - Math.min(distance / 4, 1); // 가까울수록 크기가 커짐
    return 16 + scale * 8; // 기본 16px에서 8px까지 커짐
  };

  // 빨간색으로 바꿀 요소인지 체크
  const isRedText = (index) => {
    const distance = Math.abs(index - selectedIndex);
    return distance ===2; // 선택된 인덱스에서 3칸 떨어진 요소
  };

  const getSelectedDay = () => {
    const dayIndex = selectedIndex % originalDays.length;
    return originalDays[dayIndex];
  };

  const getSelectedTime = () => {
    const dayIndex = selectedIndex % originalDays.length; // 요일 인덱스 변환
    const timeMap = {
      0: minToHour(totalList.saturday), // 토요일
      1: minToHour(Object.values(totalList).reduce((sum,el) => sum+el, 0)), // 일요일
      2: minToHour(totalList.sunday), // 월요일
      3: minToHour(totalList.monday), // 화요일
      4: minToHour(totalList.tuesday), // 수요일
      5: minToHour(totalList.wednesday), // 수요일
      6: minToHour(totalList.thursday), // 목요일
      7: minToHour(totalList.friday)//금요일
    };
    return timeMap[dayIndex] || "3H 15M"; // 기본값
  };
  
  return (
    <Container>
      {/* selectedIndex 값에 따라 바뀌는 시간 표시 */}
      <TimeText>{getSelectedTime()}</TimeText>
      
      <SubText>{"의 자투리 시간이\n생깁니다!"}</SubText>
      <SnowFlakeIcon color={"white"} size={16} />
      
      <SliderContainer>
        {/* <Animated.FlatList
          ref={listRef}
          data={loopedDays}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={itemWidth}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: itemWidth * 3, // 중앙 정렬을 위한 패딩 추가
          }}
          onScroll={handleScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          renderItem={({ item, index }) => (
            <ItemContainer width={itemWidth}>
              <DayText
                style={{
                  fontSize: isRedText(index) ? 20 : 16,
                  color: isRedText(index) ? "rgba(255,255,255,1)" : "rgba(255,255,255,.6)",
                  fontWeight: isRedText(index) ? "600" : "500",
                }}
              >
                {item}
              </DayText>
              <Line style={{ height: isRedText(index) ? 26 : 16 }} />
            </ItemContainer>
          )}
        /> */}
        <Animated.FlatList
  ref={listRef}
  data={loopedDays}
  keyExtractor={(item, index) => index.toString()}
  horizontal
  showsHorizontalScrollIndicator={false}
  pagingEnabled
  snapToAlignment="center"
  snapToInterval={itemWidth}
  decelerationRate="fast"
  scrollEventThrottle={16} // 스크롤 이벤트 최적화
  onScroll={handleScroll}
  onMomentumScrollEnd={onMomentumScrollEnd}
  snapToOffsets={loopedDays.map((_, index) => index * itemWidth)} // 정확한 위치 지정
  contentContainerStyle={{
    paddingHorizontal: itemWidth * 3, // 중앙 정렬을 위한 패딩 추가
  }}
  renderItem={({ item, index }) => (
    <ItemContainer width={itemWidth}>
      <DayText
        style={{
          fontSize: isRedText(index) ? 20 : 16,
          color: isRedText(index) ? "rgba(255,255,255,1)" : "rgba(255,255,255,.6)",
          fontWeight: isRedText(index) ? "600" : "500",
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

// styled-components
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
  font-weight:500;
  text-align:center;
`;

const SelectedDayText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 20px;
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
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  color: ${({ isSelected }) => (isSelected ? "#4A90E2" : "#A0A0A0")};
  margin-bottom: 8px;
  margin-right:50px;
`;

const Line = styled.View`
  width: 2px;
  height: 16px;
  background-color: #e0e0e0;
  margin-right:50px;
`;

export default SaveTimeAtHome;