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
      const newCurrentDate = new Date(state.currentDate.getTime());

      newCurrentDate.setMonth(newCurrentDate.getMonth() + 1);

      state.currentDate = newCurrentDate;
    },
    decrementMonth: (state) => {
      const newCurrentDate = new Date(state.currentDate.getTime());

      newCurrentDate.setMonth(newCurrentDate.getMonth() - 1);

      state.currentDate = newCurrentDate;
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
