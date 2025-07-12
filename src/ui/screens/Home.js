import React, { useCallback, useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styled from '@emotion/native';

import home_bg from '../../../assets/home_bg.png';
import snow_flake_icon_white from '../../../assets/snow_flake_icon_white.png';
import home_main_square_bg from '../../../assets/home_main_square_bg.png';
import home_square_middle from '../../../assets/home_sqaure_middle.png';
import home_square_small from '../../../assets/home_square_small.png';
import go_todo_icon from '../../../assets/phone_number_auth_icon.png';
import installment_saving_icon from '../../../assets/save_icon.png';
import routine_icon from '../../../assets/routine_icon.png';
import point_icon from '../../../assets/point_icon.png';
import { size } from '../styles/size';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import NavigateArrowButton from '../components/NavigateArrowButton';
import Button from '../components/Button';
import ContinuitySuccess from '../components/ContinuitySuccess';
import AssetAddModal from '../components/AssetAddModal';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetInfo } from '../../hooks/useGetInfo';
import { useUserInfoStore } from '../../store/user';
import { useInstallmentSaving } from '../../hooks/useInstallmentSaving';
import { useRoutine } from '../../hooks/useRoutine';
import { useTodo } from '../../hooks/useTodo';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useNowTodoStore } from '../../store/todo';
import SaveTimeAtHome from '../components/SaveTimeAtHome';
import saving_time_home_bg from '../../../assets/saving_time_home_bg.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSaveTime } from '../../hooks/useSaveTime';
import smile_icon from '../../../assets/smile_icon.png';
import home_button_bg from '../../../assets/home_button_bg.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import baseUrl from '../../api/baseURL';
import { getTimeDifference, minToHour } from '../../util';

dayjs.extend(isSameOrBefore);

const Home = () => {
  const [isAssetAddModalVisible, setIsAssetAddModalVisible] = useState(false);
  const navigation = useNavigation();
  const { getUserInfo, getContinuitySuccess } = useGetInfo();
  const { userInfo, setUserInfo } = useUserInfoStore();
  const { getSavingCount } = useInstallmentSaving();
  const [savingCount, setSavingCount] = useState(0);
  const { getRoutineCount } = useRoutine();
  const [routineCount, setRoutineCount] = useState(0);
  const { getTodayTodo, getNowTodo } = useTodo();
  const [todayTodo, setTodayTodo] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const { nowTodo } = useNowTodoStore();
  const { getTotalSpareTime } = useSaveTime();
  const [spareTimeTotal, setSpareTimeTotal] = useState({});

  const getTimesAfter = (timeString, data) => {
    const [hour, minute, second] = timeString?.split(':');
    const referenceTime = dayjs().hour(hour).minute(minute).second(second);
    return data.filter(el => {
      const [h, m, s] = el.startTime.split(':');
      const time = dayjs().hour(h).minute(m).second(s);
      return referenceTime.isBefore(time);
    }).length;
  };

  const getToken = async () => {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    const accessToken = await AsyncStorage.getItem('access_token');
    console.log('refresh!!', refreshToken);
    console.log('access!!', accessToken);
  };

  useFocusEffect(
    useCallback(() => {
      getUserInfo(setIsReady, 'home');
      getRoutineCount(setRoutineCount);
      getSavingCount(setSavingCount);
      getTodayTodo(setTodayTodo, setIsReady);
      getNowTodo();
      getTotalSpareTime(setSpareTimeTotal);
    }, [isReady])
  );

  useEffect(() => {
    console.log('spare!!!', spareTimeTotal);
  }, [spareTimeTotal]);

  const isLoading = Object.keys(nowTodo).length > 1;

  useEffect(() => {
    console.log('now!!!!', nowTodo);
  }, [nowTodo]);

  return (
    <>
      <SafeAreaView>
        {!isReady ? null : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <HomeBody>
              <MarginVertical top={20} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: size.width - 60 }}>
                <ContinuitySuccess />
                <TouchableOpacity
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => navigation.navigate('Notification')}
                >
                  <Ionicons name="notifications" size={32} color="#fff" />
                </TouchableOpacity>
              </View>

              <MarginVertical top={25} />

              <View style={{ width: 328 }}>
                <UserName>{`${userInfo.displayName} 님!`}</UserName>
                <MarginVertical top={5} />
                <HomeText>오늘도 열심히{"\n"}시간을 모아봐요!</HomeText>
              </View>

              <MarginVertical top={17} />

              <TodoArea>
                <View style={{ position: 'absolute', zIndex: 4, width: 300, top: 25, left: 25 }}>
                  <View style={{ flexGrow: 1 }}>
                    { nowTodo.length > 0 &&!nowTodo[0]?.message ? (
                      <>
                        <TodoTime>{`${nowTodo[0]?.startTime.slice(0, 5)} - ${nowTodo[0]?.endTime.slice(0, 5)}`}</TodoTime>
                        <MarginVertical top={5} />
                        <TodoText>{`${nowTodo[0]?.title} 외 ${getTimesAfter(nowTodo[0]?.startTime, todayTodo)}개`}</TodoText>
                        <MarginVertical top={10} />
                      </>
                    ) : (
                      <>
                        <Text style={{ fontWeight: '500', color: '#fff', fontSize: 18, }}>어서오세요!</Text>
                        <MarginVertical top={9} />
                      </>
                    )}
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 30, justifyContent:'space-between' }}>
                      <TodoDuringTime style={{ fontSize: !nowTodo[0]?.message && nowTodo.length > 0 ? 48 : 34 }}>
                        {nowTodo?.length > 0 && !nowTodo[0]?.message
                          ? getTimeDifference(nowTodo[0].startTime, nowTodo[0].endTime)
                          : '오늘은\n할 일이 없어요!'}
                      </TodoDuringTime>
                      {!nowTodo[0]?.message && nowTodo.length > 0 ? (
                        <TouchableOpacity onPress={() => navigation.navigate('TodayTodo')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Image source={go_todo_icon} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                      ) : (
                        <Image source={smile_icon} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
                      )}
                    </View>
                  </View>
                </View>
                <TodoBgArea>
                  <TodoAreaBg source={home_main_square_bg} style={{zIndex:3}}/>
                  <Image source={home_square_middle} style={{ position: 'absolute', top: 0, left: 10, zIndex: 2 }} />
                  <Image source={home_square_small} style={{ position: 'absolute', top: 10, left: 20 }} />
                </TodoBgArea>
              </TodoArea>

              <MarginVertical top={50} />

              <TotalTimeArea>
                <TotalTimeTitle>{`${userInfo.displayName} 님의 총 시간`}</TotalTimeTitle>
                <MarginVertical top={5} />
                <TotalTimeText>{minToHour(userInfo.totalAchievedTime)}</TotalTimeText>
                <MarginVertical top={17} />
                <TotalTimeList>
                  <TotalTimeEl onPress={() => navigation.navigate('ViewSave')}>
                    <View style={{ maxWidth: 60, height: 30, justifyContent: 'center' }}>
                      <TotalTimeIcon source={installment_saving_icon} style={{ width: 40, height: 30 }} />
                    </View>
                    <View style={{ flex: 2 }}>
                      <TotalTimeCategory>적금</TotalTimeCategory>
                      <TotalTimeCount>{`${savingCount}개`}</TotalTimeCount>
                    </View>
                    <TotalTimeClock>{minToHour(userInfo.totalAccountBalance)}</TotalTimeClock>
                  </TotalTimeEl>

                  <BorderLine />

                  <TotalTimeEl onPress={() => navigation.navigate('ViewRoutine')}>
                    <View style={{ maxWidth: 60, height: 30, justifyContent: 'center' }}>
                      <TotalTimeIcon source={routine_icon} style={{ width: 40, height: 25 }} />
                    </View>
                    <View style={{ flex: 2 }}>
                      <TotalTimeCategory>루틴</TotalTimeCategory>
                      <TotalTimeCount>{`${routineCount}개`}</TotalTimeCount>
                    </View>
                    <TotalTimeClock>{minToHour(userInfo.weeklyRoutineTime)}</TotalTimeClock>
                  </TotalTimeEl>

                  <View style={{ height: 1, width: 264, marginVertical: 20, backgroundColor: '#f4f4f4' }} />

                  <TotalTimeEl onPress={() => navigation.navigate('ViewPoint')}>
                    <View style={{ maxWidth: 60, height: 30, justifyContent: 'center' }}>
                      <TotalTimeIcon source={point_icon} style={{ width: 40, height: 40 }} />
                    </View>
                    <View style={{ flex: 2 }}>
                      <TotalTimeCategory>포인트</TotalTimeCategory>
                    </View>
                    <TotalTimeClock>{`${userInfo.point}P`}</TotalTimeClock>
                  </TotalTimeEl>
                </TotalTimeList>
              </TotalTimeArea>

              <View style={{ marginTop: 20, marginBottom: 50 }}>
                <Button text="자산 추가하기" handleButton={() => setIsAssetAddModalVisible(true)} bg={home_button_bg} />
              </View>

              <View style={{ width: 327, flexDirection: 'row', alignItems: 'flex-end' }}>
                <SaveTimeTitle>{`${userInfo.displayName} 님의\n총 자투리 시간`}</SaveTimeTitle>
                <TouchableOpacity onPress={() => navigation.navigate('ViewSaveTime', { version: '' })}>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <SaveTimeBody>
                <SaveTimeAtHome totalList={spareTimeTotal} />
                <SaveTimeBg source={saving_time_home_bg} />
              </SaveTimeBody>

              <MarginVertical top={100} />

              <AssetAddModal
                isAssetAddModalVisible={isAssetAddModalVisible}
                setIsAssetAddModalVisible={setIsAssetAddModalVisible}
              />
            </HomeBody>
          </ScrollView>
        )}
        <HomeBg source={home_bg} />
      </SafeAreaView>
    </>
  );
};

export default Home;

const HomeBody = styled.View`
  justify-content: center;
  align-items: center;
  width: ${() => `${size.width}px`};
  padding-horizontal: 30px;
`;

const HomeBg = styled.Image`
  position: absolute;
  top: 0;
  width: ${() => `${size.width}px`};
  z-index: -1;
`;

const UserName = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: #4c4c4c;
`;

const HomeText = styled.Text`
  font-weight: 700;
  font-size: 24px;
  color: ${colors.fontMain};
  line-height:100%;
`;

const TodoArea = styled.View``;
const TodoBgArea = styled.View``;
const TodoAreaBg = styled.Image``;

const TodoTime = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;

const TodoText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
`;

const TodoDuringTime = styled.Text`
  font-weight: 600;
  color: #fff;
`;

const TotalTimeTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #777;
`;

const TotalTimeText = styled.Text`
  font-weight: 700;
  font-size: 24px;
  color: ${colors.fontSub};
  flex: 1;
`;

const TotalTimeArea = styled.View`
  width: 327px;
`;

const TotalTimeList = styled.View`
  width: 327px;
  background-color: #fff;
  border-radius: 16px;
  padding: 24px 32px;

`;

const TotalTimeEl = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 264px;
  gap:23px;
`;

const TotalTimeIcon = styled.Image``;

const TotalTimeCategory = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: ${colors.fontSub};
`;

const TotalTimeCount = styled.Text`
  font-weight: 500;
  font-size: 12px;
  color: #777;
`;

const TotalTimeClock = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${colors.fontSub};
`;

const BorderLine = styled.View`
  background-color: #f4f4f4;
  height: 0.4px;
  width: 264px;
  margin-vertical: 20px;
`;

const SaveTimeTitle = styled.Text`
  font-weight: 700;
  font-size: 20px;
  color: ${colors.gray77};
  flex: 1;
`;

const SaveTimeBody = styled.View`
  width: 327px;
  height: 240px;
`;

const SaveTimeBg = styled.Image`
  position: absolute;
  top: 20px;
  z-index: -1;
`;
