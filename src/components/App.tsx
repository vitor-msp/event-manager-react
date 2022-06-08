import { useSelector } from "react-redux";
import { ViewType } from "../store/ducks/viewMode/viewMode.types";
import { RootState } from "../store/store";
import { Day } from "./Day";
import { Event } from "./Event";
import { Month } from "./Month";

function App() {
  const viewMode = useSelector((state: RootState) => state.viewMode.type);
  const currentEvent = useSelector((state: RootState) => state.currentEvent);

  return (
    <div className="container-fluid p-1">
      <h1>Event Manager</h1>
      <div>
        {viewMode === ViewType.day && <Day />}
        {viewMode === ViewType.month && <Month />}
      </div>

      {currentEvent.show && <Event event={currentEvent} />}
    </div>
  );
}

export default App;
