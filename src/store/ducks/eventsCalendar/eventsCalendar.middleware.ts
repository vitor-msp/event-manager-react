import {
  eventsMock2023,
  eventsMockJul,
  eventsMockJun,
} from "../../../services/events.mock";
import { AppThunk } from "../../store";
import { addEvent, addMonth, editEvent, removeEvent } from "./eventsCalendar.slice";
import { IEditEvent, IEvent } from "./eventsCalendar.types";

export const getEventsRequest =
  (count: number /*graph: IGraph*/): AppThunk =>
  async (dispatch) => {
    try {
      // simulate request;
      if (count === 1) {
        dispatch(addMonth(eventsMockJun));
      } else if (count === 2) {
        dispatch(addMonth(eventsMockJul));
      } else {
        dispatch(addMonth(eventsMock2023));
      }
    } catch (error) {
      alert("Error in request events");
      //   dispatch(postGraphFailure());
    }
  };

export const postEventRequest =
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

export const deleteEventRequest =
  (event: IEvent): AppThunk =>
  async (dispatch) => {
    try {
      // simulate request;
      const res = {
        data: event,
      };

      dispatch(removeEvent(res.data));
    } catch (error) {
      alert("Error in remove event");
      //   dispatch(postGraphFailure());
    }
  };

export const putEventRequest =
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
