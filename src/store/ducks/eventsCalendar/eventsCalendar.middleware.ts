import {
  eventsMock2023,
  eventsMockJul,
  eventsMockJun,
} from "../../../services/events.mock";
import { AppThunk } from "../../store";
import {
  addEvent,
  addMonth,
  editEvent,
  removeEvent,
} from "./eventsCalendar.slice";
import { IEditEvent, IEvent } from "./eventsCalendar.types";

let counter = 1;

export const getEventsRequest =
  (date: Date): AppThunk =>
  async (dispatch) => {
    try {
      // simulate request;
      // if (count === 1) {
      //   dispatch(addMonth(eventsMockJun));
      // } else if (count === 2) {
      //   dispatch(addMonth(eventsMockJul));
      // } else {
      //   dispatch(addMonth(eventsMock2023));
      // }

      dispatch(
        addMonth({
          year: date.getFullYear(),
          month: date.getMonth(),
          days: [
            {
              day: date.getDate(),
              events: [
                {
                  id: counter++,
                  creator: 1,
                  title: "Event Test",
                  start: date,
                  duration: 0,
                  guests: [
                    { user: 2, permission: "Editor" },
                    { user: 3, permission: "Viewer" },
                  ],
                },
              ],
            },
          ],
        })
      );
    } catch (error) {
      alert("Error in request events");
      //   dispatch(postGraphFailure());
    }
  };

export const addEventRequest =
  (event: IEvent): AppThunk =>
  async (dispatch) => {
    try {
      // simulate request;
      const res = {
        data: event,
      };

      dispatch(addEvent(res.data));
    } catch (error) {
      alert("Error in post event");
      //   dispatch(postGraphFailure());
    }
  };

export const cancelEventRequest =
  (event: IEvent): AppThunk =>
  async (dispatch) => {
    try {
      // simulate request;
      const res = {
        data: event,
      };

      dispatch(removeEvent(res.data));
    } catch (error) {
      alert("Error in cancel event");
      //   dispatch(postGraphFailure());
    }
  };

export const editEventRequest =
  (event: IEditEvent): AppThunk =>
  async (dispatch) => {
    try {
      // simulate request;
      const res = {
        data: event,
      };

      dispatch(editEvent(res.data));
    } catch (error) {
      alert("Error in put event");
      //   dispatch(postGraphFailure());
    }
  };

export const exitEventRequest =
  (event: IEvent): AppThunk =>
  async (dispatch) => {
    try {
      // simulate request;
      const res = {
        data: event,
      };

      dispatch(removeEvent(res.data));
    } catch (error) {
      alert("Error in exit event");
      //   dispatch(postGraphFailure());
    }
  };
