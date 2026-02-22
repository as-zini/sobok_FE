import dayjs from 'dayjs';

export const minToHour = (time: number): string => {
  const hour = Math.floor(time / 60);
  const min = time - hour * 60;
  return hour === 0 ? `${min}M` : `${hour}H ${min}M`;
};

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export function getTimeDifference(startTime: string, endTime: string): string {
  const start = dayjs(`1970-01-01T${startTime}:00`);
  const end = dayjs(`1970-01-01T${endTime}:00`);

  let diff = end.diff(start);

  if (diff < 0) {
    diff += 24 * 60 * 60 * 1000;
  }

  const hours = (dayjs as any).duration(diff).hours();
  const minutes = (dayjs as any).duration(diff).minutes();

  return hours !== 0 ? `${hours}H ${minutes}M` : `${minutes}M`;
}

export function debouce(cb: (...args: any[]) => void, wait: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: any[]) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      cb(...args);
    }, wait);
  };
}

const toMinutes = (t: string): number => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

const normalize = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}): number[][] => {
  const s = toMinutes(startTime);
  const e = toMinutes(endTime);
  if (s === e) return [];
  if (s < e) return [[s, e]];
  return [
    [s, 1440],
    [0, e],
  ];
};

const overlap = (
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number
): boolean => aStart < bEnd && aEnd > bStart;

export function hasOverlap(
  target: { startTime: string; endTime: string },
  list: { startTime: string; endTime: string }[]
): boolean {
  const tSegs = normalize(target);
  return list.some((r) => {
    const rSegs = normalize(r);
    return tSegs.some(([ts, te]) =>
      rSegs.some(([rs, re]) => overlap(ts, te, rs, re))
    );
  });
}