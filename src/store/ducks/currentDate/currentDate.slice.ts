import { createSlice } from "@reduxjs/toolkit";
import { ICurrentDate } from "./currentDate.types";

const initialState: ICurrentDate = {
  currentDate: new Date(),
};

const currentDateSlice = createSlice({
  name: "currentDate",
  initialState,
  reducers: {
    incrementMonth: (state) => {
      // const newCurrentDate = new Date(state.currentDate.getTime());

      // newCurrentDate.setMonth(newCurrentDate.getMonth() + 1);

      // state.currentDate = newCurrentDate;
      state.currentDate = new Date(
        state.currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
      );
    },
    decrementMonth: (state) => {
      // const newCurrentDate = new Date(state.currentDate.getTime());

      // newCurrentDate.setMonth(newCurrentDate.getMonth() - 1);

      // state.currentDate = newCurrentDate;
      state.currentDate = new Date(
        state.currentDate.getTime() - 30 * 24 * 60 * 60 * 1000
      );
    },
    incrementDay: (state) => {
      const newCurrentDate = new Date(state.currentDate.getTime());

      newCurrentDate.setDate(newCurrentDate.getDate() + 1);

      state.currentDate = newCurrentDate;
    },
    decrementDay: (state) => {
      const newCurrentDate = new Date(state.currentDate.getTime());

      newCurrentDate.setDate(newCurrentDate.getDate() - 1);

      state.currentDate = newCurrentDate;
    },
  },
});

export const { decrementMonth, incrementMonth, decrementDay, incrementDay } =
  currentDateSlice.actions;

export const currentDateReducer = currentDateSlice.reducer;
