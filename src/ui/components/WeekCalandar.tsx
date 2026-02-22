import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { colors } from '../styles/colors';

const WeekCalandar = ({ selectedDate, setSelectedDate, isDuplication, version, achieveList, setIsNextMonth }) => {
  const [today, setToday] = useState(dayjs());
  const DayTexts = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [weekDates, setWeekDates] = useState([]);

  const SomeAchieveDate = version === "statistic"
    ? achieveList
        .filter(el => el.status === "SOME_ACHIEVED")
        .map(el => Number(el.date.slice(8, 10)))
    : [];

  const AllAchieveDate = version === "statistic"
    ? achieveList
        .filter(el => el.status === "ALL_ACHIEVED" || el.status === "ACHIEVED")
        .map(el => Number(el.date.slice(8, 10)))
    : [];

  const getWeekDate = () => {
    const dateList = [];
    let hasNextMonth = false;
    const currentMonth = today.month();

    for (let i = 0; i < 7; i++) {
      const dateObj = today.startOf('week').add(i, 'day');
      const date = dateObj.date();
      const month = dateObj.month();

      dateList.push(date);
      if (month !== currentMonth) {
        hasNextMonth = true;
      }
    }

    setWeekDates(dateList);
    if (version !== 'day') {
      setIsNextMonth(hasNextMonth);
    }
  };

  function getFullWeekday(abbrev) {
    const map = {
      MON: 'MONDAY',
      TUE: 'TUESDAY',
      WED: 'WEDNESDAY',
      THU: 'THURSDAY',
      FRI: 'FRIDAY',
      SAT: 'SATURDAY',
      SUN: 'SUNDAY',
    };
    return map[abbrev] || null;
  }

  useEffect(() => {
    getWeekDate();
  }, [selectedDate, today]);

  return (
    <Container>
      {version === 'date' && (
        <DayArea>
          {DayTexts.map((el, idx) => (
            <DayEl key={idx}>
              <DayText>{el}</DayText>
            </DayEl>
          ))}
        </DayArea>
      )}

      <ContentsBody>
        {version === 'day'
          ? DayTexts.map((el, idx) => (
              <DateItem
                key={idx}
                onPress={() => {
                  const full = getFullWeekday(el);
                  if (isDuplication) {
                    if (selectedDate.includes(full)) {
                      setSelectedDate(selectedDate.filter(d => d !== full));
                    } else {
                      setSelectedDate([...selectedDate, full]);
                    }
                  } else {
                    setSelectedDate(full);
                  }
                }}
              >
                {((isDuplication && selectedDate.includes(getFullWeekday(el))) ||
                  (!isDuplication && selectedDate === getFullWeekday(el))) && <SelectedCircle />}
                <DateText style={{ color: ((isDuplication && selectedDate.includes(getFullWeekday(el))) || (!isDuplication && selectedDate === getFullWeekday(el))) ? '#fff' : colors.fontMain }}>
                  {el}
                </DateText>
              </DateItem>
            ))
          : weekDates.map((date, idx) => (
              <DateItem
                key={idx}
                onPress={() => {
                  if (isDuplication) {
                    if (selectedDate.includes(idx)) {
                      setSelectedDate(selectedDate.filter(d => d !== idx));
                    } else {
                      setSelectedDate([...selectedDate, idx]);
                    }
                  } else {
                    setSelectedDate(date);
                  }
                }}
              >
                {SomeAchieveDate.includes(date) && <SomeDot />}
                {AllAchieveDate.includes(date) && <AllDot />}
                {((isDuplication && selectedDate.includes(idx)) || (!isDuplication && selectedDate === date)) && (
                  <SelectedCircle />
                )}
                <DateText style={{ color: ((isDuplication && selectedDate.includes(idx)) || (!isDuplication && selectedDate === date)) ? '#fff' : colors.fontMain, fontSize:16 }}>
                  {date}
                </DateText>
              </DateItem>
            ))}
      </ContentsBody>
    </Container>
  );
};

export default WeekCalandar;

const Container = styled.View`
  width: 100%;
  align-items: center;
`;

const DayArea = styled.View`
  flex-direction: row;
  gap: 10px;
  width: 258px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const DayEl = styled.View`
  width: 30px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;

const DayText = styled.Text`
  font-size: 12px;
  color: rgba(27, 31, 38, 0.72);
  font-weight: 500;
`;

const ContentsBody = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 50px;
  background-color: #fff;
  border-radius: 12px;
  padding: 0 20px;
`;

const DateItem = styled(TouchableOpacity)`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const DateText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #4A5660;
`;

const SelectedCircle = styled.View`
  position: absolute;
  width: 35px;
  height: 35px;
  background-color: ${colors.fontMain};
  border-radius: 17px;
`;

const SomeDot = styled.View`
  position: absolute;
  top: 0;
  width: 4px;
  height: 4px;
  background-color: rgba(176, 195, 255, 0.9);
  border-radius: 2px;
`;

const AllDot = styled.View`
  position: absolute;
  top: 0;
  width: 4px;
  height: 4px;
  background-color: rgba(0, 60, 255, 1);
  border-radius: 2px;
`;
