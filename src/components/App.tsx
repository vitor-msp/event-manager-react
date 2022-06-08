import { useSelector } from "react-redux";
import { ViewType } from "../store/ducks/viewMode/viewMode.types";
import { RootState } from "../store/store";
import { Day } from "./Day";
import { Month } from "./Month";

function App() {
  const viewMode = useSelector((state: RootState) => state.viewMode.type);

  return (
    <div className="container-fluid p-1">
      <h1>Event Manager</h1>
      <div>
        {viewMode === ViewType.day && <Day />}
        {viewMode === ViewType.month && <Month />}
      </div>
    </div>
  );
}

export default App;
