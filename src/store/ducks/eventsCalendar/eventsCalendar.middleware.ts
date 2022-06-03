import { eventsMock } from "../../../services/events.mock";
import { AppThunk } from "../../store";
import { addEvent, addMonth, removeEvent } from "./eventsCalendar.slice";
import { IEvent } from "./eventsCalendar.types";

export const getEventsRequest =
  (/*graph: IGraph*/): AppThunk => async (dispatch) => {
    try {
      // simulate request;
      const res = {
        data: eventsMock,
      };

      dispatch(addMonth(res.data));
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
