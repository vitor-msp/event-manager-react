import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentUserData, IUserData } from "./userData.types";

const initialState: ICurrentUserData = {
  data: null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<IUserData>) => {
      state.data = {
        ...payload,
      };
    },
    removeUserData: (state) => {
      state.data = null;
    },
  },
});

export const { setUserData, removeUserData } = userDataSlice.actions;

export const userDataReducer = userDataSlice.reducer;
