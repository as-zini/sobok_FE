import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
dayjs.locale('en');
import { View } from 'react-native';
import styled from '@emotion/native';
import calandar_arrow_left from '../../../assets/calandar_arrow_left.png';
import calandar_arrow_right from '../../../assets/calandar_arrow_right.png';
import { colors } from '../styles/colors';
import MarginVertical from './MarginVertical';

const Calandar = ({
  type,
  selectedRange,
  setSelectedRange,
  version,
  achieveList,
  setSelectedMonth,
}) => {
  const [today, setToday] = useState(dayjs());
  const [weeks, setWeeks] = useState([]);

  const someAchieveDate =
    (version === 'statistic' || version === 'report') &&
    achieveList?.length > 0
      ? achieveList.map((el) =>
          el.status === 'SOME_ACHIEVED'
            ? Number(el.date.slice(8, 10))
            : ''
        )
      : [];
  const AllAchieveDate =
    (version === 'statistic' || version === 'report') &&
    achieveList?.length > 0
      ? achieveList.map((el) =>
          el.status === 'ALL_ACHIEVED'
            ? Number(el.date.slice(8, 10))
            : ''
        )
      : [];

  const handleRange = (date) => {
    if (version === 'report') return;
    const fullDate = dayjs(today).date(date).format('YYYY-MM-DD');

    if (version === 'statistic') {
      setSelectedRange({ startDate: fullDate, endDate: null });
    } else {
      if (!selectedRange.startDate) {
        setSelectedRange({ startDate: fullDate });
      } else if (!selectedRange.endDate) {
        if (dayjs(fullDate).isBefore(dayjs(selectedRange.startDate))) {
          setSelectedRange({
            startDate: fullDate,
            endDate: selectedRange.startDate,
          });
        } else {
          setSelectedRange({
            startDate: selectedRange.startDate,
            endDate: fullDate,
          });
        }
      } else {
        setSelectedRange({});
      }
    }
  };

  const getCalandarData = () => {
    const fisrtDayOfMonth = dayjs(today).startOf('month');
    const dayInMonth = today.daysInMonth();

    const emptyDays = Array(fisrtDayOfMonth.day()).fill(null);
    const monthDays = Array.from({ length: dayInMonth }, (_, i) => i + 1);
    const result = [...emptyDays, ...monthDays];

    const wks = [];
    for (let i = 0; i < result.length; i += 7) {
      wks.push(result.slice(i, i + 7));
    }

    const lastWeek = wks[wks.length - 1];
    if (lastWeek.length < 7) {
      wks[wks.length - 1] = [
        ...lastWeek,
        ...Array(7 - lastWeek.length).fill(null),
      ];
    }

    setWeeks(wks);
  };

  const handleCalandarArrow = (direction) => {
    if (direction === 'right') {
      setToday(today.add(1, 'month'));
      if (version === 'statistic') {
        setSelectedMonth(today.add(1, 'month'));
      }
    } else {
      setToday(today.subtract(1, 'month'));
      if (version === 'statistic') {
        setSelectedMonth(today.subtract(1, 'month'));
      }
    }
  };

  useEffect(() => {
    getCalandarData();
  }, [today, selectedRange]);

  return (
    <CalandarBody>
      {version !== 'report' && (
        <SettingMonthArea>
          <ArrowButton onPress={() => handleCalandarArrow('left')}>
            <ArrowButtonIcon source={calandar_arrow_left} />
          </ArrowButton>
          <CurrentMonthText>
            {today.format('MMMM YYYY')}
          </CurrentMonthText>
          <ArrowButton onPress={() => handleCalandarArrow('right')}>
            <ArrowButtonIcon source={calandar_arrow_right} />
          </ArrowButton>
        </SettingMonthArea>
      )}
      <MarginVertical top={15} />
      <DayArea>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(
          (el, index) => (
            <DayEl key={index}>
              <DayText>{el}</DayText>
            </DayEl>
          )
        )}
      </DayArea>
      <MarginVertical top={10} />
      <CalandarContentsBody>
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex}>
            <WeekRow>
              {week.map((date, dateIndex) => {
                const isEmpty = !date;
                const fullDate = `${today.format('YYYY-MM')}-${date}`;
                const isStartOrEnd =
                  dayjs(fullDate).isSame(dayjs(selectedRange.startDate)) ||
                  (selectedRange.endDate &&
                    dayjs(fullDate).isSame(dayjs(selectedRange.endDate)));
                const inRange =
                  version !== 'statistic' &&
                  selectedRange.startDate &&
                  selectedRange.endDate &&
                  dayjs(fullDate).isAfter(dayjs(selectedRange.startDate)) &&
                  dayjs(fullDate).isBefore(dayjs(selectedRange.endDate));

                return (
                  <DateEl
                    key={dateIndex}
                    disabled={version === 'report'}
                    onPress={() => handleRange(date)}
                    style={{
                      backgroundColor: version !== 'statistic'
                        ? inRange
                          ? 'rgba(176, 195, 255, 0.3)'
                          : isStartOrEnd
                          ? colors.fontMain
                          : 'transparent'
                        : Number(selectedRange.startDate.slice(8)) === date
                        ? colors.fontMain
                        : 'transparent',
                      borderRadius: isStartOrEnd ? 25 : 0,
                    }}
                  >
                    {someAchieveDate.includes(date) && (
                      <SomeAchievedState />
                    )}
                    {AllAchieveDate.includes(date) && (
                      <AllAchievedState />
                    )}
                    <DateText
                      style={{
                        color: isStartOrEnd || (version === 'report' && (someAchieveDate.includes(date) || AllAchieveDate.includes(date)))
                          ? '#fff'
                          : version === 'report'
                          ? '#4A5660'
                          : colors.fontMain,
                      }}
                    >
                      {date || ''}
                    </DateText>
                  </DateEl>
                );
              })}
            </WeekRow>
            <MarginVertical top={6} />
          </View>
        ))}
      </CalandarContentsBody>
    </CalandarBody>
  );
};

export default Calandar;

// Emotion styled components
const CalandarBody = styled.View`
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const SettingMonthArea = styled.View`
  flex-direction: row;
  width: 250px;
  justify-content: space-between;
`;

const ArrowButton = styled.TouchableOpacity`
  width: 35px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const ArrowButtonIcon = styled.Image``;

const CurrentMonthText = styled.Text`
  color: #4A5660;
  font-weight: 600;
  font-size: 18px;
`;

const CalandarContentsBody = styled.View`
  background-color: #fff;
  border-radius: 16px;
  padding: 20px 30px;
  justify-content: center;
  align-items: center;
`;

const DayArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: -5px;
  width:80%;
`;

const DayEl = styled.View``;

const DayText = styled.Text`
  color: ${colors.gray77};
  font-weight: 500;
  font-size: 12px;
`;

const WeekRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 258px;
`;

const DateEl = styled.TouchableOpacity`
  width: 39px;
  height: 39px;
  justify-content: center;
  align-items: center;
  padding: 7px;
`;

const DateText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  z-index: 2;
`;

const SomeAchievedState = styled.View`
  position: absolute;
  top: 3px;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: rgba(176, 195, 255, 0.9);
`;

const AllAchievedState = styled.View`
  position: absolute;
  top: 3px;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: rgba(0, 60, 255, 1);
`;
