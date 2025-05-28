

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



// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Animated,
//   Easing,
//   Image,
//   SafeAreaView,
//   View,
//   Dimensions
// } from 'react-native';
// import styled from 'styled-components/native';

// import timer_bg from '../../../assets/timer_bg.png';
// import timer_pause_bg from '../../../assets/timer_pause_bg.png';
// import pause_button_icon from '../../../assets/save_icon.png';
// import timer_pause_button_bg from '../../../assets/timer_pause_button_bg.png';
// import timer_continue_button_bg from '../../../assets/timer_continue_button_bg.png';
// import timer_continue_icon from '../../../assets/timer_continue_icon.png';
// import snow_flake_icon_opacity from '../../../assets/snow_flake_icon_opacity.png';

// import { size } from '../styles/size';
// import { colors } from '../styles/colors';
// import BackArrowButton from '../components/BackArrowButton';
// import SnowFlakeIcon from '../components/SnowFlakeIcon';
// import MarginVertical from '../components/MarginVertical';
// import LinkIcon from '../components/LinkIcon';

// import dayjs from 'dayjs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { useUserInfoStore } from '../../store/user';
// import { useTodo } from '../../hooks/useTodo';
// import { useNowTodoStore } from '../../store/todo';
// import { getTimeDifference, minToHour } from '../../util';

// const { width: screenWidth } = Dimensions.get('window');

// const Timer = () => {
//   const [now] = useState(dayjs());
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [isPause, setIsPause] = useState(false);
//   const [intervalId, setIntervalId] = useState(null);
//   const [startTime, setStartTime] = useState(null);
//   const [logId, setLogId] = useState(0);

//   const [barList, setBarList] = useState(() =>
//     Array.from({ length: 6 }, (_, i) =>
//       now.add(i * 5, 'minute').format('H:mm')
//     )
//   );

//   // 애니메이션 준비
//   const moveX = useRef(new Animated.Value(0)).current;
//   const barWidth = 0.5;
//   const gapWidth = 70;
//   const totalDistance = barWidth + gapWidth;
//   const cycleDuration = 3000;
//   const loopingAnim = useRef(
//     Animated.loop(
//       Animated.timing(moveX, {
//         toValue: -totalDistance,
//         duration: cycleDuration,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     )
//   ).current;

//   const navigation = useNavigation();
//   const { nowTodo } = useNowTodoStore();
//   const { userInfo } = useUserInfoStore();
//   const { completeTodo, startTodo } = useTodo();

//   // isPause에 따라 애니메이션 시작/멈춤
//   useEffect(() => {
//     if (isPause) {
//       loopingAnim.stop();
//     } else {
//       loopingAnim.start();
//     }
//   }, [isPause]);

//   // 초기 타이머 시작 및 백엔드 호출
//   useEffect(() => {
//     const init = async () => {
//       const stored = await AsyncStorage.getItem('startTime');
//       const saved = stored ? parseInt(stored, 10) : Date.now();
//       await AsyncStorage.setItem('startTime', saved.toString());
//       setStartTime(saved);

//       // elapsed 타이머
//       const id = setInterval(() => {
//         setElapsedTime(Math.floor((Date.now() - saved) / 1000));
//       }, 1000);
//       setIntervalId(id);

//       // 백엔드 기록 시작
//       startTodo(nowTodo[0].id, setLogId, nowTodo[0].linkApp);
//     };
//     init();
//     return () => {
//       intervalId && clearInterval(intervalId);
//       loopingAnim.stop();
//     };
//   }, []);

//   // moveX 값이 한 사이클 돌면 바 교체
//   useEffect(() => {
//     const listener = moveX.addListener(({ value }) => {
//       if (Math.abs(value) >= totalDistance) {
//         moveX.setValue(0);
//         setBarList(prev => {
//           const [first, ...rest] = prev;
//           return [
//             ...rest,
//             dayjs(first, 'H:mm').add(30, 'minute').format('H:mm'),
//           ];
//         });
//       }
//     });
//     return () => moveX.removeListener(listener);
//   }, []);

//   // pause toggle: 인터벌 & 애니메이션 제어
//   const handlePauseToggle = async () => {
//     // newPause: 클릭 후의 상태
//     const newPause = !isPause;

//     if (newPause) {
//       // ▶️ 중지
//       intervalId && clearInterval(intervalId);
//     } else {
//       // ▶️ 재개
//       // 멈춘 시점까지 elapsedTime을 기준으로 startTime 보정
//       const resumedStart = Date.now() - elapsedTime * 1000;
//       setStartTime(resumedStart);
//       await AsyncStorage.setItem('startTime', resumedStart.toString());

//       // 타이머 다시 시작
//       const id = setInterval(() => {
//         setElapsedTime(Math.floor((Date.now() - resumedStart) / 1000));
//       }, 1000);
//       setIntervalId(id);
//     }

//     // isPause 토글 (이후 useEffect에서 애니메이션 재제어)
//     setIsPause(newPause);
//   };

//   const handleComplete = async () => {
//     intervalId && clearInterval(intervalId);
//     await AsyncStorage.removeItem('startTime');
//     completeTodo(logId, Math.floor(elapsedTime / 60));
//     navigation.navigate('CompleteTimer', {
//       time: formatTime(elapsedTime),
//     });
//   };

//   const formatTime = sec => {
//     const m = Math.floor(sec / 60),
//           h = Math.floor(m / 60),
//           s = sec % 60;
//     return `${h}H ${m % 60}M ${s}s`;
//   };

//   const convertToMinutes = str => {
//     const re = /(\d+)(H|M|S)/g;
//     let total = 0, m;
//     while ((m = re.exec(str))) {
//       const v = parseInt(m[1], 10);
//       if (m[2] === 'H') total += v * 60;
//       else if (m[2] === 'M') total += v;
//       else total += v / 60;
//     }
//     return Math.floor(total);
//   };

//   return (
//     <SafeAreaView>
//       <TimerBody>
//         <TimerHeader><BackArrowButton/></TimerHeader>
//         <MarginVertical top={30}/>
//         <SnowFlakeIcon color="black" size={20}/>
//         <MarginVertical top={15}/>
//         <TimerText>{`지금 ${userInfo.displayName} 님은\n눈 내리는 중!`}</TimerText>
//         <MarginVertical top={25}/>
//         <TimerCategory>{nowTodo[0].title}</TimerCategory>
//         <TimerTime>{formatTime(elapsedTime)}</TimerTime>
//         <MarginVertical top={10}/>
//         <View style={{flexDirection:'row',gap:5,justifyContent:'center',alignItems:'center'}}>
//           <LinkIcon size={20}/>
//           <LinkedText>{nowTodo[0].linkApp}</LinkedText>
//         </View>
//         <MarginVertical top={40}/>
//         <RestOfTimeText>
//           {`${minToHour(
//             convertToMinutes(getTimeDifference(nowTodo[0].startTime, nowTodo[0].endTime))
//              - Math.floor(elapsedTime/60)
//           )}분만 더하면\n적금 채우기 완료!`}
//         </RestOfTimeText>
//         <MarginVertical top={10}/>
//         <View style={{width:size.width}}>
//           <View style={{
//             flexDirection:'row',
//             width:size.width/2,
//             justifyContent:'space-between',
//             position:'absolute',
//             left:30,
//             alignItems:'center'
//           }}>
//             <Image source={snow_flake_icon_opacity} style={{width:24,height:24}}/>
//             <Image source={snow_flake_icon_opacity} style={{width:24,height:24}}/>
//             <SnowFlakeIcon size={48} color="white"/>
//           </View>
//         </View>
//         <MarginVertical top={20}/>

//         <TimeBarArea>
//           <Animated.View style={{
//             flexDirection:'row',
//             transform:[{ translateX: moveX }]
//           }}>
//             {barList.map((_,i)=>(
//               <TimeBarEl key={i}>
//                 {i===Math.floor(barList.length/2)?<CenterBar/>:<NormalBar/>}
//               </TimeBarEl>
//             ))}
//           </Animated.View>
//         </TimeBarArea>

//         <PauseButton onPress={handlePauseToggle} onLongPress={handleComplete}>
//           <ButtonImage source={isPause?timer_continue_button_bg:timer_pause_button_bg}/>
//           <Image
//             source={isPause?timer_continue_icon:pause_button_icon}
//             style={{width:48,height:34}}
//           />
//         </PauseButton>
//       </TimerBody>
//       <TimerBg source={isPause?timer_pause_bg:timer_bg}/>
//     </SafeAreaView>
//   );
// };

// export default Timer;

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Animated,
//   Easing,
//   Image,
//   SafeAreaView,
//   View,
//   Dimensions,
// } from 'react-native';
// import styled from 'styled-components/native';

// import timer_bg from '../../../assets/timer_bg.png';
// import timer_pause_bg from '../../../assets/timer_pause_bg.png';
// import pause_button_icon from '../../../assets/save_icon.png';
// import timer_pause_button_bg from '../../../assets/timer_pause_button_bg.png';
// import timer_continue_button_bg from '../../../assets/timer_continue_button_bg.png';
// import timer_continue_icon from '../../../assets/timer_continue_icon.png';
// import snow_flake_icon_opacity from '../../../assets/snow_flake_icon_opacity.png';

// import { size } from '../styles/size';
// import { colors } from '../styles/colors';
// import BackArrowButton from '../components/BackArrowButton';
// import SnowFlakeIcon from '../components/SnowFlakeIcon';
// import MarginVertical from '../components/MarginVertical';
// import LinkIcon from '../components/LinkIcon';

// import dayjs from 'dayjs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { useUserInfoStore } from '../../store/user';
// import { useTodo } from '../../hooks/useTodo';
// import { useNowTodoStore } from '../../store/todo';
// import { getTimeDifference, minToHour } from '../../util';

// const { width: screenWidth } = Dimensions.get('window');

// const Timer = () => {
//   const [now] = useState(dayjs());
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [isPause, setIsPause] = useState(false);
//   const [intervalId, setIntervalId] = useState(null);
//   const [startTime, setStartTime] = useState(null);
//   const [logId, setLogId] = useState(0);

//   // TimeBar data
//   const [barList, setBarList] = useState(() =>
//     Array.from({ length: 6 }, (_, i) =>
//       now.add(i * 5, 'minute').format('H:mm')
//     )
//   );

//   // 애니메이션 설정
//   const moveX = useRef(new Animated.Value(0)).current;
//   const animRef = useRef(null);
//   const barWidth = 0.5;
//   const gapWidth = 70;
//   const totalDistance = barWidth + gapWidth; // 한 사이클 이동 거리
//   const cycleDuration = 3000;               // 한 사이클 걸리는 시간(ms)
//   const [remainingTime, setRemainingTime] = useState(cycleDuration);

//   const navigation = useNavigation();
//   const { nowTodo } = useNowTodoStore();
//   const { userInfo } = useUserInfoStore();
//   const { completeTodo, startTodo } = useTodo();

//   // 한 번 실행하는 애니메이션
//   const runOnce = (duration) => {
//     animRef.current = Animated.timing(moveX, {
//       toValue: -totalDistance,
//       duration,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     });
//     animRef.current.start(({ finished }) => {
//       if (finished) {
//         moveX.setValue(0);
//         setBarList(prev => {
//           const [first, ...rest] = prev;
//           return [
//             ...rest,
//             dayjs(first, 'H:mm').add(30, 'minute').format('H:mm'),
//           ];
//         });
//         runOnce(cycleDuration);
//       }
//     });
//   };

//   // 초기 타이머 및 애니메이션 시작
//   useEffect(() => {
//     const init = async () => {
//       // startTime 불러오거나 새로 설정
//       const stored = await AsyncStorage.getItem('startTime');
//       const saved = stored ? parseInt(stored, 10) : Date.now();
//       await AsyncStorage.setItem('startTime', saved.toString());
//       setStartTime(saved);

//       // 경과 타이머
//       const id = setInterval(() => {
//         setElapsedTime(Math.floor((Date.now() - saved) / 1000));
//       }, 1000);
//       setIntervalId(id);

//       // 백엔드 시작 알림
//       startTodo(nowTodo[0].id, setLogId, nowTodo[0].linkApp);

//       // 애니메이션 시작
//       runOnce(cycleDuration);
//     };
//     init();

//     return () => {
//       intervalId && clearInterval(intervalId);
//       animRef.current && animRef.current.stop();
//     };
//   }, []);

//   // 일시중지/재개 핸들러
//   const handlePauseToggle = async () => {
//     if (!isPause) {
//       // ▶️ 중지
//       // 1) elapsed 인터벌 정지
//       intervalId && clearInterval(intervalId);
//       // 2) 애니메이션 현재 위치 읽고 남은 시간 계산
//       moveX.stopAnimation(value => {
//         const frac = (totalDistance - Math.abs(value)) / totalDistance;
//         setRemainingTime(frac * cycleDuration);
//         animRef.current && animRef.current.stop();
//       });
//     } else {
//       // ▶️ 재개
//       // 1) startTime 보정
//       const newStart = Date.now() - elapsedTime * 1000;
//       setStartTime(newStart);
//       await AsyncStorage.setItem('startTime', newStart.toString());

//       // 2) elapsed 인터벌 재시작
//       const id = setInterval(() => {
//         setElapsedTime(Math.floor((Date.now() - newStart) / 1000));
//       }, 1000);
//       setIntervalId(id);

//       // 3) 애니메이션 남은 시간만큼 돌리고 이후 루프
//       runOnce(remainingTime);
//     }

//     setIsPause(prev => !prev);
//   };

//   const handleComplete = async () => {
//     intervalId && clearInterval(intervalId);
//     await AsyncStorage.removeItem('startTime');
//     completeTodo(logId, Math.floor(elapsedTime / 60));
//     navigation.navigate('CompleteTimer', {
//       time: formatTime(elapsedTime),
//     });
//   };

//   const formatTime = sec => {
//     const m = Math.floor(sec / 60),
//           h = Math.floor(m / 60),
//           s = sec % 60;
//     return `${h}H ${m % 60}M ${s}s`;
//   };

//   const convertToMinutes = str => {
//     const re = /(\d+)(H|M|S)/g;
//     let total = 0, m;
//     while ((m = re.exec(str))) {
//       const v = parseInt(m[1], 10);
//       if (m[2] === 'H') total += v * 60;
//       else if (m[2] === 'M') total += v;
//       else total += v / 60;
//     }
//     return Math.floor(total);
//   };

//   return (
//     <SafeAreaView>
//       <TimerBody>
//         <TimerHeader><BackArrowButton/></TimerHeader>
//         <MarginVertical top={30}/>
//         <SnowFlakeIcon color="black" size={20}/>
//         <MarginVertical top={15}/>
//         <TimerText>{`지금 ${userInfo.displayName} 님은\n눈 내리는 중!`}</TimerText>
//         <MarginVertical top={25}/>
//         <TimerCategory>{nowTodo[0].title}</TimerCategory>
//         <TimerTime>{formatTime(elapsedTime)}</TimerTime>
//         <MarginVertical top={10}/>
//         <View style={{flexDirection:'row',gap:5,justifyContent:'center',alignItems:'center'}}>
//           <LinkIcon size={20}/>
//           <LinkedText>{nowTodo[0].linkApp}</LinkedText>
//         </View>
//         <MarginVertical top={40}/>
//         <RestOfTimeText>
//           {`${minToHour(
//             convertToMinutes(getTimeDifference(nowTodo[0].startTime, nowTodo[0].endTime))
//             - Math.floor(elapsedTime/60)
//           )}분만 더하면\n적금 채우기 완료!`}
//         </RestOfTimeText>
//         <MarginVertical top={10}/>
//         <View style={{width:size.width}}>
//           <View style={{
//             flexDirection:'row',
//             width:size.width/2,
//             justifyContent:'space-between',
//             position:'absolute',
//             left:30,
//             alignItems:'center'
//           }}>
//             <Image source={snow_flake_icon_opacity} style={{width:24,height:24}}/>
//             <Image source={snow_flake_icon_opacity} style={{width:24,height:24}}/>
//             <SnowFlakeIcon size={48} color="white"/>
//           </View>
//         </View>
//         <MarginVertical top={20}/>

//         <TimeBarArea>
//           <Animated.View style={{
//             flexDirection:'row',
//             transform:[{ translateX: moveX }]
//           }}>
//             {barList.map((_,i) => (
//               <TimeBarEl key={i}>
//                 {i === Math.floor(barList.length/2) ? <CenterBar/> : <NormalBar/>}
//               </TimeBarEl>
//             ))}
//           </Animated.View>
//         </TimeBarArea>

//         <PauseButton onPress={handlePauseToggle} onLongPress={handleComplete}>
//           <ButtonImage source={isPause ? timer_continue_button_bg : timer_pause_button_bg}/>
//           <Image
//             source={isPause ? timer_continue_icon : pause_button_icon}
//             style={{width:48,height:34}}
//           />
//         </PauseButton>
//       </TimerBody>
//       <TimerBg source={isPause ? timer_pause_bg : timer_bg}/>
//     </SafeAreaView>
//   );
// };

// export default Timer;

// // Styled Components (이하 생략; 기존 그대로 사용)




// const TimerBody = styled.View`
//   width: ${size.width}px;
//   height: ${size.height}px;
//   display: flex;
//   align-items: center;
// `;

// const TimerBg = styled.Image`
//   width: ${size.width}px;
//   height:${size.height+50}px;
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
//   width: 100%;
//   height: 300px;
//   overflow: hidden;
//   align-items: center;
//   justify-content: center;
// `;

// const TimeBarEl = styled.View`
//   justify-content: center;
//   align-items: center;
//   margin: 0 35px; /* ✅ 간격 넓게 */
// `;

// const NormalBar = styled.View`
//   width: 0.5px;
//   height: 200px;
//   background-color: #fff;
//   margin-right:20px;
// `;

// const CenterBar = styled.View`
//   width: 2px;
//   height: 250px;
//   background-color: #fff;
//   margin-right:20px;
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
//   width:100%;
//   z-index: -1;
//   position: absolute;
//   bottom: 0;
// `;

// const ButtonText = styled.Text`
//   font-size: 18px;
//   font-weight: 600;
//   color: ${colors.fontMain};
// `;

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Image,
//   SafeAreaView,
//   View,
//   Dimensions,
// } from 'react-native';
// import styled from 'styled-components/native';

// import timer_bg from '../../../assets/timer_bg.png';
// import timer_pause_bg from '../../../assets/timer_pause_bg.png';
// import pause_button_icon from '../../../assets/save_icon.png';
// import timer_pause_button_bg from '../../../assets/timer_pause_button_bg.png';
// import timer_continue_button_bg from '../../../assets/timer_continue_button_bg.png';
// import timer_continue_icon from '../../../assets/timer_continue_icon.png';
// import snow_flake_icon_opacity from '../../../assets/snow_flake_icon_opacity.png';

// import { size } from '../styles/size';
// import { colors } from '../styles/colors';
// import BackArrowButton from '../components/BackArrowButton';
// import SnowFlakeIcon from '../components/SnowFlakeIcon';
// import MarginVertical from '../components/MarginVertical';
// import LinkIcon from '../components/LinkIcon';

// import dayjs from 'dayjs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { useUserInfoStore } from '../../store/user';
// import { useTodo } from '../../hooks/useTodo';
// import { useNowTodoStore } from '../../store/todo';
// import { getTimeDifference, minToHour } from '../../util';

// const { width: screenWidth } = Dimensions.get('window');

// export default function Timer() {
//   // --- 상태들 ---
//   const [now] = useState(dayjs());
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [isPause, setIsPause] = useState(false);
//   const [intervalId, setIntervalId] = useState(null);
//   const [logId, setLogId] = useState(0);

//   const navigation = useNavigation();
//   const { nowTodo } = useNowTodoStore();
//   const { userInfo } = useUserInfoStore();
//   const { completeTodo, startTodo } = useTodo();

//   // --- 시작 타이머 & 백엔드 알림 ---
//   useEffect(() => {
//     (async () => {
//       const stored = await AsyncStorage.getItem('startTime');
//       const saved = stored ? +stored : Date.now();
//       await AsyncStorage.setItem('startTime', saved.toString());
//       setElapsedTime( Math.floor((Date.now() - saved)/1000) );
//       // 1초마다 경과 시간 업데이트
//       const id = setInterval(() => {
//         setElapsedTime(Math.floor((Date.now() - saved)/1000));
//       }, 1000);
//       setIntervalId(id);
//       // 서버에 시작 알림
//       startTodo(nowTodo[0].id, setLogId, nowTodo[0].linkApp);
//     })();
//     return () => clearInterval(intervalId);
//   }, []);

//   // --- pause / resume 핸들러 (통합) ---
//   const handlePauseToggle = async () => {
//     if (!isPause) {
//       // ▶️ 중지
//       intervalId && clearInterval(intervalId);
//     } else {
//       // ▶️ 재개
//       const resumedStart = Date.now() - elapsedTime*1000;
//       await AsyncStorage.setItem('startTime', resumedStart.toString());
//       const id = setInterval(() => {
//         setElapsedTime(Math.floor((Date.now() - resumedStart)/1000));
//       }, 1000);
//       setIntervalId(id);
//     }
//     // Bar 애니메이션 컴포넌트에 isPause 전달되니, 저 컴포넌트에서 자동 제어됩니다.
//     setIsPause(p => !p);
//   };

//   const handleComplete = async () => {
//     clearInterval(intervalId);
//     await AsyncStorage.removeItem('startTime');
//     completeTodo(logId, Math.floor(elapsedTime/60));
//     navigation.navigate('CompleteTimer', { time: formatTime(elapsedTime) });
//   };

//   const formatTime = sec => {
//     const m = Math.floor(sec/60), h = Math.floor(m/60), s = sec%60;
//     return `${h}H ${m%60}M ${s}s`;
//   };

//   return (
//     <SafeAreaView>
//       <TimerBody>
//         <TimerHeader><BackArrowButton/></TimerHeader>
//         <MarginVertical top={30}/>
//         <SnowFlakeIcon color="black" size={20}/>
//         <MarginVertical top={15}/>
//         <TimerText>{`지금 ${userInfo.displayName} 님은\n눈 내리는 중!`}</TimerText>
//         <MarginVertical top={25}/>
//         <TimerCategory>{nowTodo[0].title}</TimerCategory>
//         <TimerTime>{formatTime(elapsedTime)}</TimerTime>
//         <MarginVertical top={10}/>
//         <View style={{flexDirection:'row',gap:5,justifyContent:'center',alignItems:'center'}}>
//           <LinkIcon size={20}/>
//           <LinkedText>{nowTodo[0].linkApp}</LinkedText>
//         </View>
//         <MarginVertical top={40}/>
//         <RestOfTimeText>
//           {`${minToHour(
//             convertToMinutes(getTimeDifference(nowTodo[0].startTime, nowTodo[0].endTime))
//              - Math.floor(elapsedTime/60)
//           )}분만 더하면\n적금 채우기 완료!`}
//         </RestOfTimeText>
//         <MarginVertical top={10}/>
//         <View style={{width:size.width}}>
//           <View style={{
//             flexDirection:'row', width:size.width/2,
//             justifyContent:'space-between',
//             position:'absolute', left:30, alignItems:'center'
//           }}>
//             <Image source={snow_flake_icon_opacity} style={{width:24,height:24}}/>
//             <Image source={snow_flake_icon_opacity} style={{width:24,height:24}}/>
//             <SnowFlakeIcon size={48} color="white"/>
//           </View>
//         </View>
//         <MarginVertical top={20}/>

//         {/* ManualTimeBar 컴포넌트 (아래) */}
//         <ManualTimeBar now={now} isPause={isPause}/>

//         <PauseButton onPress={handlePauseToggle} onLongPress={handleComplete}>
//           <ButtonImage
//             source={isPause
//               ? timer_continue_button_bg
//               : timer_pause_button_bg
//             }
//           />
//           <Image
//             source={isPause
//               ? timer_continue_icon
//               : pause_button_icon
//             }
//             style={{width:48,height:34}}
//           />
//         </PauseButton>
//       </TimerBody>
//       <TimerBg source={isPause ? timer_pause_bg : timer_bg}/>
//     </SafeAreaView>
//   );
// }

// // ManualTimeBar 컴포넌트
// function ManualTimeBar({ now, isPause }) {
//   const baseBars = Array.from({ length:6 }, (_,i)=>
//     now.add(i*5,'minute').format('H:mm')
//   );
//   const bars = [...baseBars, ...baseBars];

//   const barWidth = 0.5, gapWidth = 70;
//   const itemWidth = barWidth + gapWidth;
//   const cycleDistance = itemWidth * baseBars.length;
//   const cycleDuration = 3000;

//   const [offset, setOffset] = useState(0);
//   const [centerIndex, setCenterIndex] = useState(0);
//   const lastRef = useRef(Date.now());

//   useEffect(() => {
//     const id = setInterval(()=>{
//       const nowMs = Date.now();
//       const dt = nowMs - lastRef.current;
//       lastRef.current = nowMs;
      
//       if(!isPause){
//         setOffset(prev=>{
//           const nxt = (prev + (cycleDistance*dt*.5)/cycleDuration) % cycleDistance;
//           // 중앙에 위치한 바 인덱스 계산
          
//           return nxt;
//         });
//       } else {
//         lastRef.current = nowMs;
//       }
//     }, 16);
//     return ()=> clearInterval(id);
//   }, [isPause]);

//   return (
//     <TimeBarArea>
//       <BarContainer style={{transform:[{translateX:-offset}]}}>
//         {bars.map((_,idx)=>(
//           <TimeBarEl key={idx}>
            
//               <NormalBar/>
            
//           </TimeBarEl>
//         ))}
//       </BarContainer>
//     </TimeBarArea>
//   );
// }

// // 헬퍼 함수
// function convertToMinutes(str) {
//   const re = /(\d+)(H|M|S)/g;
//   let total=0,m;
//   while((m=re.exec(str))) {
//     const v=+m[1];
//     if(m[2]==='H') total+=v*60;
//     else if(m[2]==='M') total+=v;
//     else total+=v/60;
//   }
//   return Math.floor(total);
// }

// // Styled Components
// const TimerBody = styled.View`
//   width: ${size.width}px; height: ${size.height}px;
//   align-items: center;
// `;
// const TimerBg = styled.Image`
//   width:${size.width}px; height:${size.height+50}px;
//   position:absolute; top:0; z-index:-1;
// `;
// const TimerHeader = styled.View`
//   width:${size.width-50}px; height:50px;
//   justify-content:center;
// `;
// const TimerText = styled.Text`
//   font-size:18px; font-weight:500;
//   color:${colors.fontMain70}; text-align:center;
// `;
// const TimerCategory = styled.Text`
//   font-size:26px; font-weight:600; color:${colors.fontMain80};
// `;
// const TimerTime = styled.Text`
//   font-size:42px; font-weight:600; color:${colors.fontMain};
// `;
// const LinkedText = styled.Text`
//   font-size:18px; font-weight:500; color:${colors.fontMain70};
// `;
// const RestOfTimeText = styled.Text`
//   font-size:14px; color:#fff;
//   text-align:center; font-weight:500;
// `;

// const TimeBarArea = styled.View`
//   width:100%; height:300px;
//   overflow:hidden; align-items:center; justify-content:center;
// `;
// const BarContainer = styled.View`
//   flex-direction:row;
// `;
// const TimeBarEl = styled.View`
//   width:1px; margin:0 ${70/2}px; align-items:center;
// `;
// const NormalBar = styled.View`
//   width:0.5px; height:200px; background-color:#fff;
// `;
// const CenterBar = styled.View`
//   width:2px; height:300px; background-color:#fff;
// `;
// const PauseButton = styled.TouchableOpacity`
//   width:${size.width}px; height:126px;
//   position:absolute; bottom:50px;
//   justify-content:center; align-items:center;
// `;
// const ButtonImage = styled.Image`
//   width:100%; z-index:-1;
//   position:absolute; bottom:0;
// `;

import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  SafeAreaView,
  View,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';

import timer_bg from '../../../assets/timer_bg.png';
import timer_pause_bg from '../../../assets/timer_pause_bg.png';
import pause_button_icon from '../../../assets/save_icon.png';
import timer_pause_button_bg from '../../../assets/timer_pause_button_bg.png';
import timer_continue_button_bg from '../../../assets/timer_continue_button_bg.png';
import timer_continue_icon from '../../../assets/timer_continue_icon.png';
import snow_flake_icon_opacity from '../../../assets/snow_flake_icon_opacity.png';

import { size } from '../styles/size';
import { colors } from '../styles/colors';
import BackArrowButton from '../components/BackArrowButton';
import SnowFlakeIcon from '../components/SnowFlakeIcon';
import MarginVertical from '../components/MarginVertical';
import LinkIcon from '../components/LinkIcon';

import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoStore } from '../../store/user';
import { useTodo } from '../../hooks/useTodo';
import { useNowTodoStore } from '../../store/todo';
import { getTimeDifference, minToHour } from '../../util';

const { width: screenWidth } = Dimensions.get('window');

export default function Timer() {
  const [now] = useState(dayjs());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [logId, setLogId] = useState(0);

  const navigation = useNavigation();
  const { nowTodo } = useNowTodoStore();
  const { userInfo } = useUserInfoStore();
  const { completeTodo, startTodo } = useTodo();

  // 1) mount 시 startTime 결정 & 백엔드 시작
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('startTime');
      const saved = stored ? parseInt(stored, 10) : Date.now();
      await AsyncStorage.setItem('startTime', saved.toString());
      setStartTime(saved);
      startTodo(nowTodo[0].id, setLogId, nowTodo[0].linkApp);
    })();
  }, []);

  // 2) elapsedTime 인터벌은 isPause/startTime 변경 때마다 제어
  useEffect(() => {
    if (startTime === null) return;
    // pause 해제 상태면 인터벌 시작
    if (!isPause) {
      // 초기 즉시 set
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      const id = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(id);
    }
    // isPause === true 면 클린업 해서 정지
  }, [isPause, startTime]);

  const handlePauseToggle = async () => {
    if (startTime === null) return;
    if (!isPause) {
      // ▶️ 중지: elapsed 인터벌은 위 useEffect 가 멈추게 처리
    } else {
      // ▶️ 재개: startTime 을 보정해 줘야 이어서 계산
      const newStart = Date.now() - elapsedTime * 1000;
      setStartTime(newStart);
      await AsyncStorage.setItem('startTime', newStart.toString());
    }
    setIsPause(p => !p);
  };

  const handleComplete = async () => {
    setIsPause(true);  // 멈추고
    await AsyncStorage.removeItem('startTime');
    completeTodo(logId, Math.floor(elapsedTime / 60));
    navigation.navigate('CompleteTimer', { time: formatTime(elapsedTime) });
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60),
          h = Math.floor(m / 60),
          s = sec % 60;
    return `${h}H ${m % 60}M ${s}s`;
  };

  return (
    <SafeAreaView>
      <TimerBody>
        <TimerHeader><BackArrowButton/></TimerHeader>
        <MarginVertical top={30}/>
        <SnowFlakeIcon color="black" size={20}/>
        <MarginVertical top={15}/>
        <TimerText>
          {`지금 ${userInfo.displayName} 님은\n눈 내리는 중!`}
        </TimerText>
        <MarginVertical top={25}/>
        <TimerCategory>{nowTodo[0].title}</TimerCategory>
        <TimerTime>{formatTime(elapsedTime)}</TimerTime>
        <MarginVertical top={10}/>
        <View style={{flexDirection:'row', gap:5, justifyContent:'center', alignItems:'center'}}>
          <LinkIcon size={20}/>
          <LinkedText>{nowTodo[0].linkApp}</LinkedText>
        </View>
        <MarginVertical top={40}/>
        <RestOfTimeText>
          {`${minToHour(
            convertToMinutes(
              getTimeDifference(nowTodo[0].startTime, nowTodo[0].endTime)
            ) - Math.floor(elapsedTime / 60)
          )}분만 더하면\n적금 채우기 완료!`}
        </RestOfTimeText>
        <MarginVertical top={10}/>
        <View style={{width:size.width}}>
          <View style={{
            flexDirection:'row',
            width: size.width/2,
            justifyContent:'space-between',
            position:'absolute',
            left: 30,
            alignItems:'center'
          }}>
            <Image source={snow_flake_icon_opacity} style={{width:24, height:24}}/>
            <Image source={snow_flake_icon_opacity} style={{width:24, height:24}}/>
            <SnowFlakeIcon size={48} color="white"/>
          </View>
        </View>
        <MarginVertical top={20}/>

        {/* 3) ManualTimeBar 에 isPause 전달 */}
        <ManualTimeBar now={now} isPause={isPause}/>

        <PauseButton onPress={handlePauseToggle} onLongPress={handleComplete}>
          <ButtonImage
            source={isPause ? timer_continue_button_bg : timer_pause_button_bg}
          />
          <Image
            source={isPause ? timer_continue_icon : pause_button_icon}
            style={{width:48, height:34}}
          />
          
          <ButtonText>{isPause ? "계속하기" : "중지"}</ButtonText>
        </PauseButton>
      </TimerBody>
      <TimerBg source={isPause ? timer_pause_bg : timer_bg}/>
    </SafeAreaView>
  );
}

// -----------------------------
// ManualTimeBar 컴포넌트
// -----------------------------
function ManualTimeBar({ now, isPause }) {
  const baseBars = Array.from({ length: 6 }, (_, i) =>
    now.add(i*5, 'minute').format('H:mm')
  );
  const bars = [...baseBars, ...baseBars];

  const barWidth = 0.5;
  const gapWidth = 70;
  const itemWidth = barWidth + gapWidth;
  const cycleDistance = itemWidth * baseBars.length;
  const cycleDuration = 6000; // 여길 바꿔 속도 조절

  const [offset, setOffset] = useState(0);
  const [centerIndex, setCenterIndex] = useState(0);
  const lastRef = useRef(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      const nowMs = Date.now();
      const dt = nowMs - lastRef.current;
      lastRef.current = nowMs;

      if (!isPause) {
        setOffset(prev => {
          const nxt = (prev + (cycleDistance * dt) / cycleDuration) % cycleDistance;
          // 중앙 위치 인덱스 계산
          const absoluteCenter = (nxt + screenWidth/2) % cycleDistance;
          const idx = Math.floor(absoluteCenter / itemWidth) % baseBars.length;
          setCenterIndex(idx);
          return nxt;
        });
      } else {
        // 중지 상태면 timestamp 리셋만
        lastRef.current = nowMs;
      }
    }, 16);
    return () => clearInterval(id);
  }, [isPause]);

  return (
    <TimeBarArea>
      <BarContainer style={{ transform: [{ translateX: -offset }] }}>
        {bars.map((_, idx) => (
          <TimeBarEl key={idx}>
            
              <NormalBar/>
            
          </TimeBarEl>
        ))}
      </BarContainer>
    </TimeBarArea>
  );
}

// 헬퍼
function convertToMinutes(str) {
  const re = /(\d+)(H|M|S)/g;
  let total = 0, m;
  while ((m = re.exec(str))) {
    const v = parseInt(m[1], 10);
    if (m[2] === 'H') total += v*60;
    else if (m[2] === 'M') total += v;
    else total += v/60;
  }
  return Math.floor(total);
}

// Styled Components (같이 붙여 쓰세요)
const TimerBody = styled.View`
  width: ${size.width}px; height: ${size.height}px;
  align-items: center;
`;
const TimerBg = styled.Image`
  width: ${size.width}px; height: ${size.height+50}px;
  position: absolute; top:0; z-index:-1;
`;
const TimerHeader = styled.View`
  width: ${size.width-50}px; height:50px; justify-content:center;
`;
const TimerText = styled.Text`
  font-size:18px; font-weight:500; color:${colors.fontMain70};
  text-align:center;
`;
const TimerCategory = styled.Text`
  font-size:26px; font-weight:600; color:${colors.fontMain80};
`;
const TimerTime = styled.Text`
  font-size:42px; font-weight:600; color:${colors.fontMain};
`;
const LinkedText = styled.Text`
  font-size:18px; font-weight:500; color:${colors.fontMain70};
`;
const RestOfTimeText = styled.Text`
  font-size:14px; color:#fff; text-align:center; font-weight:500;
`;
const TimeBarArea = styled.View`
  width:100%; height:300px; overflow:hidden;
  align-items:center; justify-content:center;
`;
const BarContainer = styled.View`
  flex-direction:row;
`;
const TimeBarEl = styled.View`
  width:1px; margin:0 ${70/2}px; align-items:center;
`;
const NormalBar = styled.View`
  width:0.5px; height:200px; background-color:#fff;
`;
const CenterBar = styled.View`
  width:2px; height:300px; background-color:#fff;
`;
const PauseButton = styled.TouchableOpacity`
  width:${size.width}px; height:126px;
  position:absolute; bottom:50px;
  justify-content:center; align-items:center;
  gap:10px;
  
`;
const ButtonImage = styled.Image`
  width:100%; z-index:-1; position:absolute; bottom:0;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.fontMain};
`;