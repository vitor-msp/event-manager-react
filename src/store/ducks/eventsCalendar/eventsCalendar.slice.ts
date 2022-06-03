import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEventsBackend, IEventsCalendarState } from "./eventsCalendar.types";

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

      state.data.years
        .find((y) => y.year === year)
        ?.months.find((m) => m.month === month)
        ?.days.push(...days);
    },
  },
});

export const { addMonth } = eventsCalendarSlice.actions;

export const eventsCalendarReducer = eventsCalendarSlice.reducer;
