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

// show event type
export interface IShowEvent {
  isAddition: boolean;
  data?: ICurrentEvent;
}

// state type
export interface ICurrentEventState {
  data: ICurrentEvent;
  show: boolean;
  isAddition: boolean;
}
