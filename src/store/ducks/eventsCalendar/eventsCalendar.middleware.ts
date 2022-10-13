import {
  addEventRequestApi,
  getEventsRequestApi,
} from "../../../services/eventsApi.service";
import { findJwt } from "../../../services/jwt.service";
import { AppThunk } from "../../store";
import {
  addEvent,
  addMonth,
  editEvent,
  removeEvent,
} from "./eventsCalendar.slice";
import { IEditEvent, IEvent, IGetEventsRequest } from "./eventsCalendar.types";

export const getEventsRequest =
  (date: Date = new Date()): AppThunk =>
  async (dispatch) => {
    try {
      const getEventsData: IGetEventsRequest = {
        month: date.getMonth(),
        year: date.getFullYear(),
      };

      const jwt = findJwt();

      const eventsData = await getEventsRequestApi(getEventsData, jwt);

      console.log(eventsData);

      dispatch(addMonth(eventsData));
    } catch (error) {
      alert("Error in request events");
      //   dispatch(postGraphFailure());
    }
  };

export const addEventRequest =
  (event: IEvent): AppThunk =>
  async (dispatch) => {
    try {
      const jwt = findJwt();

      const res = await addEventRequestApi(event, jwt);

      event.id = res.eventId;

      dispatch(addEvent(event));
    } catch (error) {
      alert("Error in post event");
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
