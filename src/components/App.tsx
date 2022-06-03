// import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getEventsRequest } from "../store/ducks/eventsCalendar/eventsCalendar.middleware";
import { editEvent } from "../store/ducks/eventsCalendar/eventsCalendar.slice";
import { AppDispatch, RootState } from "../store/store";

function App() {
  const years = useSelector(
    (state: RootState) => state.eventsCalendar.data.years
  );
  const dispatch = useDispatch<AppDispatch>();

  console.log(years);

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

  return (
    <div className="App">
      <p>hello event manager</p>
      <button onClick={getEvents}>get events</button>
      <button onClick={editEventData}>edit event data</button>
    </div>
  );
}

export default App;
