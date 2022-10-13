import { convertEventsDate } from "../../../services/convertEventsDate.service";
import {
  addEventRequestApi,
  cancelEventRequestApi,
  editEventRequestApi,
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

      let eventsData = await getEventsRequestApi(getEventsData, jwt);

      eventsData = convertEventsDate(eventsData);

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
      const jwt = findJwt();

      const res = await cancelEventRequestApi(event.id, jwt);

      if (res.message) throw new Error(res.message);

      dispatch(removeEvent(event));
    } catch (error) {
      alert(`Error to cancel event: ${error}`);
    }
  };

export const editEventRequest =
  (event: IEditEvent): AppThunk =>
  async (dispatch) => {
    try {
      const jwt = findJwt();

      const res = await editEventRequestApi(event.editedEvent, jwt);

      if (res.message) throw new Error(res.message);

      dispatch(editEvent(event));
    } catch (error) {
      alert(`Error to edit event: ${error}`);
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
