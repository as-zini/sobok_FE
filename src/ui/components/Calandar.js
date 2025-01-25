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

const Calandar = () => {
  const [today, setToday] = useState(dayjs());
  const [weeks, setWeeks] = useState([]);

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
  }, [today]);

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
          <>
          <WeekRow key={weekIndex}>
            {week.map((date, dateIndex) => (
              <DateEl key={dateIndex} isEmpty={!date}>
                <DateText>{date || ""}</DateText>
              </DateEl>
            ))}
          </WeekRow>
          <MarginVertical top={6}/>
          </>
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
  height:230px;
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
  gap:9px;
  width:258px;
`

const DateEl = styled.TouchableOpacity`
  width:30px;
  height:30px;
  display:flex;
  justify-content:center;
  align-items:center;
  box-sizing:border-box;
`

const DateText = styled.Text`
  font-size:18px;
  font-weight:500;
  color:#4A5660;
`

