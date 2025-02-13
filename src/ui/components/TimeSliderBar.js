import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, Text, View } from 'react-native';
import styled from 'styled-components/native';
import colors from '../styles/colors';

const TimeSliderBar = ({ text, setTime, version}) => {
  const [value, setValue] = useState(720); // 초기 값 (12:00 -> 720분)
  const trackPosition = useRef(new Animated.Value(0)).current;
  


  useEffect(() => {
    console.log(value);
    console.log(formattedTime)
    console.log(formattedTime24)
    version === "start" ? setTime(prev => ({...prev, startTime:formattedTime24})) : setTime(prev => ({...prev, endTime:formattedTime24}))
  }, [value]);

  // PanResponder 생성
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // 트랙 위치 업데이트 (좌우 제한)
        const newValue = Math.max(-150, Math.min(gestureState.dx, 150)); // 범위: -150 ~ 150
        trackPosition.setValue(newValue);

        // 값 계산 (예: -150 ~ 150을 0 ~ 1440으로 변환)
        const calculatedValue = Math.round(((newValue + 150) / 300) * 1440);  // 1440분 범위
        const roundedValue = Math.round(calculatedValue / 5) * 5; // 5분 단위로 반올림
        setValue(roundedValue);
      },
    })
  ).current;

  // 시, 분 변환
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? `0${minutes}` : minutes}`;
  const formattedTime24 = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  const period = value < 720 ? '오전' : '오후'; // 값이 720 미만일 경우 오전, 초과일 경우 오후

  return (
    <Container>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, marginBottom: 20 }}>
        <ValueArea>
          <Label>
            {period} {formattedTime}
          </Label>
        </ValueArea>
        <Text style={{ fontSize: 14, fontWeight: 500, color: "#4c4c4c" }}>{text}</Text>
      </View>
      <SliderContainer>
        {/* 고정된 버튼 */}
        <FixedButton source={require("../../../assets/snowflak_icon.png")} />

        {/* 움직이는 트랙 */}
        <AnimatedTrack
          {...panResponder.panHandlers}
          style={{
            transform: [{ translateX: trackPosition }],
          }}
        >
          {/* 트랙 위의 세로선 */}
          <TicksContainer>
            <Ticks
              style={{
                transform: [{ translateX: trackPosition }],
              }}
            >
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

// Styled Components 정의
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
  width: 600px; /* 트랙 전체 이동 범위를 커버하도록 설정 */
  position: absolute;
  left: -150px; /* 트랙 이동 범위 시작점 */
  height: 100%;
`;

const Ticks = styled(Animated.View)`
  width: 600px; /* 트랙 이동 범위를 커버하도록 설정 */
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
`;

const ValueArea = styled.View`
  background-color: rgba(106, 143, 246, 0.5);
  width: 90px;
  height: 32px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;