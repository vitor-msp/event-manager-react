import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentEvent } from "./currentEvent.types";

const initialState: ICurrentEvent = {
  id: null,
  title: null,
  creator: null,
  start: null,
  duration: null,
  guests: [],
};

const currentEventSlice = createSlice({
  name: "currentEvent",
  initialState,
  reducers: {
    setCurrentEvent: (state, { payload }: PayloadAction<ICurrentEvent>) => {
      const { id, title, creator, start, duration, guests } = payload;

      state.id = id;
      state.title = title;
      state.creator = creator;
      state.start = start;
      state.duration = duration;
      state.guests = guests;
    },
    clearCurrentEvent: (state) => {
      state.id = null;
      state.title = null;
      state.creator = null;
      state.start = null;
      state.duration = null;
      state.guests = [];
    },
  },
});

export const { clearCurrentEvent, setCurrentEvent } = currentEventSlice.actions;

export const currentEventReducer = currentEventSlice.reducer;
