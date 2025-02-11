import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components'
import 'dayjs/locale/en';
dayjs.locale('en');

import calandar_arrow_left from '../../../assets/calandar_arrow_left.png';
import calandar_arrow_right from '../../../assets/calandar_arrow_right.png';
import { colors } from '../styles/colors';
import MarginVertical from './MarginVertical';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Calandar = ({type, selectedRange, setSelectedRange}) => {
  const [today, setToday] = useState(dayjs());
  const [weeks, setWeeks] = useState([]);

  // const handleRange = (date) => {
  //   if(!selectedRange.startDate){
  //     setSelectedRange({...selectedRange, startDate:date})
  //   } else if(!selectedRange.endDate){
  //     setSelectedRange({...selectedRange, endDate:date})
  //   } else if(selectedRange.startDate && selectedRange){
  //     setSelectedRange({})
  //   }
  // }

  const handleRange = (date) => {
    const fullDate = dayjs(today).date(date).format("YYYY-MM-DD"); // 현재 보고 있는 달(today) 기준으로 날짜 설정
    console.log(date, fullDate)
    if (!selectedRange.startDate) {
      setSelectedRange({ startDate: fullDate });
    } else if (!selectedRange.endDate) {
      setSelectedRange({
        startDate: selectedRange.startDate,
        endDate: fullDate
      });
    } else {
      setSelectedRange({});
    }
  };

  const getCalandarData = () => {
    const fisrtDayOfMonth = dayjs(today).startOf("month");
    const dayInMonth = today.daysInMonth();

    const emptyDays = Array(fisrtDayOfMonth.day()).fill(null);
    const monthDays = Array.from({ length: dayInMonth }, (_, i) => i + 1);
    const result = [...emptyDays, ...monthDays];

    const weeks = [];
    for (let i = 0; i < result.length; i += 7) {
      weeks.push(result.slice(i, i + 7));
    }

    // 마지막 주의 요소가 7개가 되도록 빈칸 추가
    const lastWeek = weeks[weeks.length - 1];
    if (lastWeek.length < 7) {
      weeks[weeks.length - 1] = [...lastWeek, ...Array(7 - lastWeek.length).fill(null)];
    }

    setWeeks(weeks);
};


  useEffect(() => {
    getCalandarData();
    console.log(selectedRange)
    console.log(dayjs(today).date('2025-04-23').isAfter(dayjs(selectedRange.startDate), 'day') )
    console.log(dayjs(today).date('2025-04-23').isAfter(dayjs("2025-04-22")))
    // dayjs(today).date('2025-04-23').isBefore(dayjs(selectedRange.endDate), 'day'))
  }, [today, selectedRange]);

  return (
    <CalandarBody>
      <SettingMonthArea>
        <ArrowButton onPress={() => setToday(today.subtract(1, "month"))}>
          <ArrowButtonIcon source={calandar_arrow_left} />
        </ArrowButton>
        <CurrentMonthText>{today.format("MMMM YYYY")}</CurrentMonthText>
        <ArrowButton onPress={() => setToday(today.add(1, "month"))}>
          <ArrowButtonIcon source={calandar_arrow_right} />
        </ArrowButton>
      </SettingMonthArea>
      <MarginVertical top={15}/>
      <DayArea>
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((el, index) => (
          <DayEl key={index}>
            <DayText>{el}</DayText>
          </DayEl>
        ))}
      </DayArea>
      <MarginVertical top={10}/>
      <CalandarContentsBody>
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex}>
          <WeekRow>
            {week.map((date, dateIndex) => (
              // <DateEl
              //   key={dateIndex}
              //   isEmpty={!date} 
              //   onPress={() => handleRange(date)}
              //   style={{backgroundColor: date < selectedRange["startDate"] && date > selectedRange["endDate"] ? "rgba(176, 195, 255, 0.3)"
              //   :date === selectedRange.startDate || date === selectedRange.endDate ? colors.fontMain : "",
              //   borderRadius:date === selectedRange.startDate || date === selectedRange.endDate ? "50%" : ""
              //   }}>
                
              //   <DateText style={{color:date === selectedRange.startDate || date === selectedRange.endDate ? "#fff" : ""}}>{date || ""}</DateText>
              // </DateEl>
              <DateEl
  key={dateIndex}
  isEmpty={!date} 
  onPress={() => handleRange(date)} // 숫자(일)만 전달
  style={{
    backgroundColor: 
      selectedRange.startDate && selectedRange.endDate &&
      dayjs(today).date(date).isAfter(dayjs(selectedRange.startDate), 'day') &&
      dayjs(today).date(date).isBefore(dayjs(selectedRange.endDate), 'day')
        ? "rgba(176, 195, 255, 0.3)"  // 선택한 기간 중간 부분 배경색
        : dayjs(today).date(date).isSame(dayjs(selectedRange.startDate), 'day') ||
          dayjs(today).date(date).isSame(dayjs(selectedRange.endDate), 'day')
          ? colors.fontMain // 시작과 끝 날짜 색상
          : "",
    borderRadius: 
      dayjs(today).date(date).isSame(dayjs(selectedRange.startDate), 'day') ||
      dayjs(today).date(date).isSame(dayjs(selectedRange.endDate), 'day')
        ? "50%" 
        : ""
  }}
>
  <DateText style={{
    color: dayjs(today).date(date).isSame(dayjs(selectedRange.startDate), 'day') ||
          dayjs(today).date(date).isSame(dayjs(selectedRange.endDate), 'day') 
      ? "#fff" 
      : ""
  }}>
    {date || ""}
  </DateText>
</DateEl>
            ))}
          </WeekRow>
          <MarginVertical top={6}/>
          </View>
        ))}
      </CalandarContentsBody>
    </CalandarBody>
  );
};


export default Calandar


const CalandarBody = styled.View`
  display:flex;
  justify-content:center;
  align-items:center;
`

const SettingMonthArea = styled.View`
  display:flex;
  flex-direction:row;
  width:250px;
  justify-content:space-between;
`

const ArrowButton = styled.TouchableOpacity`
  width:20px;
  height:20px;
`

const ArrowButtonIcon = styled.Image`

`

const CurrentMonthText = styled.Text`
  color:#4A5660;
  font-weight:600;
  font-size:18px;
`

const CalandarContentsBody = styled.View`
  width:310px;
  height:235px;
  background-color:#fff;
  border-radius:16px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const DayArea = styled.View`
  display:flex;
  flex-direction:row;
  gap:16px;
  justify-contetn:center;
  align-items:center;
  margin-left:-5px;
`

const DayEl = styled.View`
  
`

const DayText = styled.Text`
  color:${colors.gray77};
  font-weight:500;
  font-size:12px;

`

const WeekRow = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  width:258px;
`

const DateEl = styled.TouchableOpacity`
  width:39px;
  height:39px;
  display:flex;
  justify-content:center;
  align-items:center;
  box-sizing:border-box;
  padding:9px;
`

const DateText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:#4A5660;
`

