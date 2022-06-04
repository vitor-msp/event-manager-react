// import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  decrementDay,
  decrementMonth,
  incrementDay,
  incrementMonth,
} from "../store/ducks/currentDate/currentDate.slice";
import {
  clearCurrentEvent,
  setCurrentEvent,
} from "../store/ducks/currentEvent/currentEvent.slice";
import {
  deleteEventRequest,
  getEventsRequest,
  postEventRequest,
  putEventRequest,
} from "../store/ducks/eventsCalendar/eventsCalendar.middleware";
import { AppDispatch, RootState } from "../store/store";

function App() {
  // const years = useSelector(
  //   (state: RootState) => state.eventsCalendar.data.years
  // );
  // const currentEvent = useSelector((state: RootState) => state.currentEvent);
  const currentDate = useSelector(
    (state: RootState) => state.currentDate.currentDate
  );
  const dispatch = useDispatch<AppDispatch>();
  const [count, setCount] = useState(1);

  // useEffect(() => {
  //   console.log(years);
  // }, [years]);

  // useEffect(() => {
  //   console.log(currentEvent);
  // }, [currentEvent]);

  useEffect(() => {
    console.log(currentDate.toString());
  }, [currentDate]);

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
        id: 3,
        creator: 1,
        title: "Event 3",
        start: new Date(new Date().getTime() - 2 * 60 * 1000),
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
        id: 1,
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

  const callModal = () => {
    dispatch(
      setCurrentEvent({
        id: 1,
        creator: 1,
        title: "Event 1",
        start: new Date(),
        duration: 0,
        guests: [
          { user: 2, permission: "Editor" },
          { user: 3, permission: "Viewer" },
        ],
      })
    );
  };

  const closeModal = () => {
    dispatch(clearCurrentEvent());
  };

  const incMonth = () => {
    dispatch(incrementMonth());
  };

  const decMonth = () => {
    dispatch(decrementMonth());
  };

  const incDay = () => {
    dispatch(incrementDay());
  };

  const decDay = () => {
    dispatch(decrementDay());
  };

  return (
    <div>
      <p>hello event manager</p>
      <button onClick={getEvents}>get events</button>
      <button onClick={editEventData}>edit event data</button>
      <button onClick={addEvent}>add event</button>
      <button onClick={deleteEvent}>delete event</button>
      <button onClick={editEventStart}>edit event start</button>
      <hr />
      <button onClick={callModal}>set current event</button>
      <button onClick={closeModal}>clear current event</button>
      <hr />
      <button onClick={incMonth}>increment month</button>
      <button onClick={decMonth}>decrement month</button>
      <hr />
      <button onClick={incDay}>increment Day</button>
      <button onClick={decDay}>decrement Day</button>
    </div>
  );
}

export default App;
