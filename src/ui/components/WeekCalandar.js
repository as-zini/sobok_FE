

import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';
import styled from 'styled-components'
import { colors } from '../styles/colors';

const WeekCalandar = ({ selectedDate, setSelectedDate, isDuplication, version, achieveList, setIsNextMonth }) => {
  const [today, setToday] = useState(dayjs());
  const DayTexts = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [weekDates, setWeekDates] = useState([]);
  const SomeAchieveDate = version === "statistic" ? achieveList.map((el) => el.status === "SOME_ACHIEVED" ? Number(el.date.slice(8, 10)) : "") : [];
  const AllAchieveDate = version === "statistic" ? achieveList.map((el) => (el.status === "ALL_ACHIEVED") || (el.status === "ACHIEVED") ? Number(el.date.slice(8, 10)) : "") : [];

  const getWeekDate = () => {
    const dateList = [];
    let hasNextMonth = false;
    const currentMonth = dayjs(today).month(); // 0~11

    for (let i = 0; i <= 6; i++) {
      const dateObj = dayjs(today).startOf('week').add(i, 'day');
      const date = dateObj.get('date');
      const month = dateObj.month();

      dateList.push(date);

      if (month !== currentMonth) {
        hasNextMonth = true;
      }
    }

    setWeekDates(dateList);
    if(version !== "day"){
      setIsNextMonth(hasNextMonth);

    }
  }

  function getFullWeekday(abbrev) {
    if (typeof abbrev !== 'string') return null;
  
    const map = {
      MON: 'MONDAY',
      TUE: 'TUESDAY',
      WED: 'WEDNESDAY',
      THU: 'THURSDAY',
      FRI: 'FRIDAY',
      SAT: 'SATURDAY',
      SUN: 'SUNDAY',
    };
  
    const key = abbrev.trim().toUpperCase();
    return map[key] || null;
  }

  useEffect(() => {
    getWeekDate();
  }, [selectedDate]);

  return (
    <WeekCalandarBody>
      {version === "date" ?
        <DayArea>
          {DayTexts.map((el, index) => (
            <DayEl key={index}>
              <DayText>{el}</DayText>
            </DayEl>
          ))}
        </DayArea>
        : null}
      <WeekCalandarContentsBody>
        {version === "day" ?
          DayTexts.map((el, index) => (
            <DateEl
              key={index}
              onPress={() => {
                if (isDuplication) {
                  if (selectedDate.includes(getFullWeekday(el))) {
                    let result = selectedDate.filter((j) => getFullWeekday(el) !== j)
                    setSelectedDate(result);
                  } else {
                    setSelectedDate(prev => [...prev, getFullWeekday(el)]);
                  }
                } else {
                  setSelectedDate(getFullWeekday(el));
                }
              }}
            >
              {(isDuplication && selectedDate?.includes(getFullWeekday(el))) || (!isDuplication && selectedDate === getFullWeekday(el)) ?
                <>
                  <SelectedCircle />
                  <DateText style={{ color: "#fff", fontSize: 12 }}>{el}</DateText>
                </>
                :
                <DateText style={{ fontSize: 12 }}>{el}</DateText>
              }
            </DateEl>
          ))
          :
          weekDates.map((el, index) => (
            <DateEl
              key={index}
              onPress={() => {
                if (isDuplication) {
                  if (selectedDate.includes(index)) {
                    let result = selectedDate.filter((el) => el !== index);
                    setSelectedDate(result);
                  } else {
                    setSelectedDate(prev => [...prev, index]);
                  }
                } else {
                  setSelectedDate(el);
                }
              }}
            >
              {SomeAchieveDate.includes(el) ? <SomeAchievedState /> :
                AllAchieveDate.includes(el) ? <AllAchivedState /> : null}
              {(isDuplication && selectedDate?.includes(index)) || (!isDuplication && selectedDate === el) ?
                <>
                  <SelectedCircle />
                  <DateText style={{ color: "#fff" }}>{el}</DateText>
                </>
                :
                <DateText>{el}</DateText>
              }
            </DateEl>
          ))
        }
      </WeekCalandarContentsBody>
    </WeekCalandarBody>
  )
}

export default WeekCalandar;

// 스타일드 컴포넌트
const WeekCalandarBody = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DayArea = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 258px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const DayEl = styled.View`
  width: 30px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DayText = styled.Text`
  font-size: 12px;
  color: rgba(27, 31, 38, 0.72);
  font-weight: 500;
`;

const WeekCalandarContentsBody = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 310px;
  height: 50px;
  border-radius: 12px;
  background-color: #fff;
  gap: 8px;
`;

const DateEl = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #4A5660;
`;

const SelectedCircle = styled.View`
  width: 35px;
  height: 35px;
  background-color: ${colors.fontMain};
  border-radius: 17px;
  position: absolute;
`;

const SomeAchievedState = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: rgba(176, 195, 255, 0.9);
  position: absolute;
  top: 0px;
`;

const AllAchivedState = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: rgba(0, 60, 255, 1);
  position: absolute;
  top: 0px;
`;


