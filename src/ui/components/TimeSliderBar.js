import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { minToHour } from '../../util';
import dayjs from 'dayjs';
import { colors } from '../styles/colors';

const TimeSliderBar = ({ text, setOutValue, version, type, compareValue1, compareValue2, timeInit }) => {
  const parseTimeToMinutes = (timeString) => {
    if (!timeString) return 720; // 기본값: 12:00 (오전/오후 개념 고려)
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes; // 분 단위 변환
  };

  const initValue = type === "time" ? 720 : type === "savingtime"?100 : 6
  const [value, setValue] = useState(type === "time" ? parseTimeToMinutes(timeInit) : initValue); // 기본값: 12:00 (time) / 6개월 (duration) / 100시간 (savingtime)
  const trackPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let formattedValue;
    
    if (type === "time") {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      formattedValue = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
      version === "start"
      ? setOutValue(prev => ({ ...prev, startTime: formattedValue }))
      : setOutValue(prev => ({ ...prev, endTime: formattedValue }));
    } 
    else if (type === "duration") {
      formattedValue = `${value}개월`;
      setOutValue(prev => ({...prev, duration:value}))
    } 
    else if (type === "savingtime") {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      formattedValue = `${hours}시간 ${minutes}분`;
      setOutValue(prev => ({...prev, time:value}))
    }
    console.log(value)
    
  }, [value]);

const panResponder = useRef(
  PanResponder.create({
    onStartShouldSetPanResponder: () => version !== "report", // report 모드면 반응 안함
    onMoveShouldSetPanResponder: () => version !== "report",  // report 모드면 반응 안함
    onPanResponderMove: (evt, gestureState) => {
      if (version === "report") return; // report 모드면 슬라이더 움직이지 않음

      const newValue = Math.max(-150, Math.min(gestureState.dx, 150)); // 범위: -150 ~ 150
      trackPosition.setValue(newValue);

      let calculatedValue;
      if (type === "time") {
        calculatedValue = Math.round(((newValue + 150) / 300) * 1440); // 0~1440분
        calculatedValue = Math.round(calculatedValue / 5) * 5; // 5분 단위 반올림
      } 
      else if (type === "duration") {
        calculatedValue = Math.round(((150 - newValue) / 300) * 11) + 1; // 1~12개월
      } 
      else if (type === "savingtime") {
        calculatedValue = Math.round(((150 - newValue) / 300) * 200 * 60); // 최대 200시간 (분 단위)
        calculatedValue = Math.round(calculatedValue / 5) * 5; // 5분 단위 반올림
      }

      setValue(calculatedValue);
    }
  })
).current;


  // 표시할 값 계산
  let displayText;
  if (type === "time") {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const period = value < 720 ? "오전" : "오후";
    displayText = `${period} ${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? `0${minutes}` : minutes}`;
  } 
  else if (type === "duration") {
    displayText = `${value}개월`;
  } 
  else if (type === "savingtime") {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    displayText = `${hours}시간 ${minutes}분`;
  }

  return (
    <Container>
      <View style={{ justifyContent: 'center', alignItems: 'center', gap: 3, marginBottom: 20 }}>
      {version === "reportCompare" ? <Text style={{fontSize:18, fontWeight:500, color:colors.fontMain80}}>{dayjs().subtract(1,'month').format('M월')}</Text> : <></>}
        {version === "report" ? <></>
        :<ValueArea>
          <Label>{version === "reportCompare" ? minToHour(compareValue1) : displayText}</Label>
        </ValueArea>
        }
        <Text style={{ fontSize: 14, fontWeight: '500', color: "#4c4c4c" }}>{text}</Text>
      </View>
      <SliderContainer>
        <FixedButton source={require("../../../assets/snowflak_icon.png")} />
        <AnimatedTrack
          {...panResponder.panHandlers}
          style={{ transform: [{ translateX: trackPosition }] }}
        >
          <TicksContainer>
            <Ticks style={{ transform: [{ translateX: trackPosition }] }}>
              {Array.from({ length: 61 }, (_, i) => (
                <Tick key={i} isMajor={i % 6 === 0} />
              ))}
            </Ticks>
          </TicksContainer>
        </AnimatedTrack>
      </SliderContainer>
    </Container>
  );
};

export default TimeSliderBar;

// Styled Components
const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const SliderContainer = styled.View`
  width: 300px;
  height: 40px;
  position: relative;
  justify-content: center;
`;

const FixedButton = styled.Image`
  width: 16px;
  height: 16px;
  border-radius: 15px;
  position: absolute;
  left: 52%;
  top: 20%;
  transform: translate(-15px, -15px);
  z-index: 2;
`;

const AnimatedTrack = styled(Animated.View)`
  width: 300px;
  height: 20px;
  background-color: rgba(255,255,255,0);
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-5px);
  border-radius: 5px;
`;

const TicksContainer = styled.View`
  width: 600px;
  position: absolute;
  left: -150px;
  height: 100%;
`;

const Ticks = styled(Animated.View)`
  width: 600px;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Tick = styled.View`
  width: ${(props) => (props.isMajor ? '.8px' : '.3px')};
  height: ${(props) => (props.isMajor ? '26px' : '12px')};
  background-color: ${(props) => (props.isMajor ? '#4c4c4c' : "rgba(0,0,0,.5)")};
`;

const Label = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: 500;
`

const ValueArea = styled.View`
  background-color: rgba(106, 143, 246, 0.5);
  width: 90px;
  height: 32px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

