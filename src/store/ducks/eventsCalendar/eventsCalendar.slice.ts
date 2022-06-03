import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IEditEvent,
  IEvent,
  IEventsBackend,
  IEventsCalendarState,
} from "./eventsCalendar.types";
import {
  findDayInStore,
  addEventToStore,
  findEventInDay,
  removeEventInDay,
} from "./eventsHelper";

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

      const day = findDayInStore(state, oldStart);

      let savedEvent = findEventInDay(id, day);

      if (oldStart === start) {
        savedEvent!.title = title;
        savedEvent!.duration = duration;
        savedEvent!.guests = guests;
      } else {
        removeEventInDay(id, day!);

        addEventToStore(state, editedEvent);
      }
    },
    addEvent: (state, { payload }: PayloadAction<IEvent>) => {
      addEventToStore(state, payload);
    },
    removeEvent: (state, { payload }: PayloadAction<IEvent>) => {
      const { id, start } = payload;

      const day = findDayInStore(state, start);

      removeEventInDay(id, day!);
    },
  },
});

export const { addMonth, editEvent, addEvent, removeEvent } =
  eventsCalendarSlice.actions;

export const eventsCalendarReducer = eventsCalendarSlice.reducer;
