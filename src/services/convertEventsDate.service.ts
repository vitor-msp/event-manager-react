import { IEventsBackend } from "../store/ducks/eventsCalendar/eventsCalendar.types";

export const convertEventsDate = (
  eventsData: IEventsBackend
): IEventsBackend => {
  eventsData.days.forEach((day) =>
    day.events.forEach((event) => {
      event.start = new Date(event.start);
    })
  );

  return eventsData;
};
