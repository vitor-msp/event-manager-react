import { IEventsBackend } from "../store/ducks/eventsCalendar/eventsCalendar.types";

const currentDate = new Date();

export const eventsMock: IEventsBackend = {
  year: currentDate.getFullYear(),
  month: currentDate.getMonth(),
  days: [
    {
      day: currentDate.getDate(),
      events: [
        {
          id: 1,
          creator: 1,
          title: "Event 1",
          start: currentDate,
          duration: 60 * 60,
          guests: [
            { user: 2, permission: "Editor" },
            { user: 3, permission: "Viewer" },
          ],
        },
        {
          id: 2,
          creator: 2,
          title: "Event 2",
          start: new Date(currentDate.getTime() + 60 * 60 * 1000),
          duration: 0,
          guests: [
            { user: 1, permission: "Editor" },
            { user: 3, permission: "Viewer" },
          ],
        },
      ],
    },
  ],
};
