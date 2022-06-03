import { eventsMock } from "../../../services/events.mock";
import { AppThunk } from "../../store";
import { addMonth } from "./eventsCalendar.slice";

export const getEventsRequest =
  (/*graph: IGraph*/): AppThunk =>
  async (dispatch) => {
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
