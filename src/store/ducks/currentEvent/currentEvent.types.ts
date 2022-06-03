import { IGuest } from "../eventsCalendar/eventsCalendar.types";

// data types
export interface ICurrentEvent {
  id: number | null;
  start: Date | null;
  duration: number | null;
  title: string | null;
  creator: number | null;
  guests: IGuest[] | null;
}

// state type
export interface ICurrentEventState {
  data: ICurrentEvent;
}