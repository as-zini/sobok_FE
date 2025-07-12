import dayjs from 'dayjs';

export const minToHour = (time) => {
    const hour = Math.floor(time/60);
    const min = time - (hour*60);
    return(
      hour === 0 ? `${min}M` : `${hour}H ${min}M`
    )
}

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export function getTimeDifference(startTime, endTime) {
  // dayjs로 두 시간 문자열을 "HH:mm" 형식으로 파싱
  const start = dayjs(`1970-01-01T${startTime}:00`);
  const end = dayjs(`1970-01-01T${endTime}:00`);

  // 시간 차이를 계산 (milliseconds)
  let diff = end.diff(start);

  // 만약 diff가 음수라면, 하루(24시간)을 더함
  if (diff < 0) {
    diff += 24 * 60 * 60 * 1000; // 24시간을 밀리초로 더함
  }

  // dayjs에서 duration을 사용하여 차이를 hours와 minutes로 나눔
  const hours = dayjs.duration(diff).hours();
  const minutes = dayjs.duration(diff).minutes();

  // "XH YM" 형식으로 반환
  return hours !== 0 ? `${hours}H ${minutes}M` : `${minutes}M`;
}
 
