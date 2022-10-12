import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentUser } from "./currentUser.types";

const initialState: ICurrentUser = {
  id: null,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    loginUser: (state, { payload }: PayloadAction<ICurrentUser>) => {
      state.id = payload.id;
    },
    logoutUser: (state) => {
      state.id = null;
    },
  },
});

export const { loginUser, logoutUser } = currentUserSlice.actions;

export const currentUserReducer = currentUserSlice.reducer;
