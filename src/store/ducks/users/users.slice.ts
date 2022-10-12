import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUsers, IUsersState } from "./users.types";

const initialState: IUsersState = {
  data: {
    users: [],
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, { payload }: PayloadAction<IUsers>) => {
      let users = state.data.users;

      while (users.length > 0) {
        users.pop();
      }

      console.log(payload);

      users.push(...payload.users);
    },
  },
});

export const { addUsers } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
