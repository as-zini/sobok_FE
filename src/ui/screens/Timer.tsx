import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  SafeAreaView,
  View,
  Dimensions,
} from 'react-native';
import styled from '@emotion/native';

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
  width: ${() => `${size.width}px`};
  height:${() => `${size.height}px`};
  align-items: center;
`;
const TimerBg = styled.Image`
  width: ${() => `${size.width}px`};
  height: ${() => `${size.height}px`};
  position: absolute; top:0; z-index:-1;
`;
const TimerHeader = styled.View`
  width: ${() => `${size.width-50}px`}; 
  height:50px; justify-content:center;
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
  width:1px; margin:0 ${() => `${70/2}px`}; align-items:center;
`;
const NormalBar = styled.View`
  width:0.5px; height:200px; background-color:#fff;
`;
const CenterBar = styled.View`
  width:2px; height:300px; background-color:#fff;
`;
const PauseButton = styled.TouchableOpacity`
  width:${() => `${size.width}px`}; height:126px;
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