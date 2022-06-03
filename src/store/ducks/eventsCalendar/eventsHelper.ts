import { WritableDraft } from "immer/dist/internal";
import {
  IDay,
  IEvent,
  IEventsBackend,
  IEventsCalendarState,
  IMonth,
} from "./eventsCalendar.types";

export const findDayInStore = (
  state: WritableDraft<IEventsCalendarState>,
  start: Date
): WritableDraft<IDay> | undefined => {
  return state.data.years
    .find((y) => y.year === start.getFullYear())
    ?.months.find((m) => m.month === start.getMonth())
    ?.days.find((d) => d.day === start.getDate());
};

export const findEventInDay = (
  id: number,
  day?: WritableDraft<IDay>
): WritableDraft<IEvent> | undefined => {
  return day?.events.find((e) => e.id === id);
};

export const removeEventInDay = (
  id: number,
  day: WritableDraft<IDay>
): void => {
  day!.events = day.events.filter((e) => e.id !== id);
};

const findMonthInStore = (
  state: WritableDraft<IEventsCalendarState>,
  start: Date
): WritableDraft<IMonth> | undefined => {
  return state.data.years
    .find((y) => y.year === start.getFullYear())
    ?.months.find((m) => m.month === start.getMonth());
};

export const addEventToStore = (
  state: WritableDraft<IEventsCalendarState>,
  event: WritableDraft<IEvent>
): void => {
  const { start } = event;

  const savedMonth = findMonthInStore(state, start);

  if (savedMonth) {
    const savedDays = savedMonth.days;

    const savedDay = savedDays.find((d) => d.day === start.getDate());

    if (savedDay) {
      savedDay.events.push(event);
    } else {
      savedDays.push({ day: start.getDate(), events: [event] });
    }
  }
};

export const addMonthToStore = (
  state: WritableDraft<IEventsCalendarState>,
  events: WritableDraft<IEventsBackend>
): void => {
  const { year, month, days } = events;

  const savedYears = state.data.years;

  const savedYear = savedYears.find((y) => y.year === year);

  if (savedYear) {
    const savedMonths = savedYear.months;

    const savedMonth = savedMonths.find((m) => m.month === month);

    if (savedMonth) {
      const savedDays = savedMonth.days;

      while (savedDays!.length > 0) {
        savedDays!.pop();
      }

      savedDays!.push(...days);
    } else {
      savedMonths.push({
        month,
        days,
      });
    }
  } else {
    savedYears.push({
      year,
      months: [
        {
          month,
          days,
        },
      ],
    });
  }
};
