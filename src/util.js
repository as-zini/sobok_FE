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

export function debouce(cb, wait){
  let timer = null
  
  return function(...args) {
    // 이전 타이머 취소
    if (timer) clearTimeout(timer);

    // 새 타이머 등록
    timer = setTimeout(() => {
      cb(...args);  // 마지막 인자로 실행
    }, wait);
  };
}

const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

// 구간 정규화: 같은날이면 [start,end] 한 개,
// 자정 넘으면 [start,1440]과 [0,end] 두 개로 쪼갬
const normalize = ({ startTime, endTime }) => {
  const s = toMinutes(startTime);
  const e = toMinutes(endTime);
  if (s === e) return [];                 // 길이 0 구간(겹침 없음)로 취급
  if (s < e) return [[s, e]];            // 같은 날
  return [[s, 1440], [0, e]];            // 자정 넘어감
};

// 열린 구간 겹침: [a,b)와 [c,d) 겹침 조건
const overlap = (aStart, aEnd, bStart, bEnd) =>
  aStart < bEnd && aEnd > bStart;         // 경계 접촉만(=)은 겹침 아님

// target과 목록의 어느 하나라도 겹치면 true
export function hasOverlap(target, list) {
  const tSegs = normalize(target);
  return list.some((r) => {
    const rSegs = normalize(r);
    return tSegs.some(([ts, te]) => rSegs.some(([rs, re]) => overlap(ts, te, rs, re)));
  });
}