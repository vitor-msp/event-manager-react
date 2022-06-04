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
  addMonthToStore,
} from "./eventsHelper";

const currentDate = new Date();

const initialState: IEventsCalendarState = {
  data: {
    years: [
      // {
      //   year: currentDate.getFullYear(),
      //   months: [
      //     {
      //       month: currentDate.getMonth(),
      //       days: [],
      //     },
      //   ],
      // },
    ],
  },
  counter: 0,
};

const eventsCalendarSlice = createSlice({
  name: "eventsCalendar",
  initialState,
  reducers: {
    addMonth: (state, { payload }: PayloadAction<IEventsBackend>) => {
      addMonthToStore(state, payload);
      state.counter++;
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

      state.counter++;
    },
    addEvent: (state, { payload }: PayloadAction<IEvent>) => {
      addEventToStore(state, payload);
      state.counter++;
    },
    removeEvent: (state, { payload }: PayloadAction<IEvent>) => {
      const { id, start } = payload;

      const day = findDayInStore(state, start);

      removeEventInDay(id, day!);

      state.counter++;
    },
  },
});

export const { addMonth, editEvent, addEvent, removeEvent } =
  eventsCalendarSlice.actions;

export const eventsCalendarReducer = eventsCalendarSlice.reducer;
