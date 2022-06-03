import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IEditEvent,
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
    },
    editEvent: (state, { payload }: PayloadAction<IEditEvent>) => {
      const { oldStart, editedEvent } = payload;
      const { id, title, start, duration, guests } = editedEvent;

      const day = state.data.years
        .find((y) => y.year === oldStart.getFullYear())
        ?.months.find((m) => m.month === oldStart.getMonth())
        ?.days.find((d) => d.day === oldStart.getDate());

      const savedEvent = day?.events.find((e) => e.id === id);

      if (oldStart === start) {
        savedEvent!.title = title;
        savedEvent!.duration = duration;
        savedEvent!.guests = guests;
      } else {
        // remove old event
        day!.events = day!.events.filter((e) => e.id !== id);
        // add edited event
        const savedMonth = state.data.years
          .find((y) => y.year === start.getFullYear())
          ?.months.find((m) => m.month === start.getMonth());

        if (savedMonth) {
          const savedDays = savedMonth.days;

          const savedDay = savedDays.find((d) => d.day === start.getDate());

          if (savedDay) {
            savedDay.events.push(editedEvent);
          } else {
            savedDays.push({ day: start.getDate(), events: [editedEvent] });
          }
        }
      }
    },
    addEvent: (state, { payload }: PayloadAction<IEvent>) => {
      const { start } = payload;

      const savedMonth = state.data.years
        .find((y) => y.year === start.getFullYear())
        ?.months.find((m) => m.month === start.getMonth());

      if (savedMonth) {
        const savedDays = savedMonth.days;

        const savedDay = savedDays.find((d) => d.day === start.getDate());

        if (savedDay) {
          savedDay.events.push(payload);
        } else {
          savedDays.push({ day: start.getDate(), events: [payload] });
        }
      }
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
