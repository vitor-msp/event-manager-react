import { IEventsBackend } from "../store/ducks/eventsCalendar/eventsCalendar.types";

const currentDate = new Date();

export const eventsMockJun: IEventsBackend = {
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

const oneMoreMonth = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);

export const eventsMockJul: IEventsBackend = {
  year: oneMoreMonth.getFullYear(),
  month: oneMoreMonth.getMonth(),
  days: [
    {
      day: oneMoreMonth.getDate(),
      events: [
        {
          id: 10,
          creator: 1,
          title: "Event 10",
          start: oneMoreMonth,
          duration: 60 * 60,
          guests: [
            { user: 2, permission: "Editor" },
            { user: 3, permission: "Viewer" },
          ],
        },
        {
          id: 11,
          creator: 2,
          title: "Event 11",
          start: new Date(oneMoreMonth.getTime() + 60 * 60 * 1000),
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


const oneMoreYear = new Date(currentDate.getTime() + 365 * 24 * 60 * 60 * 1000);

export const eventsMock2023: IEventsBackend = {
  year: oneMoreYear.getFullYear(),
  month: oneMoreYear.getMonth(),
  days: [
    {
      day: oneMoreYear.getDate(),
      events: [
        {
          id: 100,
          creator: 1,
          title: "Event 100",
          start: oneMoreYear,
          duration: 60 * 60,
          guests: [
            { user: 2, permission: "Editor" },
            { user: 3, permission: "Viewer" },
          ],
        },
        {
          id: 111,
          creator: 2,
          title: "Event 111",
          start: new Date(oneMoreYear.getTime() + 60 * 60 * 1000),
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