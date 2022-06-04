import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentEventState, IShowEvent } from "./currentEvent.types";

const initialState: ICurrentEventState = {
  data: {
    id: null,
    title: null,
    creator: 1,
    start: null,
    duration: null,
    guests: [],
  },
  show: false,
  isAddition: true,
};

const currentEventSlice = createSlice({
  name: "currentEvent",
  initialState,
  reducers: {
    setCurrentEvent: (state, { payload }: PayloadAction<IShowEvent>) => {
      if (payload.isAddition) {
        state.isAddition = true;

        state.data = initialState.data;
      } else {
        state.isAddition = false;

        const { id, title, creator, start, duration, guests } = payload.data!;

        state.data.id = id ?? null;
        state.data.title = title ?? null;
        state.data.creator = creator ?? null;
        state.data.start = start ?? null;
        state.data.duration = duration ?? null;
        state.data.guests = guests ?? null;
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
