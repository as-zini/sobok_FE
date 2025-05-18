

// import dayjs from 'dayjs'
// import React, { useEffect, useState } from 'react'
// import { Text } from 'react-native';
// import styled from 'styled-components'
// import { colors } from '../styles/colors';

// const WeekCalandar = ({ selectedDate, setSelectedDate, isDuplication, version, achieveList, setIsNextMonth }) => {
//   const [today, setToday] = useState(dayjs());
//   const DayTexts = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//   const [weekDates, setWeekDates] = useState([]);
//   const SomeAchieveDate = version === "statistic" ? achieveList.map((el) => el.status === "SOME_ACHIEVED" ? Number(el.date.slice(8, 10)) : "") : [];
//   const AllAchieveDate = version === "statistic" ? achieveList.map((el) => (el.status === "ALL_ACHIEVED") || (el.status === "ACHIEVED") ? Number(el.date.slice(8, 10)) : "") : [];

//   const getWeekDate = () => {
//     const dateList = [];
//     let hasNextMonth = false;
//     const currentMonth = dayjs(today).month(); // 0~11

//     for (let i = 0; i <= 6; i++) {
//       const dateObj = dayjs(today).startOf('week').add(i, 'day');
//       const date = dateObj.get('date');
//       const month = dateObj.month();

//       dateList.push(date);

//       if (month !== currentMonth) {
//         hasNextMonth = true;
//       }
//     }

//     setWeekDates(dateList);
//     if(version !== "day"){
//       setIsNextMonth(hasNextMonth);

//     }
//   }

//   useEffect(() => {
//     getWeekDate();
//   }, [selectedDate]);

//   return (
//     <WeekCalandarBody>
//       {version === "date" ?
//         <DayArea>
//           {DayTexts.map((el, index) => (
//             <DayEl key={index}>
//               <DayText>{el}</DayText>
//             </DayEl>
//           ))}
//         </DayArea>
//         : null}
//       <WeekCalandarContentsBody>
//         {version === "day" ?
//           DayTexts.map((el, index) => (
//             <DateEl
//               key={index}
//               onPress={() => {
//                 if (isDuplication) {
//                   if (selectedDate.includes(el)) {
//                     let result = selectedDate.filter((j) => el !== j)
//                     setSelectedDate(result);
//                   } else {
//                     setSelectedDate(prev => [...prev, el]);
//                   }
//                 } else {
//                   setSelectedDate(el);
//                 }
//               }}
//             >
//               {(isDuplication && selectedDate?.includes(el)) || (!isDuplication && selectedDate === el) ?
//                 <>
//                   <SelectedCircle />
//                   <DateText style={{ color: "#fff", fontSize: 12 }}>{el}</DateText>
//                 </>
//                 :
//                 <DateText style={{ fontSize: 12 }}>{el}</DateText>
//               }
//             </DateEl>
//           ))
//           :
//           weekDates.map((el, index) => (
//             <DateEl
//               key={index}
//               onPress={() => {
//                 if (isDuplication) {
//                   if (selectedDate.includes(index)) {
//                     let result = selectedDate.filter((el) => el !== index);
//                     setSelectedDate(result);
//                   } else {
//                     setSelectedDate(prev => [...prev, index]);
//                   }
//                 } else {
//                   setSelectedDate(el);
//                 }
//               }}
//             >
//               {SomeAchieveDate.includes(el) ? <SomeAchievedState /> :
//                 AllAchieveDate.includes(el) ? <AllAchivedState /> : null}
//               {(isDuplication && selectedDate?.includes(index)) || (!isDuplication && selectedDate === el) ?
//                 <>
//                   <SelectedCircle />
//                   <DateText style={{ color: "#fff" }}>{el}</DateText>
//                 </>
//                 :
//                 <DateText>{el}</DateText>
//               }
//             </DateEl>
//           ))
//         }
//       </WeekCalandarContentsBody>
//     </WeekCalandarBody>
//   )
// }

// export default WeekCalandar;

// // 스타일드 컴포넌트
// const WeekCalandarBody = styled.View`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const DayArea = styled.View`
//   display: flex;
//   flex-direction: row;
//   gap: 8px;
//   width: 258px;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// const DayEl = styled.View`
//   width: 30px;
//   height: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const DayText = styled.Text`
//   font-size: 12px;
//   color: rgba(27, 31, 38, 0.72);
//   font-weight: 500;
// `;

// const WeekCalandarContentsBody = styled.View`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   width: 310px;
//   height: 50px;
//   border-radius: 12px;
//   background-color: #fff;
//   gap: 8px;
// `;

// const DateEl = styled.TouchableOpacity`
//   width: 30px;
//   height: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const DateText = styled.Text`
//   font-size: 18px;
//   font-weight: 500;
//   color: #4A5660;
// `;

// const SelectedCircle = styled.View`
//   width: 35px;
//   height: 35px;
//   background-color: ${colors.fontMain};
//   border-radius: 50%;
//   position: absolute;
// `;

// const SomeAchievedState = styled.View`
//   width: 4px;
//   height: 4px;
//   border-radius: 50%;
//   background-color: rgba(176, 195, 255, 0.9);
//   position: absolute;
//   top: 0px;
// `;

// const AllAchivedState = styled.View`
//   width: 4px;
//   height: 4px;
//   border-radius: 50%;
//   background-color: rgba(0, 60, 255, 1);
//   position: absolute;
//   top: 0px;
// `;


import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../styles/colors';

const dayMapShortToLong = {
  SUN: 'SUNDAY',
  MON: 'MONDAY',
  TUE: 'TUESDAY',
  WED: 'WEDNESDAY',
  THU: 'THURSDAY',
  FRI: 'FRIDAY',
  SAT: 'SATURDAY',
};
const dayMapLongToShort = Object.fromEntries(
  Object.entries(dayMapShortToLong).map(([short, long]) => [long, short])
);

const WeekCalendar = ({ selectedDate, setSelectedDate, isDuplication, version, achieveList, setIsNextMonth }) => {
  const [today] = useState(dayjs());
  const DayTexts = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [weekDates, setWeekDates] = useState([]);

  const SomeAchieveDate = version === 'statistic'
    ? achieveList
        .filter(el => el.status === 'SOME_ACHIEVED')
        .map(el => Number(el.date.slice(8, 10)))
    : [];
  const AllAchieveDate = version === 'statistic'
    ? achieveList
        .filter(el => el.status === 'ALL_ACHIEVED' || el.status === 'ACHIEVED')
        .map(el => Number(el.date.slice(8, 10)))
    : [];

  const getWeekDate = () => {
    const dateList = [];
    let hasNextMonth = false;
    const currentMonth = today.month();

    for (let i = 0; i < 7; i++) {
      const dateObj = today.startOf('week').add(i, 'day');
      const date = dateObj.date();
      if (dateObj.month() !== currentMonth) hasNextMonth = true;
      dateList.push(date);
    }

    setWeekDates(dateList);
    if (version !== 'day') setIsNextMonth(hasNextMonth);
  };

  useEffect(() => {
    getWeekDate();
  }, [selectedDate]);

  // helper to check selection
  const isDaySelected = (short) => {
    const long = dayMapShortToLong[short];
    if (isDuplication) {
      return Array.isArray(selectedDate) && 
        (selectedDate.includes(short) || selectedDate.includes(long));
    }
    return (selectedDate === short || selectedDate === long);
  };

  const handlePressDay = (short, payload) => {
    const long = dayMapShortToLong[short];
    if (isDuplication) {
      const prev = Array.isArray(selectedDate) ? selectedDate : [];
      const hasShort = prev.includes(short) || prev.includes(long);
      if (hasShort) {
        // remove both short and long
        setSelectedDate(
          prev.filter(v => v !== short && v !== long)
        );
      } else {
        setSelectedDate([...prev, long]);
      }
    } else {
      setSelectedDate(long);
    }
  };

  return (
    <Container>
      {version === 'date' && (
        <DayArea>
          {DayTexts.map((d, i) => (
            <DayEl key={i}><DayText>{d}</DayText></DayEl>
          ))}
        </DayArea>
      )}
      <WeekContents>
        {version === 'day'
          ? DayTexts.map((short, idx) => (
              <DateEl key={idx} onPress={() => handlePressDay(short)}>
                {isDaySelected(short) && <SelectedCircle />}
                <DateText selected={isDaySelected(short)}>{short}</DateText>
              </DateEl>
            ))
          : weekDates.map((num, idx) => {
              const short = DayTexts[idx];
              return (
                <DateEl key={idx} onPress={() => handlePressDay(short)}>
                  {SomeAchieveDate.includes(num) ? <SomeDot /> : AllAchieveDate.includes(num) ? <AllDot /> : null}
                  {isDaySelected(short) && <SelectedCircle />}
                  <DateText selected={isDaySelected(short)}>{num}</DateText>
                </DateEl>
              );
            })}
      </WeekContents>
    </Container>
  );
};

export default WeekCalendar;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;
const DayArea = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;
const DayEl = styled.View`
  width: 30px;
  align-items: center;
`;
const DayText = styled.Text`
  font-size: 12px;
  color: rgba(27, 31, 38, 0.72);
`;
const WeekContents = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 8px;
`;
const DateEl = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;
const DateText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.selected ? '#fff' : '#4A5660'};
`;
const SelectedCircle = styled.View`
  position: absolute;
  width: 35px;
  height: 35px;
  background-color: ${colors.fontMain};
  border-radius: 17.5px;
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
