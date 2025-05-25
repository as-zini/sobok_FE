

// import React, { useState, useEffect } from 'react';
// import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
// import styled from 'styled-components';

// import timer_bg from '../../../assets/timer_bg.png';
// import timer_pause_bg from '../../../assets/timer_pause_bg.png';
// import pause_button_icon from '../../../assets/save_icon.png';
// import timer_pause_button_bg from '../../../assets/timer_pause_button_bg.png';
// import timer_continue_button_bg from '../../../assets/timer_continue_button_bg.png';
// import timer_continue_icon from '../../../assets/timer_continue_icon.png';

// import { size } from '../styles/size';
// import { colors } from '../styles/colors';
// import BackArrowButton from '../components/BackArrowButton';
// import SnowFlakeIcon from '../components/SnowFlakeIcon';
// import MarginVertical from '../components/MarginVertical';
// import LinkIcon from '../components/LinkIcon';

// import dayjs from 'dayjs';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from '@react-navigation/native';
// import { useUserInfoStore } from '../../store/user';
// import { useTodo } from '../../hooks/useTodo';
// import { useNowTodoStore } from '../../store/todo';
// import { getTimeDifference, minToHour } from '../../util';

// const Timer = () => {
//   const [now] = useState(dayjs());
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [isPause, setIsPause] = useState(false);
//   const [intervalId, setIntervalId] = useState(null);
//   const [startTime, setStartTime] = useState(null);
//   const [logId, setLogId] = useState(0);

//   const timeIndex = [
//     now.subtract(30, 'minute').format("h:mm"),
//     "",
//     now.format("A h:mm"),
//     "",
//     now.add(30, 'minute').format("h:mm")
//   ];

//   const navigation = useNavigation();
//   const { nowTodo } = useNowTodoStore();
//   const { userInfo } = useUserInfoStore();
//   const { completeTodo, startTodo } = useTodo();

//   // 타이머 시작
//   useEffect(() => {
//     const initTimer = async () => {
//       const storedStartTime = await AsyncStorage.getItem("startTime");
//       const savedStartTime = storedStartTime ? parseInt(storedStartTime, 10) : Date.now();
//       await AsyncStorage.setItem("startTime", savedStartTime.toString());

//       setStartTime(savedStartTime);
//       startInterval(savedStartTime);
//       startTodo(nowTodo.id, setLogId, nowTodo.linkApp);
//     };

//     initTimer();

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, []);

//   const startInterval = (startTimeValue) => {
//     const id = setInterval(() => {
//       setElapsedTime(Math.floor((Date.now() - startTimeValue) / 1000));
//     }, 1000);
//     setIntervalId(id);
//   };

//   const handlePauseToggle = async () => {
//     if (isPause) {
//       // 계속하기
//       const resumedStartTime = Date.now() - elapsedTime * 1000;
//       setStartTime(resumedStartTime);
//       await AsyncStorage.setItem("startTime", resumedStartTime.toString());
//       startInterval(resumedStartTime);
//     } else {
//       // 중지
//       if (intervalId) {
//         clearInterval(intervalId);
//         setIntervalId(null);
//       }
//     }

//     setIsPause(prev => !prev);
//   };

//   const handleComplete = async () => {
//     if (intervalId) clearInterval(intervalId);
//     await AsyncStorage.removeItem("startTime");
//     completeTodo(logId, Math.floor(elapsedTime / 60));
//     navigation.navigate("CompleteTimer", {
//       time: formatTime(elapsedTime)
//     });
//     setElapsedTime(0);
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const hour = Math.floor(minutes / 60);
//     const remainingSeconds = seconds % 60;
//     return `${hour}H ${minutes}M ${remainingSeconds}s`;
//   };

//   const convertToMinutes = (timeStr) => {
//     const timeRegex = /(\d+)(H|M|S)/g;
//     let totalMinutes = 0;
//     let match;

//     while ((match = timeRegex.exec(timeStr)) !== null) {
//       const value = parseInt(match[1]);
//       const unit = match[2];
//       if (unit === "H") totalMinutes += value * 60;
//       else if (unit === "M") totalMinutes += value;
//       else if (unit === "S") totalMinutes += value / 60;
//     }

//     return Math.floor(totalMinutes);
//   };

//   return (
//     <SafeAreaView>
//       <TimerBody>
//         <TimerHeader>
//           <BackArrowButton />
//         </TimerHeader>
//         <MarginVertical top={30} />
//         <SnowFlakeIcon color={'black'} size={20} />
//         <MarginVertical top={15} />
//         <TimerText>{`지금 ${userInfo.displayName} 님은\n눈 내리는 중!`}</TimerText>
//         <MarginVertical top={25} />
//         <TimerCategory>{nowTodo.title}</TimerCategory>
//         <TimerTime>{formatTime(elapsedTime)}</TimerTime>
//         <MarginVertical top={10} />
//         <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
//           <LinkIcon size={20} />
//           <LinkedText>{nowTodo.linkApp}</LinkedText>
//         </View>
//         <MarginVertical top={40} />
//         <RestOfTimeText>{`${minToHour(convertToMinutes(getTimeDifference(nowTodo.startTime, nowTodo.endTime)) - Math.floor(elapsedTime / 60))}분만 더하면\n적금 채우기 완료!`}</RestOfTimeText>
//         <MarginVertical top={10} />
//         <TimeBarArea>
//           {timeIndex.map((el, index) => (
//             <TimeBarEl key={index}>
//               <CurrentTime>{el}</CurrentTime>
//               {index === 2 ? (
//                 <SnowFlakeIcon color={'white'} size={48} />
//               ) : (
//                 <View style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center' }}>
//                   <Image
//                     source={
//                       index === 0
//                         ? require('../../../assets/snow_flake_icon_opacity.png')
//                         : index === 1
//                         ? require('../../../assets/not_current_step_icon.png')
//                         : null
//                     }
//                     style={{ width: 24, height: 24 }}
//                   />
//                 </View>
//               )}
//               {index === 2 ? <CurrentBorderLine /> : <BorderLine />}
//             </TimeBarEl>
//           ))}
//         </TimeBarArea>
//         <PauseButton onPress={handlePauseToggle} onLongPress={handleComplete}>
//           <ButtonImage source={isPause ? timer_continue_button_bg : timer_pause_button_bg} />
//           <Image source={isPause ? timer_continue_icon : pause_button_icon} style={{ width: 48, height: 34 }} />
//           <MarginVertical top={12} />
//           <ButtonText>{isPause ? "계속하기" : "중지"}</ButtonText>
//         </PauseButton>
//       </TimerBody>
//       <TimerBg source={isPause ? timer_pause_bg : timer_bg} />
//     </SafeAreaView>
//   );
// };

// export default Timer;

// // 스타일 컴포넌트
// const TimerBody = styled.View`
//   width: ${size.width}px;
//   height: ${size.height}px;
//   display: flex;
//   align-items: center;
// `;

// const TimerBg = styled.Image`
//   width: ${size.width}px;
//   position: absolute;
//   top: 0;
//   z-index: -1;
// `;

// const TimerHeader = styled.View`
//   width: ${size.width - 50}px;
//   height: 50px;
//   display: flex;
//   justify-content: center;
// `;

// const TimerText = styled.Text`
//   font-size: 18px;
//   font-weight: 500;
//   color: ${colors.fontMain70};
//   text-align: center;
// `;

// const TimerCategory = styled.Text`
//   font-size: 26px;
//   font-weight: 600;
//   color: ${colors.fontMain80};
// `;

// const TimerTime = styled.Text`
//   font-size: 42px;
//   font-weight: 600;
//   color: ${colors.fontMain};
// `;

// const LinkedText = styled.Text`
//   font-size: 18px;
//   font-weight: 500;
//   color: ${colors.fontMain70};
// `;

// const RestOfTimeText = styled.Text`
//   font-size: 14px;
//   color: #fff;
//   text-align: center;
//   font-weight: 500;
// `;

// const TimeBarArea = styled.View`
//   flex-direction: row;
//   gap: 20px;
//   align-items: center;
// `;

// const TimeBarEl = styled.View`
//   justify-content: center;
//   align-items: center;
//   gap: 15px;
// `;

// const CurrentTime = styled.Text`
//   font-size: 18px;
//   font-weight: 600;
//   color: #fff;
// `;

// const BorderLine = styled.View`
//   width: 0.5px;
//   height: 300px;
//   background-color: #fff;
// `;

// const CurrentBorderLine = styled.View`
//   width: 2px;
//   height: 300px;
//   background-color: #fff;
// `;

// const PauseButton = styled.TouchableOpacity`
//   width: ${size.width}px;
//   height: 126px;
//   position: absolute;
//   bottom: 50px;
//   justify-content: center;
//   align-items: center;
// `;

// const ButtonImage = styled.Image`
//   z-index: -1;
//   position: absolute;
//   bottom: 0;
// `;

// const ButtonText = styled.Text`
//   font-size: 18px;
//   font-weight: 600;
//   color: ${colors.fontMain};
// `;



// import React, { useEffect, useRef } from 'react';
// import { SafeAreaView, View, Animated } from 'react-native';
// import styled from 'styled-components/native';

// const Timer = () => {
//   const lineX = useRef(new Animated.Value(0)).current; // 세로선 시작 위치 (0)

//   useEffect(() => {
//     Animated.timing(lineX, {
//       toValue: -150, // 왼쪽으로 150px 이동
//       duration: 3000, // 5초 동안
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' }}>
//       {/* 목표 지점 표시 */}
//       <Target />
      
//       {/* 움직이는 세로선 */}
//       <Animated.View
//         style={{
//           width: 2,
//           height: 200,
//           backgroundColor: 'white',
//           position: 'absolute',
//           transform: [{ translateX: lineX }],
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// export default Timer;

// // 스타일 컴포넌트
// const Target = styled.View`
//   width: 2px;
//   height: 200px;
//   background-color: red;
//   position: absolute;
//   left: 100px;
// `;



import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing, Image, SafeAreaView, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import styled from 'styled-components';

import timer_bg from '../../../assets/timer_bg.png';
import timer_pause_bg from '../../../assets/timer_pause_bg.png';
import pause_button_icon from '../../../assets/save_icon.png';
import timer_pause_button_bg from '../../../assets/timer_pause_button_bg.png';
import timer_continue_button_bg from '../../../assets/timer_continue_button_bg.png';
import timer_continue_icon from '../../../assets/timer_continue_icon.png';

import { size } from '../styles/size';
import { colors } from '../styles/colors';
import BackArrowButton from '../components/BackArrowButton';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import MarginVertical from '../components/MarginVertical';
import LinkIcon from '../components/LinkIcon';
import snow_flake_icon_opacity from '../../../assets/snow_flake_icon_opacity.png'

import dayjs from 'dayjs';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { useUserInfoStore } from '../../store/user';
import { useTodo } from '../../hooks/useTodo';
import { useNowTodoStore } from '../../store/todo';
import { getTimeDifference, minToHour } from '../../util';

const screenWidth = Dimensions.get('window').width;

const Timer = () => {
  const [now] = useState(dayjs());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [logId, setLogId] = useState(0);

  const [barList, setBarList] = useState(() => Array.from({ length: 6 }, (_, i) => now.add(i * 5, 'minute').format("H:mm")));
  const moveX = useRef(new Animated.Value(0)).current;
  const [centerIndex, setCenterIndex] = useState(0);

  const barWidth = 20;
  const gapWidth = 70;
  const fullItemWidth = barWidth + gapWidth;
  const visibleBars = 6;

  const navigation = useNavigation();
  const { nowTodo } = useNowTodoStore();
  const { userInfo } = useUserInfoStore();
  const { completeTodo, startTodo } = useTodo();

  const startLooping = () => {
    Animated.loop(
      Animated.timing(moveX, {
        toValue: -fullItemWidth,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    console.log("time now!",nowTodo)
  },[])

  useEffect(() => {
    const initTimer = async () => {
      const storedStartTime = await AsyncStorage.getItem("startTime");
      const savedStartTime = storedStartTime ? parseInt(storedStartTime, 10) : Date.now();
      await AsyncStorage.setItem("startTime", savedStartTime.toString());

      setStartTime(savedStartTime);
      startInterval(savedStartTime);
      startTodo(nowTodo[0].id, setLogId, nowTodo[0].linkApp);

      startLooping();
    };

    initTimer();

    return () => {
      if (intervalId) clearInterval(intervalId);
      moveX.stopAnimation();
    };
  }, []);

  useEffect(() => {
    const id = moveX.addListener(({ value }) => {
      if (Math.abs(value) >= fullItemWidth) {
        moveX.setValue(0);
        setBarList(prev => {
          const [first, ...rest] = prev;
          return [...rest, dayjs(first, "H:mm").add(30, 'minute').format("H:mm")];
        });
      }
    });

    return () => moveX.removeListener(id);
  }, []);

  const startInterval = (startTimeValue) => {
    const id = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeValue) / 1000));
    }, 1000);
    setIntervalId(id);
  };

  const handlePauseToggle = async () => {
    if (isPause) {
      startInterval(startTime);
      startLooping();
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      moveX.stopAnimation();
    }
    setIsPause(prev => !prev);
  };

  const handleComplete = async () => {
    if (intervalId) clearInterval(intervalId);
    await AsyncStorage.removeItem("startTime");
    completeTodo(logId, Math.floor(elapsedTime / 60));
    navigation.navigate("CompleteTimer", {
      time: formatTime(elapsedTime)
    });
    setElapsedTime(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hour = Math.floor(minutes / 60);
    const remainingSeconds = seconds % 60;
    return `${hour}H ${minutes % 60}M ${remainingSeconds}s`;
  };

  const convertToMinutes = (timeStr) => {
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
  };

  return (
    <SafeAreaView>
      <TimerBody>
        {/* ====== 상단 정보 영역 ====== */}
        <TimerHeader>
          <BackArrowButton />
        </TimerHeader>
        <MarginVertical top={30} />
        <SnowFlakeIcon color={'black'} size={20} />
        <MarginVertical top={15} />
        <TimerText>{`지금 ${userInfo.displayName} 님은\n눈 내리는 중!`}</TimerText>
        <MarginVertical top={25} />
        <TimerCategory>{nowTodo[0].title}</TimerCategory>
        <TimerTime>{formatTime(elapsedTime)}</TimerTime>
        <MarginVertical top={10} />
        <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
          <LinkIcon size={20} />
          <LinkedText>{nowTodo[0].linkApp}</LinkedText>
        </View>
        <MarginVertical top={40} />
        <RestOfTimeText>{`${minToHour(convertToMinutes(getTimeDifference(nowTodo[0].startTime, nowTodo[0].endTime)) - Math.floor(elapsedTime / 60))}분만 더하면\n적금 채우기 완료!`}</RestOfTimeText>
        <MarginVertical top={10} />
        <View style={{width:size.width}}>
          <View style={{flexDirection:'row', width:size.width/2, justifyContent:'space-between', position:'absolute', left:30, alignItems:'center'}}>
            <Image source={snow_flake_icon_opacity} style={{width:24,height:24}}/>
            <Image source={snow_flake_icon_opacity} style={{width:24,height:24}}/>
            <SnowFlakeIcon size={48} color={"white"}/>
          </View>
        </View>
        <MarginVertical top={20}/>
        
        {/* ====== 타임바 무한 회전 영역 ====== */}
        <TimeBarArea>
          <Animated.View style={{ flexDirection: 'row', transform: [{ translateX: moveX }] }}>
            {barList.map((el, index) => (
              <TimeBarEl key={index}>
                {index === centerIndex ? (
                  <CenterBar />
                ) : (
                  <NormalBar />
                )}
              </TimeBarEl>
            ))}
          </Animated.View>
        </TimeBarArea>

        {/* ====== Pause / Complete 버튼 영역 ====== */}
        <PauseButton onPress={handlePauseToggle} onLongPress={handleComplete}>
          <ButtonImage source={isPause ? timer_continue_button_bg : timer_pause_button_bg} />
          <Image source={isPause ? timer_continue_icon : pause_button_icon} style={{ width: 48, height: 34 }} />
          <MarginVertical top={12} />
          <ButtonText>{isPause ? "계속하기" : "중지"}</ButtonText>
        </PauseButton>
      </TimerBody>
      <TimerBg source={isPause ? timer_pause_bg : timer_bg} />
    </SafeAreaView>
  );
};

export default Timer;

const TimerBody = styled.View`
  width: ${size.width}px;
  height: ${size.height}px;
  display: flex;
  align-items: center;
`;

const TimerBg = styled.Image`
  width: ${size.width}px;
  height:${size.height+50}px;
  position: absolute;
  top: 0;
  z-index: -1;
  
`;

const TimerHeader = styled.View`
  width: ${size.width - 50}px;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const TimerText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.fontMain70};
  text-align: center;
`;

const TimerCategory = styled.Text`
  font-size: 26px;
  font-weight: 600;
  color: ${colors.fontMain80};
`;

const TimerTime = styled.Text`
  font-size: 42px;
  font-weight: 600;
  color: ${colors.fontMain};
`;

const LinkedText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.fontMain70};
`;

const RestOfTimeText = styled.Text`
  font-size: 14px;
  color: #fff;
  text-align: center;
  font-weight: 500;
`;

const TimeBarArea = styled.View`
  width: 100%;
  height: 300px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const TimeBarEl = styled.View`
  justify-content: center;
  align-items: center;
  margin: 0 35px; /* ✅ 간격 넓게 */
`;

const NormalBar = styled.View`
  width: 0.5px;
  height: 200px;
  background-color: #fff;
  margin-right:20px;
`;

const CenterBar = styled.View`
  width: 2px;
  height: 300px;
  background-color: #fff;
  margin-right:20px;
`;

const PauseButton = styled.TouchableOpacity`
  width: ${size.width}px;
  height: 126px;
  position: absolute;
  bottom: 50px;
  justify-content: center;
  align-items: center;
`;

const ButtonImage = styled.Image`
  width:100%;
  z-index: -1;
  position: absolute;
  bottom: 0;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.fontMain};
`;

