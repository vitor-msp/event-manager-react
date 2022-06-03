import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { eventsCalendarReducer } from "./ducks/eventsCalendar/eventsCalendar.slice";

export const store = configureStore({
  reducer: {
    eventsCalendar: eventsCalendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
