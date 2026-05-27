import { WeeklyHours } from '../types';

const weekDayKeys = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'] as const;

export type WeekDayKey = (typeof weekDayKeys)[number];

export function getCurrentWeekDayKey(date = new Date()): WeekDayKey {
  return weekDayKeys[date.getDay()];
}

function toMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function isBusinessOpenNow(hours?: Partial<WeeklyHours>, date = new Date()) {
  const today = hours?.[getCurrentWeekDayKey(date)];

  if (!today || today.closed) {
    return false;
  }

  const now = date.getHours() * 60 + date.getMinutes();
  const open = toMinutes(today.open);
  const close = toMinutes(today.close);

  if (open === close) {
    return true;
  }

  if (open < close) {
    return now >= open && now <= close;
  }

  return now >= open || now <= close;
}
