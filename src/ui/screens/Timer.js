import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, } from "react-native";
// import {  View } from 'react-native'
import styled from 'styled-components'

import timer_bg from '../../../assets/timer_bg.png';
import BackArrowButton from '../components/BackArrowButton';
import { size } from '../styles/size';
import pause_button_icon from '../../../assets/save_icon.png';
import timer_pause_button_bg from '../../../assets/timer_pause_button_bg.png';
import timer_continue_button_bg from '../../../assets/timer_continue_button_bg.png';
import { colors } from '../styles/colors';
import MarginVertical from '../components/MarginVertical';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import dayjs from 'dayjs';
import LinkIcon from '../components/LinkIcon';
import not_current_step_icon from '../../../assets/not_current_step_icon.png';
import snow_flake_icon_opacity from '../../../assets/snow_flake_icon_opacity.png';
import timer_pause_bg from '../../../assets/timer_pause_bg.png';
import timer_continue_icon from '../../../assets/timer_continue_icon.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserInfoStore } from '../../store/user';
import { useTodo } from '../../hooks/useTodo';
import { useNowTodoStore } from '../../store/todo';
import { getTimeDifference, minToHour } from '../../util';



const Timer = () => {
  // const [time, setTime] = useState(0);
  const [now, setNow] = useState(dayjs())
  const [isPause,setIsPause] = useState(false);
  const timeIndex = [now.subtract('30', 'm').format("h:mm"), "", now.format("A h:mm"), "", now.add('30', 'm').format("h:mm")]
  const navigation = useNavigation();
  const {nowTodo} = useNowTodoStore();
  const {userInfo} = useUserInfoStore();
  const {completeTodo, startTodo} = useTodo();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logId, setLogId] = useState(0);

  useEffect(() => {
    const startTimer = async () => {
      const storedStartTime = await AsyncStorage.getItem("startTime");
      let startTime = storedStartTime ? parseInt(storedStartTime, 10) : null;

      if (!startTime) {
        startTime = Date.now();
        await AsyncStorage.setItem("startTime", startTime.toString());
      }

      setIsRunning(true);

      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000)); // 경과 시간 (초 단위)
      }, 1000);

      return () => clearInterval(interval);
    };

    startTimer();
    startTodo(nowTodo.id,setLogId,nowTodo.linkApp);
  }, []);

  const handleComplete = async () => {
    setIsRunning(false);
    await AsyncStorage.removeItem("startTime"); // 완료하면 시작 시간 초기화
    completeTodo(logId, Math.floor(elapsedTime/60))
    navigation.navigate("CompleteTimer",{
      time:formatTime(elapsedTime)
    })
    setElapsedTime(0);

  };

  // 초를 분과 초로 변환하는 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hour = Math.floor(minutes/60);
    const remainingSeconds = seconds % 60;
    return `${hour}H ${minutes}M ${remainingSeconds}s`;
  };

  function convertToMinutes(timeStr) {
    const timeRegex = /(\d+)(H|M|S)/g;
    let totalMinutes = 0;

    let match;
    while ((match = timeRegex.exec(timeStr)) !== null) {
        const value = parseInt(match[1]);
        const unit = match[2];

        if (unit === "H") totalMinutes += value * 60;
        else if (unit === "M") totalMinutes += value;
        else if (unit === "S") totalMinutes += value / 60;
    }

    return Math.floor(totalMinutes);
  }



  return (
    <SafeAreaView>
      <TimerBody>
        <TimerHeader>
          <BackArrowButton/>
        </TimerHeader>
        <MarginVertical top={30}/>
        <SnowFlakeIcon color={'black'} size={20}/>
        <MarginVertical top={15}/>
        <TimerText>{`지금 ${userInfo.displayName} 님은\n눈 내리는 중!`}</TimerText>
        <MarginVertical top={25}/>
        <TimerCategory>{nowTodo.title}</TimerCategory>
        <TimerTime>{formatTime(elapsedTime)}</TimerTime>
        <MarginVertical top={10}/>
        <View style={{display:'flex', flexDirection:'row', gap:5, justifyContent:'center', alignItems:'center'}}>
          <LinkIcon size={20}/>
          <LinkedText>{nowTodo.linkApp}</LinkedText>
        </View>
        <MarginVertical top={40}/>
        <RestOfTimeText>{`${minToHour(convertToMinutes(getTimeDifference(nowTodo.startTime, nowTodo.endTime))-Math.floor(elapsedTime/60))}분만 더하면\n적금 채우기 완료!`}</RestOfTimeText>
        <MarginVertical top={10}/>
        <TimeBarArea>
          {timeIndex.map((el, index) => {
            return(
              <TimeBarEl key={index}>
                <CurrentTime>{el}</CurrentTime>
                {index===2 ? <SnowFlakeIcon color={'white'} size={48}/> : 
                <View style={{width:48, height:48, display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <Image source={index===0 ? snow_flake_icon_opacity : index === 1 ?  not_current_step_icon : null} style={{width:24, height:24}}/>
                </View>
                  }
                {index === 2 ? <CurrentBorderLine/> : <BorderLine/>}
              </TimeBarEl>
            )
          } )}
        </TimeBarArea>
        <PauseButton onPress={() => setIsPause(prev => !prev)} onLongPress={handleComplete}>
          <ButtonImage source={isPause ? timer_continue_button_bg : timer_pause_button_bg}/>
          <Image source={isPause ? timer_continue_icon : pause_button_icon} style={{width:48, height:34}}/>
          <MarginVertical top={12}/>
          <ButtonText>{isPause ? "계속하기" : "중지"}</ButtonText>
        </PauseButton>
      </TimerBody>
      <TimerBg source={isPause ? timer_pause_bg : timer_bg}/>
    </SafeAreaView>
  )
}

export default Timer


const TimerBody = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  display:flex;
  align-items:center;
`

const TimerBg = styled.Image`
  width:${size.width}px;
  position:absolute;
  top:0;
  z-index:-1;
`

const TimerHeader = styled.View`
  width:${size.width-50}px;
  height:50px;
  display:flex;
  justify-content:center;
`

const TimerText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:${colors.fontMain70};
  text-align:center;
`

const TimerCategory = styled.Text`
  font-size:26px;
  font-weight:600;
  color:${colors.fontMain80};
`

const TimerTime = styled.Text`
  font-size:42px;
  font-weight:600;
  color:${colors.fontMain};
`

const LinkedText = styled.Text`
  font-size:18px;
  font-weight:500,
  color:${colors.fontMain70};
`

const RestOfTimeText = styled.Text`
  font-size:14px;
  color:#fff;
  text-align:center;
  font-weight:500;
`

const TimeBarArea = styled.View`
  display:flex;
  flex-direction:row;
  gap:20px;
  align-items:center;
  
`

const TimeBarEl = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
  gap:15px;
`

const CurrentTime = styled.Text`
  font-size:18px;
  font-weight:600;
  color:#fff;
`

const BorderLine = styled.View`
  width:.5px;
  height:300px;
  background-color:#fff;
`

const CurrentBorderLine = styled.View`
  width:2px;
  height:300px;
  background-color:#fff;
`

const PauseButton = styled.TouchableOpacity`
  width:${size.width}px;
  height:126px;
  position:absolute;
  bottom:50px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const ButtonImage = styled.Image`
  z-index:-1;
  position:absolute;
  bottom:0;
`

const ButtonText = styled.Text`
  font-size:18px;
  font-weight:600;
  color:${colors.fontMain};
`



// const TimerScreen = () => {
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const startTimer = async () => {
//       const storedStartTime = await AsyncStorage.getItem("startTime");
//       let startTime = storedStartTime ? parseInt(storedStartTime, 10) : null;

//       if (!startTime) {
//         startTime = Date.now();
//         await AsyncStorage.setItem("startTime", startTime.toString());
//       }

//       setIsRunning(true);

//       const interval = setInterval(() => {
//         setElapsedTime(Math.floor((Date.now() - startTime) / 1000)); // 경과 시간 (초 단위)
//       }, 1000);

//       return () => clearInterval(interval);
//     };

//     startTimer();
//   }, []);

//   const handleComplete = async () => {
//     setIsRunning(false);
//     await AsyncStorage.removeItem("startTime"); // 완료하면 시작 시간 초기화
//     setElapsedTime(0);
//     navigation.navigate("CompleteTimer")
//   };

//   // 초를 분과 초로 변환하는 함수
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}분 ${remainingSeconds}초`;
//   };

//   return (
//     <View style={{width:size.width, height:size.height, justifyContent:'center', alignItems:'center'}}> 
      
//     </View>
//   );
// };

// export default TimerScreen;
