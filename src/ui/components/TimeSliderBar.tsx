import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import styled from '@emotion/native';
import { minToHour } from '../../util';
import dayjs from 'dayjs';
import { colors } from '../styles/colors';

const TimeSliderBar = ({ text, setOutValue, version, type, compareValue1, compareValue2, timeInit }) => {
  const parseTimeToMinutes = (timeString) => {
    if (!timeString) return 720;
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const initValue = type === 'time' ? 720 : type === 'savingtime' ? 100 : 6;
  const [value, setValue] = useState(
    type === 'time' ? parseTimeToMinutes(timeInit) : initValue
  );
  const trackPosition = useRef(new Animated.Value(0)).current;

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(
    type === 'time'
      ? (() => {
          const hours = Math.floor(value / 60);
          const minutes = value % 60;
          return `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes
          }`;
        })()
      : type === 'duration'
      ? String(value)
      : type === 'savingtime'
      ? (() => {
          const hours = Math.floor(value / 60);
          const minutes = value % 60;
          return `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes
          }`;
        })()
      : ''
  );

  useEffect(() => {
    let formattedValue;
    if (type === 'time') {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      formattedValue = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`;
      if (version === 'start') {
        setOutValue((prev) => ({ ...prev, startTime: formattedValue }));
      } else {
        setOutValue((prev) => ({ ...prev, endTime: formattedValue }));
      }
    } else if (type === 'duration') {
      setOutValue((prev) => ({ ...prev, duration: value }));
    } else if (type === 'savingtime') {
      setOutValue((prev) => ({ ...prev, time: value }));
    }
  }, [value]);

  useEffect(() => {
    if (!isEditing) {
      if (type === 'time' || type === 'savingtime') {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        setInputValue(
          `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes
          }`
        );
      } else if (type === 'duration') {
        setInputValue(String(value));
      }
    }
  }, [value, isEditing]);

  const handleInputChange = (text) => {
    setInputValue(text);
    if (type === 'time') {
      const [h, m] = text.split(':').map(Number);
      if (!isNaN(h) && !isNaN(m) && h >= 0 && h <= 23 && m >= 0 && m <= 59) {
        setValue(h * 60 + m);
      }
    } else if (type === 'duration') {
      const n = Number(text);
      if (!isNaN(n) && n >= 1 && n <= 12) setValue(n);
    } else if (type === 'savingtime') {
      const [h, m] = text.split(':').map(Number);
      if (!isNaN(h) && !isNaN(m) && h >= 0 && h <= 200 && m >= 0 && m <= 59) {
        setValue(h * 60 + m);
      }
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    // Validate same as change
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => version !== 'report',
      onMoveShouldSetPanResponder: () => version !== 'report',
      onPanResponderMove: (evt, gestureState) => {
        if (version === 'report') return;
        const dx = Math.max(-150, Math.min(gestureState.dx, 150));
        trackPosition.setValue(dx);
        let calc;
        if (type === 'time') {
          calc = Math.round(((dx + 150) / 300) * 1440 / 5) * 5;
        } else if (type === 'duration') {
          calc = Math.round(((150 - dx) / 300) * 11) + 1;
        } else {
          calc = Math.round(((150 - dx) / 300) * 200 * 60 / 5) * 5;
        }
        setValue(calc);
      }
    })
  ).current;

  let displayText;
  if (type === 'time') {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const period = value < 720 ? '오전' : '오후';
    displayText = `${period} ${hours % 12 || 12}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  } else if (type === 'duration') {
    displayText = `${value}개월`;
  } else {
    const h = Math.floor(value / 60);
    const m = value % 60;
    displayText = `${h}시간 ${m}분`;
  }

  return (
    <Container>
      <ValueWrapper>
        {version === 'reportCompare' && (
          <CompareText>{dayjs().subtract(1, 'month').format('M월')}</CompareText>
        )}
        {version !== 'report' && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <ValueArea>
              {isEditing ? (
                <TextInput
                  value={inputValue}
                  onChangeText={handleInputChange}
                  onBlur={handleInputBlur}
                  autoFocus
                  style={inputStyle}
                />
              ) : (
                <ValueText>
                  {version === 'reportCompare'
                    ? minToHour(compareValue1)
                    : displayText}
                </ValueText>
              )}
            </ValueArea>
          </TouchableOpacity>
        )}
        <LabelText>{text}</LabelText>
      </ValueWrapper>
      <SliderContainer>
        <FixedIcon source={require("../../../assets/snowflak_icon.png")} />
        <Track
          {...panResponder.panHandlers}
          style={{ transform: [{ translateX: trackPosition }] }}
        >
          <TicksWrapper>
            <Ticks style={{ transform: [{ translateX: trackPosition }] }}>
              {Array.from({ length: 61 }).map((_, i) => (
                <Tick key={i} isMajor={i % 6 === 0} />
              ))}
            </Ticks>
          </TicksWrapper>
        </Track>
      </SliderContainer>
    </Container>
  );
};

export default TimeSliderBar;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const ValueWrapper = styled.View`
  justify-content: center;
  align-items: center;
  gap: 3px;
  margin-bottom: 20px;
`;

const CompareText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.fontMain80};
`;

const ValueArea = styled.View`
  background-color: rgba(106, 143, 246, 0.5);
  width: 90px;
  height: 32px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const inputStyle = {
  width: 90,
  height: 32,
  color: '#fff',
  fontSize: 16,
  textAlign: 'center'
};

const ValueText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: 500;
`;

const LabelText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #4c4c4c;
`;

const SliderContainer = styled.View`
  width: 300px;
  height: 40px;
  justify-content: center;
`;

const FixedIcon = styled(Image)`
  width: 16px;
  height: 16px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -8px;
  margin-top: -8px;
  z-index: 2;
`;

const Track = styled(Animated.View)`
  width: 300px;
  height: 20px;
  position: absolute;
  top: 50%;
  margin-top: -5px;
`;

const TicksWrapper = styled.View`
  width: 600px;
  position: absolute;
  left: -150px;
  height: 100%;
`;

const Ticks = styled(Animated.View)`
  width: 600px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Tick = styled.View`
  width: ${(props) => (props.isMajor ? '0.8px' : '0.3px')};
  height: ${(props) => (props.isMajor ? '26px' : '12px')};
  background-color: ${(props) => (props.isMajor ? '#4c4c4c' : 'rgba(0,0,0,0.5)')};
`;
// import React, { useEffect, useRef, useState } from 'react';
// import { Animated, PanResponder, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import styled from '@emotion/native';
// import { minToHour } from '../../util';
// import dayjs from 'dayjs';
// import { colors } from '../styles/colors';

// const TimeSliderBar = ({ text, setOutValue, version, type, compareValue1, compareValue2, timeInit }) => {
//   const parseTimeToMinutes = (timeString) => {
//     if (!timeString) return 720; // 기본값: 12:00 (오전/오후 개념 고려)
//     const [hours, minutes] = timeString.split(":").map(Number);
//     return hours * 60 + minutes; // 분 단위 변환
//   };

//   const initValue = type === "time" ? 720 : type === "savingtime"?100 : 6
//   const [value, setValue] = useState(type === "time" ? parseTimeToMinutes(timeInit) : initValue); // 기본값: 12:00 (time) / 6개월 (duration) / 100시간 (savingtime)
//   const trackPosition = useRef(new Animated.Value(0)).current;

//   // 인풋/표시 전환용 상태
//   const [isEditing, setIsEditing] = useState(false);
//   const [inputValue, setInputValue] = useState(
//     type === "time"
//       ? (() => {
//           const hours = Math.floor(value / 60);
//           const minutes = value % 60;
//           return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
//         })()
//       : type === "duration"
//         ? String(value)
//       : type === "savingtime"
//         ? (() => {
//             const hours = Math.floor(value / 60);
//             const minutes = value % 60;
//             return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
//           })()
//       : ""
//   );

//   useEffect(() => {
//     let formattedValue;
    
//     if (type === "time") {
//       const hours = Math.floor(value / 60);
//       const minutes = value % 60;
//       formattedValue = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
//       version === "start"
//       ? setOutValue(prev => ({ ...prev, startTime: formattedValue }))
//       : setOutValue(prev => ({ ...prev, endTime: formattedValue }));
//     } 
//     else if (type === "duration") {
//       formattedValue = `${value}개월`;
//       setOutValue(prev => ({...prev, duration:value}))
//     } 
//     else if (type === "savingtime") {
//       const hours = Math.floor(value / 60);
//       const minutes = value % 60;
//       formattedValue = `${hours}시간 ${minutes}분`;
//       setOutValue(prev => ({...prev, time:value}))
//     }
//     console.log(value)
    
//   }, [value]);

//   // value가 바뀔 때 inputValue도 동기화
//   useEffect(() => {
//     if (type === "time" && !isEditing) {
//       const hours = Math.floor(value / 60);
//       const minutes = value % 60;
//       setInputValue(`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`);
//     } else if (type === "duration" && !isEditing) {
//       setInputValue(String(value));
//     } else if (type === "savingtime" && !isEditing) {
//       const hours = Math.floor(value / 60);
//       const minutes = value % 60;
//       setInputValue(`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`);
//     }
//   }, [value, type, isEditing]);

//   // 인풋에서 값이 바뀔 때 슬라이더 값도 바뀌게
//   const handleInputChange = (text) => {
//     setInputValue(text);
//     if (type === "time") {
//       const [hours, minutes] = text.split(":").map(Number);
//       if (
//         !isNaN(hours) &&
//         !isNaN(minutes) &&
//         hours >= 0 &&
//         hours <= 23 &&
//         minutes >= 0 &&
//         minutes <= 59
//       ) {
//         setValue(hours * 60 + minutes);
//       }
//     } else if (type === "duration") {
//       const num = Number(text);
//       if (!isNaN(num) && num >= 1 && num <= 12) {
//         setValue(num);
//       }
//     } else if (type === "savingtime") {
//       const [hours, minutes] = text.split(":").map(Number);
//       if (
//         !isNaN(hours) &&
//         !isNaN(minutes) &&
//         hours >= 0 &&
//         hours <= 200 &&
//         minutes >= 0 &&
//         minutes <= 59
//       ) {
//         setValue(hours * 60 + minutes);
//       }
//     }
//   };

//   // 인풋 포커스 아웃 시
//   const handleInputBlur = () => {
//     setIsEditing(false);
//     if (type === "time") {
//       const [hours, minutes] = inputValue.split(":").map(Number);
//       if (
//         isNaN(hours) ||
//         isNaN(minutes) ||
//         hours < 0 ||
//         hours > 23 ||
//         minutes < 0 ||
//         minutes > 59
//       ) {
//         const hours = Math.floor(value / 60);
//         const minutes = value % 60;
//         setInputValue(`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`);
//       }
//     } else if (type === "duration") {
//       const num = Number(inputValue);
//       if (isNaN(num) || num < 1 || num > 12) {
//         setInputValue(String(value));
//       }
//     } else if (type === "savingtime") {
//       const [hours, minutes] = inputValue.split(":").map(Number);
//       if (
//         isNaN(hours) ||
//         isNaN(minutes) ||
//         hours < 0 ||
//         hours > 200 ||
//         minutes < 0 ||
//         minutes > 59
//       ) {
//         const hours = Math.floor(value / 60);
//         const minutes = value % 60;
//         setInputValue(`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`);
//       }
//     }
//   };

// const panResponder = useRef(
//   PanResponder.create({
//     onStartShouldSetPanResponder: () => version !== "report", // report 모드면 반응 안함
//     onMoveShouldSetPanResponder: () => version !== "report",  // report 모드면 반응 안함
//     onPanResponderMove: (evt, gestureState) => {
//       if (version === "report") return; // report 모드면 슬라이더 움직이지 않음

//       const newValue = Math.max(-150, Math.min(gestureState.dx, 150)); // 범위: -150 ~ 150
//       trackPosition.setValue(newValue);

//       let calculatedValue;
//       if (type === "time") {
//         calculatedValue = Math.round(((newValue + 150) / 300) * 1440); // 0~1440분
//         calculatedValue = Math.round(calculatedValue / 5) * 5; // 5분 단위 반올림
//       } 
//       else if (type === "duration") {
//         calculatedValue = Math.round(((150 - newValue) / 300) * 11) + 1; // 1~12개월
//       } 
//       else if (type === "savingtime") {
//         calculatedValue = Math.round(((150 - newValue) / 300) * 200 * 60); // 최대 200시간 (분 단위)
//         calculatedValue = Math.round(calculatedValue / 5) * 5; // 5분 단위 반올림
//       }

//       setValue(calculatedValue);
//     }
//   })
// ).current;


//   // 표시할 값 계산
//   let displayText;
//   if (type === "time") {
//     const hours = Math.floor(value / 60);
//     const minutes = value % 60;
//     const period = value < 720 ? "오전" : "오후";
//     displayText = `${period} ${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? `0${minutes}` : minutes}`;
//   } 
//   else if (type === "duration") {
//     displayText = `${value}개월`;
//   } 
//   else if (type === "savingtime") {
//     const hours = Math.floor(value / 60);
//     const minutes = value % 60;
//     displayText = `${hours}시간 ${minutes}분`;
//   }

//   return (
//     <Container>
//       <View style={{ justifyContent: 'center', alignItems: 'center', gap: 3, marginBottom: 20 }}>
//       {version === "reportCompare" ? <Text style={{fontSize:18, fontWeight:500, color:colors.fontMain80}}>{dayjs().subtract(1,'month').format('M월')}</Text> : <></>}
//         {version === "report" ? null : (
//           <TouchableOpacity activeOpacity={0.7} onPress={() => setIsEditing(true)}>
//             <ValueArea>
//               {isEditing ? (
//                 type === "time" || type === "savingtime" ? (
//                   <TextInput
//                     value={inputValue}
//                     onChangeText={handleInputChange}
//                     onBlur={handleInputBlur}
//                     autoFocus
//                     style={{
//                       width: 70,
//                       height: 32,
//                       backgroundColor: "rgba(0,0,0,0)",
//                       color: "#fff",
//                       fontSize: 16,
//                       textAlign: "center",
//                     }}
//                     keyboardType="numeric"
//                     maxLength={5}
//                     placeholder="hh:mm"
//                   />
//                 ) : type === "duration" ? (
//                   <TextInput
//                     value={inputValue}
//                     onChangeText={handleInputChange}
//                     onBlur={handleInputBlur}
//                     autoFocus
//                     style={{
//                       width: 50,
//                       height: 32,
//                       backgroundColor: "rgba(0,0,0,0)",
//                       color: "#fff",
//                       fontSize: 16,
//                       textAlign: "center",
//                     }}
//                     keyboardType="numeric"
//                     maxLength={2}
//                     placeholder="개월"
//                   />
//                 ) : null
//               ) : (
//                 <Label>{version === "reportCompare" ? minToHour(compareValue1) : displayText}</Label>
//               )}
//             </ValueArea>
//           </TouchableOpacity>
//         )}
//         <Text style={{ fontSize: 14, fontWeight: '500', color: "#4c4c4c" }}>{text}</Text>
//       </View>
//       <SliderContainer>
//         <FixedButton source={require("../../../assets/snowflak_icon.png")} />
//         <AnimatedTrack
//           {...panResponder.panHandlers}
//           style={{ transform: [{ translateX: trackPosition }] }}
//         >
//           <TicksContainer>
//             <Ticks style={{ transform: [{ translateX: trackPosition }] }}>
//               {Array.from({ length: 61 }, (_, i) => (
//                 <Tick key={i} isMajor={i % 6 === 0} />
//               ))}
//             </Ticks>
//           </TicksContainer>
//         </AnimatedTrack>
//       </SliderContainer>
//     </Container>
//   );
// };

// export default TimeSliderBar;

// // Styled Components
// const Container = styled.View`
//   justify-content: center;
//   align-items: center;
// `;

// const SliderContainer = styled.View`
//   width: 300px;
//   height: 40px;
//   position: relative;
//   justify-content: center;
// `;

// const FixedButton = styled.Image`
//   width: 16px;
//   height: 16px;
//   border-radius: 15px;
//   position: absolute;
//   left: 52%;
//   top: 20%;
//   transform: translate(-15px, -15px);
//   z-index: 2;
// `;

// const AnimatedTrack = styled(Animated.View)`
//   width: 300px;
//   height: 20px;
//   background-color: rgba(255,255,255,0);
//   position: absolute;
//   left: 0;
//   top: 50%;
//   transform: translateY(-5px);
//   border-radius: 5px;
// `;

// const TicksContainer = styled.View`
//   width: 600px;
//   position: absolute;
//   left: -150px;
//   height: 100%;
// `;

// const Ticks = styled(Animated.View)`
//   width: 600px;
//   height: 100%;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Tick = styled.View`
//   width: ${(props) => (props.isMajor ? '.8px' : '.3px')};
//   height: ${(props) => (props.isMajor ? '26px' : '12px')};
//   background-color: ${(props) => (props.isMajor ? '#4c4c4c' : "rgba(0,0,0,.5)")};
// `;

// const Label = styled.Text`
//   font-size: 16px;
//   color: #fff;
//   font-weight: 500;
// `

// const ValueArea = styled.View`
//   background-color: rgba(106, 143, 246, 0.5);
//   width: 90px;
//   height: 32px;
//   border-radius: 15px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

