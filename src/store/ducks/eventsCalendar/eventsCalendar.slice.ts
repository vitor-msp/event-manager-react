import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IEvent,
  IEventsBackend,
  IEventsCalendarState,
} from "./eventsCalendar.types";

const currentDate = new Date();

const initialState: IEventsCalendarState = {
  data: {
    years: [
      {
        year: currentDate.getFullYear(),
        months: [
          {
            month: currentDate.getMonth(),
            days: [],
          },
        ],
      },
    ],
  },
};

const eventsCalendarSlice = createSlice({
  name: "eventsCalendar",
  initialState,
  reducers: {
    addMonth: (state, { payload }: PayloadAction<IEventsBackend>) => {
      const year = payload.year;
      const month = payload.month;
      const days = payload.days;

      const savedMonths = state.data.years.find((y) => y.year === year)!.months;

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
    },
    editEvent: (state, { payload }: PayloadAction<IEvent>) => {
      const { id, title, start, duration, guests } = payload;

      const savedEvent = state.data.years
        .find((y) => y.year === start.getFullYear())
        ?.months.find((m) => m.month === start.getMonth())
        ?.days.find((d) => d.day === start.getDate())
        ?.events.find((e) => e.id === id);

      savedEvent!.title = title;
      savedEvent!.duration = duration;
      savedEvent!.guests = guests;
    },
    addEvent: (state, { payload }: PayloadAction<IEvent>) => {
      const { start } = payload;

      state.data.years
        .find((y) => y.year === start.getFullYear())
        ?.months.find((m) => m.month === start.getMonth())
        ?.days.find((d) => d.day === start.getDate())
        ?.events.push(payload);
    },
    removeEvent: (state, { payload }: PayloadAction<IEvent>) => {
      const { id, start } = payload;

      const day = state.data.years
        .find((y) => y.year === start.getFullYear())
        ?.months.find((m) => m.month === start.getMonth())
        ?.days.find((d) => d.day === start.getDate());

      day!.events = day!.events.filter((e) => e.id !== id);
    },
  },
});

export const { addMonth, editEvent, addEvent, removeEvent } =
  eventsCalendarSlice.actions;

export const eventsCalendarReducer = eventsCalendarSlice.reducer;
