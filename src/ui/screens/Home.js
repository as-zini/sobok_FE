import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

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
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetInfo } from '../../hooks/useGetInfo';
import { useUserInfoStore } from '../../store/user';
import axios from 'axios';
import { getTimeDifference, minToHour } from '../../util';
import { useInstallmentSaving } from '../../hooks/useInstallmentSaving';
import { useRoutine } from '../../hooks/useRoutine';
import { useTodo } from '../../hooks/useTodo';
import dayjs from 'dayjs';
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore)

const Home = () => {
  const [isAssetAddModalVisible, setIsAssetAddModalVisible] = useState(false);
  const navigation = useNavigation();
  const {getUserInfo} = useGetInfo();
  const {userInfo, setUserInfo} = useUserInfoStore();
  const {getSavingCount} = useInstallmentSaving();
  const [savingCount, setSavingCount] = useState(0);
  const {getRoutineCount} = useRoutine();
  const [routineCount, setRoutineCount] = useState(0);
  const {getTodayTodo} = useTodo();
  const [todayTodo, setTodayTodo] = useState([]);
  const [nowTodo, setNowTodo] = useState([]);

  const getUser = async() => {
    const token = await AsyncStorage.getItem("access_token")
    console.log(token)
    return(JSON.parse(token));
  }

  const getTimesAfter = (timeString, data) => {
    const timeArray = timeString.split(':');
    const referenceTime = dayjs().hour(timeArray[0]).minute(timeArray[1]).second(timeArray[2]);
  
    // 주어진 시간보다 뒤에 있는 시간들만 필터링
    return data.filter((el) => {
      const time = dayjs().hour(el.startTime.split(':')[0])
        .minute(el.startTime.split(':')[1])
        .second(el.startTime.split(':')[2]);
  
      return referenceTime.isBefore(time); // referenceTime보다 뒤에 있는 시간
    }).length;
  };



  


  useEffect(() => {
    getUser();
    console.log(getUser());
    getUserInfo();
    getSavingCount(setSavingCount);
    getRoutineCount(setRoutineCount);
    getTodayTodo(setTodayTodo, setNowTodo);
    // setNowTodo()
    // console.log(todayTodo.find((el) => {
    //   const timeString = el.startTime;
    //   const timeArray = timeString.split(':');
      
    //   const time = dayjs().hour(timeArray[0]).minute(timeArray[1]).second(timeArray[2]);
      
    //   console.log(time.format()); // 오늘 날짜와 함께 주어진 시간 출력
    // }))
    // const timeArray = timeString.split(':');

    // const time = dayjs().hour(timeArray[0]).minute(timeArray[1]).second(timeArray[2]);

    // console.log(time.format()); // 오늘 날짜와 함께 주어진 시간 출력
    console.log("now", nowTodo)
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
      <HomeBody>
        <View style={{display:'flex', alignItems:'flex-end', width:size.width, marginRight:25}}>
          <ContinuitySuccess/>
        </View>
        <MarginVertical top={25}/>
        <View style={{display:'flex', justifyContent:'flex-start', width:328}}>
          <UserName>{`${userInfo.displayName} 님!`}</UserName>
          <MarginVertical top={5}/>
          <View style={{display:'flex', flexDirection:'row',alignItems:'center'}}>
            <HomeText>오늘도 열심히{"\n"}시간을 모아봐요!</HomeText>
          </View>
        </View>
        <MarginVertical top={17}/>
        <TodoArea>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', position:'absolute', zIndex:4, width:300, top:25, left:25}}>
            <View style={{flexGrow:1}}>
            <TodoTime>{`${nowTodo.startTime?.slice(0,5)} - ${nowTodo.endTime?.slice(0,5)}`}</TodoTime>
            <MarginVertical top={5}/>
            <TodoText>{`${nowTodo.title} 외 ${getTimesAfter(nowTodo.startTime, todayTodo)}개`}</TodoText>
            <MarginVertical top={10}/>
            <TodoDuringTime>{`${getTimeDifference(nowTodo.startTime, nowTodo.endTime)}`}</TodoDuringTime>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("TodayTodo")}>
              <Image source={go_todo_icon} style={{width:64, height:50, marginRight:25, marginTop:40}}/>
            </TouchableOpacity>
          </View>
          <TodoBgArea>
            <TodoAreaBg source={home_main_square_bg}/>
            <Image source={home_square_middle} style={{position:'absolute', top:0, left:10, zIndex:2}}/>
            <Image source={home_square_small} style={{position:'absolute', top:10, left:20}}/>
          </TodoBgArea>
        </TodoArea>
        <MarginVertical top={50}/>
        <TotalTimeArea>
          <TotalTimeTitle>나의 총 시간</TotalTimeTitle>
          <MarginVertical top={5}/>
          <View style={{display:'flex', flexDirection:'row'}}>
            <TotalTimeText>{minToHour(userInfo.totalAchievedTime)}</TotalTimeText>
          </View>
          <MarginVertical top={17}/>
          <TotalTimeList>
            <TotalTimeEl onPress={() => navigation.navigate("ViewSave")}>
              <View style={{flexGrow:.5}}>
                <TotalTimeIcon source={installment_saving_icon} style={{width:40, height:30}}/>
              </View>
              <View style={{display:'flex', flexGrow:2}}>
                <TotalTimeCategory>적금</TotalTimeCategory>
                <TotalTimeCount>{`${savingCount}개`}</TotalTimeCount>
              </View>
              <TotalTimeClock>{minToHour(userInfo.totalAccountBalance)}</TotalTimeClock>
              
            </TotalTimeEl>
            <BorderLine/>
            <TotalTimeEl onPress={() => navigation.navigate("ViewRoutine")}>
              <View style={{flexGrow:.5}}>
                <TotalTimeIcon source={routine_icon} style={{width:40, height:25}}/>
              </View>
              <View style={{display:'flex', flexGrow:2}}>
                <TotalTimeCategory>루틴</TotalTimeCategory>
                <TotalTimeCount>{`${routineCount}개`}</TotalTimeCount>
              </View>
              <TotalTimeClock>{minToHour(userInfo.weeklyRoutineTime)}</TotalTimeClock>
            </TotalTimeEl>
            <BorderLine/>
            <TotalTimeEl onPress={() => navigation.navigate("ViewPoint")}>
              <View style={{flexGrow:.5}}>
                <TotalTimeIcon source={point_icon} style={{width:40, height:40}}/>
              </View>
              <View style={{display:'flex', flexGrow:2}}>
                <TotalTimeCategory>포인트</TotalTimeCategory>
              </View>
              <TotalTimeClock>{`${userInfo.point}P`}</TotalTimeClock>
            </TotalTimeEl>
          </TotalTimeList>
        </TotalTimeArea>
        <View style={{marginTop:20, marginBottom:50}} >
          <Button text={"자산 추가하기"} handleButton={() => setIsAssetAddModalVisible(true)}/>
        </View>
        <AssetAddModal isAssetAddModalVisible={isAssetAddModalVisible} setIsAssetAddModalVisible={setIsAssetAddModalVisible}/>
      </HomeBody>
      </ScrollView>
      <HomeBg source={home_bg}/>
    </SafeAreaView>
  )
}

export default Home


const HomeBody = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  width:${size.width}px;
  height:800px;
  `

const HomeBg = styled.Image`
  position:absolute;
  top:0;
  width:${size.width}px;
  height:${size.height}px;
  z-index:-1;
`

const UserName = styled.Text`
  font-weight:700;
  font-size:16px;
  color:${colors.fontSub};
`

const HomeText = styled.Text`
  font-weight:700;
  font-size:24px;
  color:${colors.fontMain};
  flex-grow:2;
`

const TodoArea = styled.View`
`

const TodoBgArea = styled.View`
`

const TodoAreaBg = styled.Image`
  z-index:3;
`

const TodoTime = styled.Text`
  z-index:3;
  font-size:14px;
  font-weight:500;
  color:#fff;
`

const TodoText = styled.Text`
  z-index:3;
  font-size:18px;
  font-weight:500;
  color:#fff;
`

const TodoDuringTime = styled.Text`
  z-index:3;
  font-weight:500;
  font-size:48px;
  color:#fff;
`

const TotalTimeTitle = styled.Text`
  font-size:16px;
  font-weight:700;
  color:#777;
`

const TotalTimeText = styled.Text`
  font-weight:700;
  font-size:24px;
  color:${colors.fontSub};
  flex-grow:1;
`

const TotalTimeArea = styled.View`
  width:327px;

`

const TotalTimeList = styled.View`
  width:327px;
  height:223px;
  background-color:#fff;
  border-radius:16px;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:20px;
  box-sizing:border-box;
  gap:
`

const TotalTimeEl = styled.TouchableOpacity`
  display:flex;
  flex-direction:row;
  width:264px;
  align-items:center;
`

const TotalTimeIcon = styled.Image`
  
`

const TotalTimeCategory = styled.Text`
  font-weight:600;
  font-size:16px;
  color:${colors.fontSub};
`

const TotalTimeCount = styled.Text`
  font-weight:500;
  font-size:12px;
  color:#777;
`

const TotalTimeClock = styled.Text`
  font-weight:600;
  font-size:18px;
  color:${colors.fontSub};
`

const BorderLine = styled.View`
  background-color:#777;
  height:.4px;
  width:264px;
  margin: 20px 0;
  z-index:5;
`





