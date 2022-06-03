// import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteEventRequest,
  getEventsRequest,
  postEventRequest,
  putEventRequest,
} from "../store/ducks/eventsCalendar/eventsCalendar.middleware";
import { AppDispatch, RootState } from "../store/store";

function App() {
  const years = useSelector(
    (state: RootState) => state.eventsCalendar.data.years
  );
  const dispatch = useDispatch<AppDispatch>();
  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log(years);
  }, [years]);

  const getEvents = () => {
    console.log(count);
    dispatch(getEventsRequest(count));
    setCount(count + 1);
  };

  const editEventData = () => {
    const date = new Date();
    dispatch(
      putEventRequest({
        oldStart: date,
        editedEvent: {
          id: 1,
          creator: 1,
          title: "Event 1 Edited",
          start: date,
          duration: 0,
          guests: [
            { user: 2, permission: "Editor" },
            { user: 3, permission: "Viewer" },
          ],
        },
      })
    );
  };

  const addEvent = () => {
    dispatch(
      postEventRequest({
        id: 1000,
        creator: 1,
        title: "Event 1000",
        start: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
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

  const editEventStart = () => {
    dispatch(
      putEventRequest({
        oldStart: new Date(),
        editedEvent: {
          id: 1,
          creator: 1,
          title: "Event 1 Start Edited",
          start: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
          duration: 0,
          guests: [
            { user: 2, permission: "Editor" },
            { user: 3, permission: "Viewer" },
          ],
        },
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
      <button onClick={editEventStart}>edit event start</button>
    </div>
  );
}

export default App;
