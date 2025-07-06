// AddSaveTime.js
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, View, TextInput } from 'react-native';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import savetime_bg from '../../../assets/savetime_bg.png';
import time_icon from '../../../assets/time_icon.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import BackArrowButton from '../components/BackArrowButton';
import MarginVertical from '../components/MarginVertical';
import WeekCalandar from '../components/WeekCalandar';
import TimeSliderBar from '../components/TimeSliderBar';
import Button from '../components/Button';
import { useSaveTime } from '../../hooks/useSaveTime';
import { getTimeDifference } from '../../util';

const AddSaveTime = ({ route }) => {
  const { spareTimeEl, length } = route.params;
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(
    spareTimeEl ? spareTimeEl.days.map(d => d.slice(0, 3)) : []
  );
  const [time, setTime] = useState({});
  const [title, setTitle] = useState('');

  const {
    handleSaveSpareTime,
    handleEditSpareTime,
    handleDeleteSpareTime
  } = useSaveTime();

  useEffect(() => {
    console.log(spareTimeEl, selectedDate);
  }, []);

  const handleSaveButton = () => {
    const payload = {
      title: title || (spareTimeEl?.title || ''),
      startTime: time.startTime,
      endTime: time.endTime,
      days: selectedDate.map(el =>
        el === 'MON'
          ? 'MONDAY'
          : el === 'TUE'
          ? 'TUESDAY'
          : el === 'WED'
          ? 'WEDNESDAY'
          : el === 'THU'
          ? 'THURSDAY'
          : el === 'FRI'
          ? 'FRIDAY'
          : el === 'SAT'
          ? 'SATURDAY'
          : 'SUNDAY'
      )
    };

    if (!spareTimeEl) {
      handleSaveSpareTime(payload);
    } else {
      handleEditSpareTime({ id: spareTimeEl.id, ...payload });
    }
  };

  const handleDeleteButton = () => {
    if (!spareTimeEl) {
      navigation.goBack();
    } else {
      handleDeleteSpareTime(spareTimeEl.id);
    }
  };

  return (
    <SafeAreaView>
      <Container showsVerticalScrollIndicator={false}>
        <Header>
          <View style={{ position: 'absolute', left: 0 }}>
            <BackArrowButton />
          </View>
          <HeaderText>자투리 시간</HeaderText>
        </Header>

        <MarginVertical top={30} />
        <Image source={time_icon} style={{ width: 35, height: 42 }} />
        <HeaderText style={{ color: colors.fontMain70 }}>
          {`자투리 시간 ${length + 1}`}
        </HeaderText>
        <MarginVertical top={10} />

        <TitleInput
          placeholder={spareTimeEl ? spareTimeEl.title : '자투리 시간 이름'}
          placeholderTextColor={colors.gray70}
          value={title}
          onChange={e => setTitle(e.nativeEvent.text)}
        />

        <MarginVertical top={56} />
        <SubHeaderText style={{ color: colors.gray70 }}>반복 요일</SubHeaderText>
        <MarginVertical top={16} />
        <WeekCalandar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          isDuplication
          version="day"
        />
        <MarginVertical top={65} />

        <TimeArea>
          <SubHeaderText style={{ color: colors.fontMain90 }}>총 시간</SubHeaderText>
          <SubHeaderText
            style={{ color: colors.fontMain90, fontSize: 26 }}
          >
            {getTimeDifference(time.startTime, time.endTime)}
          </SubHeaderText>
          <MarginVertical top={32} />
          <TimeSliderBar
            text="부터"
            setOutValue={setTime}
            version="start"
            type="time"
            timeInit={spareTimeEl?.startTime}
          />
          <MarginVertical top={65} />
          <TimeSliderBar
            text="까지"
            setOutValue={setTime}
            version="end"
            type="time"
            timeInit={spareTimeEl?.endTime}
          />
        </TimeArea>

        <MarginVertical top={105} />
        <Footer>
          <Button text="저장하기" handleButton={handleSaveButton} />
          <MarginVertical top={25} />
          <TrashButton onPress={handleDeleteButton}>
            <FontAwesome name="trash-o" size={24} color={colors.fontMain80} />
          </TrashButton>
          <MarginVertical top={20} />
        </Footer>
      </Container>
      <Background source={savetime_bg} />
    </SafeAreaView>
  );
};

export default AddSaveTime;

// Styled (Emotion Native)
const Container = styled.ScrollView`
  width: ${() => `${size.width}px`};
  padding: 0 30px;
`;

const Background = styled.Image`
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
  position: absolute;
  top: 0;
  z-index: -1;
`;

const Header = styled.View`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const TitleInput = styled(TextInput)`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.fontMain};
  width: 200px;
`;

const SubHeaderText = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const TimeArea = styled.View`
  align-items: center;
`;

const Footer = styled.View`
  width: 100%;
  align-items: center;
`;

const TrashButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

