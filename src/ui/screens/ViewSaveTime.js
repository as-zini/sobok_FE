// ViewSaveTime.js
import React, { useCallback, useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styled from '@emotion/native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import savetime_bg from '../../../assets/savetime_bg.png';
import save_time_bg_first from '../../../assets/report_bg.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import BackArrowButton from '../components/BackArrowButton';
import TimeSliderBar from '../components/TimeSliderBar';
import MarginVertical from '../components/MarginVertical';
import WeekCalandar from '../components/WeekCalandar';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import Button from '../components/Button';
import { useSaveTime } from '../../hooks/useSaveTime';
import { minToHour } from '../../util';

const ViewSaveTime = ({ route }) => {
  const { version, username } = route.params;
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('dddd').toUpperCase()
  );
  const [spareTimeList, setSpareTimeList] = useState([]);
  const [durationByDay, setDurationByDay] = useState(0);
  const [usedSaveTimeMode, setUsedSaveTimeMode] = useState(false);

  const { getSpareTimeByDay } = useSaveTime();

  useFocusEffect(
    useCallback(() => {
      getSpareTimeByDay(selectedDate, setSpareTimeList, setDurationByDay);
    }, [selectedDate])
  );

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const handleSaveButton = () => {
    if (version === 'first') {
      navigation.reset({
        routes: [
          { name: 'StartAddAsset', params: { version: 'Saving' } }
        ]
      });
    } else {
      navigation.goBack();
    }
  };

  const dayToKo = {
    SUNDAY: '일요일',
    MONDAY: '월요일',
    TUESDAY: '화요일',
    WEDNESDAY: '수요일',
    THURSDAY: '목요일',
    FRIDAY: '금요일',
    SATURDAY: '토요일'
  };

  return (
    <SafeAreaView>
      <Body>
        <Header>
          <View style={{ position: 'absolute', left: 0 }}>
            <BackArrowButton />
          </View>
          {version !== 'first' && (
            <ModeButton onPress={() => setUsedSaveTimeMode(prev => !prev)}>
              <ModeText style={{ fontSize: usedSaveTimeMode ? 14 : 18 }}>
                {usedSaveTimeMode
                  ? '사용하고 있는\n자투리 시간'
                  : '자투리 시간'}
              </ModeText>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="white"
              />
            </ModeButton>
          )}
        </Header>

        <MarginVertical top={30} />
        <Image source={TimeIcon} style={{ width: 40, height: 48 }} />
        <MarginVertical top={15} />
        <TitleText style={{ color: colors.fontMain90 }}>
          {version === 'first'
            ? '자투리 시간'
            : `${dayToKo[selectedDate]}\n자투리 시간`}
        </TitleText>
        {version === 'first' && <MarginVertical top={10} />}
        <DurationText style={{ fontSize: version === 'first' ? 26 : 50 }}>
          {version === 'first'
            ? '자투리 시간이\n얼마나 생기나요?'
            : minToHour(durationByDay)}
        </DurationText>
        {version === 'first' && (
          <>
            <MarginVertical top={32} />
            <SnowFlakeIcon color="indigo" size={16} />
            <MarginVertical top={10} />
            <InfoText>
              {`${username} 님의 일상에서 생기는\n모든 자투리 시간을 알려주세요!`}
            </InfoText>
          </>
        )}

        <MarginVertical top={40} />
        <WeekCalandar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          version="day"
        />
        <MarginVertical top={32} />
        <HLine />

        <ScrollView
          style={{ maxHeight: version === 'first' ? '28%' : '38%' }}
          showsVerticalScrollIndicator={false}
        >
          <MarginVertical top={26} />
          {spareTimeList.map((el, idx) => (
            <View key={idx}>
              <Row onPress={() => navigation.navigate('AddSaveTime', { spareTimeEl: el, length: idx })}>
                <TimeLabel>
                  <LabelText style={{ color: '#fff' }}>{el.startTime}</LabelText>
                </TimeLabel>
                <Content>
                  <LabelText>{el.title}</LabelText>
                  <SubText>{`${el.startTime} - ${el.endTime}`}</SubText>
                </Content>
                <IconRow>
                  <Octicons name="clock" size={16} color="rgba(20,36,72,0.2)" />
                  <LabelText style={{ color: colors.indigoBlue }}>
                    {minToHour(el.duration)}
                  </LabelText>
                </IconRow>
              </Row>
              <MarginVertical top={12} />
            </View>
          ))}
          <Row onPress={() => navigation.navigate('AddSaveTime', { spareTimeEl: false, length: spareTimeList.length })}>
            <TimeLabel>
              <LabelText style={{ color: '#fff' }}>+</LabelText>
            </TimeLabel>
            <Content>
              <LabelText style={{ color: 'rgba(52,52,52,0.6)' }}>
                자투리 시간 추가하기
              </LabelText>
            </Content>
          </Row>
          <MarginVertical top={20} />
        </ScrollView>

        <Footer>
          <Button text="저장하기" handleButton={handleSaveButton} />
        </Footer>
      </Body>
      <Background
        source={version === 'first' ? save_time_bg_first : savetime_bg}
      />
    </SafeAreaView>
  );
};

export default ViewSaveTime;

// Styled (Emotion Native)
const Body = styled.View`
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
  padding: 0 30px;
`;

const Background = styled.Image`
  position: absolute;
  top: ${props => (props.version === 'first' ? '-750px' : '0')};
  z-index: -1;
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
`;

const Header = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const ModeButton = styled.TouchableOpacity`
  padding: 6px 12px;
  background-color: ${colors.indigoBlue50};
  border-radius: 29px;
  flex-direction: row;
  justify-content: space-between;
  width: 120px;
  align-items: center;
`;

const ModeText = styled.Text`
  color: #fff;
  text-align: center;
  flex-grow: 1;
  font-weight: 500;
`;

const TitleText = styled.Text`
  font-weight: 500;
  font-size: 18px;
`;

const DurationText = styled.Text`
  font-weight: 600;
  font-size: 50px;
  color: ${colors.fontMain};
`;

const InfoText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${colors.fontMain70};
  text-align: center;
`;

const TimeLabel = styled.View`
  width: 64px;
  height: 32px;
  border-radius: 15px;
  background-color: ${colors.indigoBlue50};
  justify-content: center;
  align-items: center;
`;

const LabelText = styled.Text`
  font-weight: 500;
  font-size: 18px;
  color: #343434;
`;

const SubText = styled.Text`
  font-size: 16px;
  color: rgba(112,113,114,0.8);
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  gap: 14px;
  align-items: flex-start;
`;

const Content = styled.View`
  flex-grow: 1;
  height: 40px;
  justify-content: center;
`;

const IconRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 3px;
`;

const HLine = styled.View`
  width: 310px;
  height: 0.8px;
  background-color: #fff;
`;

const Footer = styled.View`
  width: ${() => `${size.width}px`};
  height: 100px;
  position: absolute;
  bottom: 70px;
  right: 0;
  justify-content: center;
  align-items: center;
`;

const TimeIcon = require('../../../assets/time_icon.png');
