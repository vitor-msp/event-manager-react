// import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteEventRequest,
  getEventsRequest,
  postEventRequest,
} from "../store/ducks/eventsCalendar/eventsCalendar.middleware";
import { editEvent } from "../store/ducks/eventsCalendar/eventsCalendar.slice";
import { AppDispatch, RootState } from "../store/store";

function App() {
  const years = useSelector(
    (state: RootState) => state.eventsCalendar.data.years
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(years);
  }, [years]);

  const getEvents = () => {
    dispatch(getEventsRequest());
  };

  const editEventData = () => {
    dispatch(
      editEvent({
        id: 1,
        creator: 1,
        title: "Event 1 Edited",
        start: new Date(),
        duration: 0,
        guests: [
          { user: 2, permission: "Editor" },
          { user: 3, permission: "Viewer" },
        ],
      })
    );
  };

  const addEvent = () => {
    dispatch(
      postEventRequest({
        id: 3,
        creator: 1,
        title: "Event 3",
        start: new Date(),
        duration: 0,
        guests: [
          { user: 2, permission: "Editor" },
          { user: 3, permission: "Viewer" },
        ],
      })
    );
  };

  const deleteEvent = () => {
    dispatch(
      //@ts-ignore
      deleteEventRequest({
        id: 3,
        start: new Date(),
        // creator: 1,
        // title: "Event 3",
        // duration: 0,
        // guests: [
        //   { user: 2, permission: "Editor" },
        //   { user: 3, permission: "Viewer" },
        // ],
      })
    );
  };

  return (
    <div className="App">
      <p>hello event manager</p>
      <button onClick={getEvents}>get events</button>
      <button onClick={editEventData}>edit event data</button>
      <button onClick={addEvent}>add event</button>
      <button onClick={deleteEvent}>delete event</button>
    </div>
  );
}

export default App;
