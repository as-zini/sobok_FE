import React, { useCallback, useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, SectionList, Text, View } from 'react-native';
import styled from '@emotion/native';

import routine_icon from '../../../assets/routine_icon.png';
import installment_saving_bg from '../../../assets/installment_saving_bg.png';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import BackArrowButton from '../components/BackArrowButton';
import DropDownArrowButton from '../components/DropDownArrowButton';
import { size } from '../styles/size';
import AssetEl from '../components/AssetEl';
import WeekCalandar from '../components/WeekCalandar';
import dayjs from 'dayjs';
import { useRoutine } from '../../hooks/useRoutine';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { minToHour } from '../../util';
import { useFocusEffect } from '@react-navigation/native';

const ViewRoutineListScreen = () => {
  const [isList, setIsList] = useState(true);
  const WeekOfToday = dayjs().format('MMMM YYYY');
  const { getRoutineByList, getRoutineByCalandar } = useRoutine();
  const [routineInfo, setRoutineInfo] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().date());
  const [todayRoutineList, setTodayRoutineList] = useState([]);
  const [isNextMonth, setIsNextMonth] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (isList) {
        getRoutineByList(setRoutineInfo, setIsComplete);
      } else {
        getRoutineByCalandar(selectedDate, setTodayRoutineList, isNextMonth);
      }
    }, [isComplete, isList, selectedDate]),
  );

  const ingRoutine = routineInfo.filter(el => !el.isSuspended && !el.isCompleted);
  const suspendedRoutine = routineInfo.filter(el => el.isSuspended && !el.isCompleted);
  const completedRoutine = routineInfo.filter(el => el.isCompleted);

  const DataForList = [
    {
      title: ['진행 중인 루틴', ingRoutine.length],
      data: ingRoutine.map(el => [el.title, el.accountTitle, minToHour(el.duration), '', el.id]),
    },
    {
      title: ['보류한 루틴', suspendedRoutine.length],
      data: suspendedRoutine.map(el => [el.title, el.accountTitle, minToHour(el.duration), '', el.id]),
    },
    {
      title: ['완료한 루틴', completedRoutine.length],
      data: completedRoutine.map(el => [el.title, el.accountTitle, minToHour(el.duration), '', el.id]),
    },
  ];

  const RenderItem = ({ item, index }) => (
    <>
      <AssetEl item={item} index={index} isLink={!!item[2]} category="Routine" isTouchable />
      <MarginVertical top={50} />
    </>
  );

  const ListHeader = ({ title, version }) => (
    <>
      {title[0] === '만기된 적금' && <Divider />}
      <SectionEl>
        {version ? (
          <>
            <SectionTitle>{title[0]}</SectionTitle>
            <SectionCountText>{title[1]}</SectionCountText>
          </>
        ) : (
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#707172', marginBottom: -10 }}>{title}</Text>
        )}
      </SectionEl>
    </>
  );

  return (
    <SafeAreaView>
      <Container>
        <MarginVertical top={12} />
        <Header>
          <View style={{ position: 'absolute', left: 20 }}>
            <BackArrowButton isNotBack direction="Tabs" isReset />
          </View>
          <ToggleButton onPress={() => setIsList(prev => !prev)}>
            <ToggleButtonText>{isList ? '리스트' : '캘린더'}</ToggleButtonText>
            <MaterialIcons name="keyboard-arrow-right" size={20} color="#fff" />
          </ToggleButton>
        </Header>
        <MarginVertical top={45} />
        {isList ? (
          <TotalArea>
            <Image source={routine_icon} style={{ width: 51, height: 33 }} />
            <MarginVertical top={18} />
            <TotalText>{`총 ${routineInfo.filter(el => !el.isSuspended).length}개의 루틴`}</TotalText>
            <MarginVertical top={5} />
            <TotalTitle>{`${minToHour(routineInfo.filter(el => !el.isSuspended).reduce((sum, time) => sum + time.duration, 0))}`}</TotalTitle>
          </TotalArea>
        ) : (
          <>
            <Text style={{ fontWeight: '600', fontSize: 18, color: colors.darkGray }}>{WeekOfToday}</Text>
            <MarginVertical top={33} />
            <WeekCalandar selectedDate={selectedDate} setSelectedDate={setSelectedDate} setIsNextMonth={setIsNextMonth} version="date" />
            <MarginVertical top={58} />
            <View style={{ alignItems: 'flex-start', width: 310 }}>
              <SectionTitle>{`총 ${todayRoutineList.length}개의 루틴`}</SectionTitle>
            </View>
          </>
        )}
        <MarginVertical top={isList ? 72 : 23} />
        {isList ? (
          <ScrollView style={{ marginBottom: 200 }} showsVerticalScrollIndicator={false}>
            <SectionList
              sections={DataForList}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={RenderItem}
              renderSectionHeader={({ section: { title } }) => <ListHeader title={title} version={isList} />}
            />
          </ScrollView>
        ) : null}
        <ScrollView style={{ marginBottom: isList ? 0 : 620 }} showsVerticalScrollIndicator={false}>
          {!isList &&
            todayRoutineList.map((el, index) => (
              <View key={index}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#707172', marginBottom: -10 }}>{`${el.startTime.slice(0, 5)} - ${el.endTime.slice(0, 5)}`}</Text>
                <MarginVertical top={24} />
                <AssetEl item={[el.title, el.accountTitle, minToHour(el.duration), '', el.id]} index={index} isLink category="Routine" isTouchable />
                <MarginVertical top={40} />
              </View>
            ))}
        </ScrollView>
      </Container>
      <Background source={require('../../../assets/installment_saving_bg.png')} />
    </SafeAreaView>
  );
};

export default ViewRoutineListScreen;

const Container = styled.View`
  align-items: center;
  padding-horizontal: 30px;
  width: ${() => `${size.width}px`};
  height:  ${() => `${size.height}px`}px;
`;

const Background = styled.Image`
  position: absolute;
  top: 0;
  width: ${() => `${size.width}px`};
  height:  ${() => `${size.height}px`}px;
  z-index: -1;
  
`;

const Header = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ToggleButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding-horizontal: 20px;
  background-color: ${colors.indigoBlue50};
  border-radius: 29px;
`;

const ToggleButtonText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-right: -5px;
`;

const TotalArea = styled.View`
  width: 310px;
`;

const TotalText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.fontMain90};
`;

const TotalTitle = styled.Text`
  font-size: 48px;
  font-weight: 600;
  color: ${colors.fontMain};
`;

const SectionEl = styled.View`
  flex-direction: row;
  gap: 4px;
  margin-bottom: 35px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #707172;
`;

const SectionCountText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.indigoBlue};
`;

const Divider = styled.View`
  width: 310px;
  height: 0.8px;
  background-color: white;
  z-index: 9;
  margin-bottom: 30px;
`;
