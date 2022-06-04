import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentEvent, ICurrentEventState } from "./currentEvent.types";

const initialState: ICurrentEventState = {
  data: {
    id: null,
    title: null,
    creator: null,
    start: null,
    duration: null,
    guests: [],
  },
  show: false,
};

const currentEventSlice = createSlice({
  name: "currentEvent",
  initialState,
  reducers: {
    setCurrentEvent: (
      state,
      { payload }: PayloadAction<ICurrentEvent | null>
    ) => {
      if (payload) {
        const { id, title, creator, start, duration, guests } = payload;

        state.data.id = id ?? null;
        state.data.title = title ?? null;
        state.data.creator = creator ?? null;
        state.data.start = start ?? null;
        state.data.duration = duration ?? null;
        state.data.guests = guests ?? null;
      } else {
        state.data = initialState.data;
      }

      state.show = true;
    },
    clearCurrentEvent: (state) => {
      state.data.id = null;
      state.data.title = null;
      state.data.creator = null;
      state.data.start = null;
      state.data.duration = null;
      state.data.guests = [];

      state.show = false;
    },
  },
});

export const { clearCurrentEvent, setCurrentEvent } = currentEventSlice.actions;

export const currentEventReducer = currentEventSlice.reducer;
