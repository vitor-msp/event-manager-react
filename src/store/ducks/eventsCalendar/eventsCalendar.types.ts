// data types
export interface IEventsCalendar {
  years: IYear[];
}
export interface IYear {
  year: number;
  months: IMonth[];
}
export interface IMonth {
  month: number;
  days: IDay[];
}
export interface IDay {
  day: number;
  events: IEvent[];
}
export interface IEvent {
  id: number;
  start: Date;
  duration: number;
  title: string;
  creator: number;
  guests: IGuest[];
}
export interface IGuest {
  user: number;
  permission: string;
}

// edit event type
export interface IEditEvent {
  oldStart: Date;
  editedEvent: IEditEventBackend;
}

// backend type
export interface IEventsBackend {
  year: number;
  month: number;
  days: IDay[];
}
export interface IGetEventsRequest {
  year: number;
  month: number;
}
export interface IAddEventResponse {
  eventId: number;
}
export interface IEditEventBackend {
  id: number;
  start: Date;
  duration: number;
  title: string;
  creator: number;
  guests: IGuest[];
  guestsToRemove: number[];
}

// state type
export interface IEventsCalendarState {
  data: IEventsCalendar;
  counter: number;
}
