import { Business } from '../../types';
import { DAYS_OF_WEEK } from '../BusinessDetail/DaysOfWeek';
import { getCurrentWeekDayKey } from '../../utils/business-hours';

interface Props {
  hours: Business['hours'];
}

export function BusinessHoursBlock({ hours }: Props) {
  const today = getCurrentWeekDayKey();

  return (
    <ul className="space-y-2.5">
      {DAYS_OF_WEEK.map(({ key, label }) => {
        const dayHours = hours[key as keyof typeof hours];
        const isToday  = key === today;
        return (
          <li
            key={key}
            className={`flex justify-between text-sm ${isToday ? 'font-bold text-moss-900 dark:text-dark-text' : 'text-charcoal-light dark:text-dark-muted'}`}>
            <span className="flex items-center gap-2">
              {isToday && <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />}
              {label}
            </span>
            <span>{dayHours.closed ? 'Fechado' : `${dayHours.open} - ${dayHours.close}`}</span>
          </li>
        );
      })}
    </ul>
  );
}