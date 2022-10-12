import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICurrentUserData,
  IUpdateUserDataRequest,
  IUserData,
} from "./userData.types";

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
    updateUserData: (
      state,
      { payload }: PayloadAction<IUpdateUserDataRequest>
    ) => {
      state.data!.name = payload.name;
    },
  },
});

export const { setUserData, removeUserData, updateUserData } =
  userDataSlice.actions;

export const userDataReducer = userDataSlice.reducer;
