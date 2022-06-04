import { createSlice } from "@reduxjs/toolkit";
import { IViewMode, ViewType } from "./viewMode.types";

const initialState: IViewMode = {
  type: ViewType.day,
};

const viewModeSlice = createSlice({
  name: "viewMode",
  initialState,
  reducers: {
    setViewMonth: (state) => {
      state.type = ViewType.month;
    },
    setViewDay: (state) => {
      state.type = ViewType.day;
    },
  },
});

export const { setViewDay, setViewMonth } = viewModeSlice.actions;

export const viewModeReducer = viewModeSlice.reducer;
