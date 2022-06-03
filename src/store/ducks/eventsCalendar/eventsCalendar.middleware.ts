import { eventsMockJul, eventsMockJun } from "../../../services/events.mock";
import { AppThunk } from "../../store";
import { addEvent, addMonth, removeEvent } from "./eventsCalendar.slice";
import { IEvent } from "./eventsCalendar.types";

export const getEventsRequest =
  (count: number /*graph: IGraph*/): AppThunk =>
  async (dispatch) => {
    try {
      // simulate request;
      if (count === 1) {
        dispatch(addMonth(eventsMockJun));
      } else {
        dispatch(addMonth(eventsMockJul));
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
