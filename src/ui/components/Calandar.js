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

const Calandar = ({ type, selectedRange, setSelectedRange, version, achieveList }) => {
  const [today, setToday] = useState(dayjs());
  const [weeks, setWeeks] = useState([]);
  
  const someAchieveDate = (version === "statistic" || version==="report")&&achieveList.length>0 ? achieveList.map((el) => el.status === "SOME_ACHIEVED" ? Number(el.date.slice(8,10)) : "") : []
  const AllAchieveDate = (version === "statistic"||version==="report")&&achieveList.length>0 ? achieveList.map((el) => el.status === "ALL_ACHIEVED" ? Number(el.date.slice(8,10)) : "") : []
  
  useEffect(() => {
    console.log("achieve",achieveList)
    console.log(someAchieveDate, AllAchieveDate)
  }, [achieveList])
  
  const handleRange = (date) => {
    if (version === "report") return; // report 모드에서는 선택 불가
    
    const fullDate = dayjs(today).date(date).format("YYYY-MM-DD");
    
    if (version === "statistic") {
      setSelectedRange({ startDate: fullDate, endDate: null });
    } else {
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

    const lastWeek = weeks[weeks.length - 1];
    if (lastWeek.length < 7) {
      weeks[weeks.length - 1] = [...lastWeek, ...Array(7 - lastWeek.length).fill(null)];
    }

    setWeeks(weeks);
  };

  useEffect(() => {
    getCalandarData();
  }, [today, selectedRange]);

  return (
    <CalandarBody>
      {version !== 'report' ?
      <SettingMonthArea>
        <ArrowButton onPress={() => setToday(today.subtract(1, "month"))}>
          <ArrowButtonIcon source={calandar_arrow_left} />
        </ArrowButton>
        <CurrentMonthText>{today.format("MMMM YYYY")}</CurrentMonthText>
        <ArrowButton onPress={() => setToday(today.add(1, "month"))}>
          <ArrowButtonIcon source={calandar_arrow_right} />
        </ArrowButton>
      </SettingMonthArea>
      :
      <></>
      }
      <MarginVertical top={15} />
      <DayArea>
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((el, index) => (
          <DayEl key={index}>
            <DayText>{el}</DayText>
          </DayEl>
        ))}
      </DayArea>
      <MarginVertical top={10} />
      <CalandarContentsBody>
        
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex}>
            {version !== 'report' ?
            <WeekRow>
              {week.map((date, dateIndex) => (
                <DateEl
                  key={dateIndex}
                  isEmpty={!date}
                  onPress={() => handleRange(date)}
                  disabled={version === "report"} // report 모드에서는 클릭 비활성화
                  style={{
                    backgroundColor: 
                      version !== "statistic" &&
                      selectedRange?.startDate && selectedRange?.endDate &&
                      dayjs(today).date(date).isAfter(dayjs(selectedRange.startDate), 'day') &&
                      dayjs(today).date(date).isBefore(dayjs(selectedRange.endDate), 'day')
                        ? "rgba(176, 195, 255, 0.3)"
                        : dayjs(today).date(date).isSame(dayjs(selectedRange.startDate), 'day') ||
                          (selectedRange.endDate && dayjs(today).date(date).isSame(dayjs(selectedRange.endDate), 'day'))
                        ? colors.fontMain
                        : "",
                    borderRadius: 
                      dayjs(today).date(date).isSame(dayjs(selectedRange.startDate), 'day') ||
                      (selectedRange.endDate && dayjs(today).date(date).isSame(dayjs(selectedRange.endDate), 'day'))
                        ? "50%" 
                        : ""
                  }}
                >
                  {someAchieveDate.includes(date) ? <SomeAchievedState/> : AllAchieveDate.includes(date) ? <AllAchieveState/> : <></>}
                  <DateText style={{
                    color: dayjs(today).date(date).isSame(dayjs(selectedRange.startDate), 'day') ||
                          (selectedRange.endDate && dayjs(today).date(date).isSame(dayjs(selectedRange.endDate), 'day'))
                      ? "#fff" 
                      : ""
                  }}>
                    {date || ""}
                  </DateText>
                </DateEl>
              ))}

            </WeekRow>
            :
            <WeekRow>
              {week.map((date, dateIndex) => (
                <DateEl
                  key={dateIndex}
                  isEmpty={!date}
                  disabled={true} // report 모드에서는 클릭 비활성화
                  style={{
                    backgroundColor:someAchieveDate.includes(date)?"rgba(106, 143, 246, 0.4)" : AllAchieveDate.includes(date) ? colors.indigoBlue : "",
                    borderRadius:someAchieveDate.includes(date)||AllAchieveDate.includes(date) ? '50%' : 0
                    
                  }}
                >
                  <DateText style={{
                    color:someAchieveDate.includes(date)||AllAchieveDate.includes(date) ? '#fff' : "#4A5660"
                  }}>
                    {date || ""}
                  </DateText>
                </DateEl>
              ))}

            </WeekRow>

            }
            <MarginVertical top={6} />
          </View>
        ))}
      </CalandarContentsBody>
    </CalandarBody>
  );
};

export default Calandar;

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
  z-index:2;
`

const SomeAchievedState = styled.View`
  width:4px;
  height:4px;
  border-radius:50%;
  background-color:rgba(176, 195, 255, 0.9);
  position:absolute;
  top:3px;
`

const AllAchivedState = styled.View`
width:4px;
height:4px;
border-radius:50%;
background-color:rgba(0, 60, 255, 1);
position:absolute;
  top:3px;
  `