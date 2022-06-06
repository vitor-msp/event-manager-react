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
  },
});

export const { loginUser } = currentUserSlice.actions;

export const currentUserReducer = currentUserSlice.reducer;
