import { useSelector } from "react-redux";
import { ViewType } from "../store/ducks/viewMode/viewMode.types";
import { RootState } from "../store/store";
import { Day } from "./Day";
import { Month } from "./Month";

function App() {
  const viewMode = useSelector((state: RootState) => state.viewMode.type);

  return (
    <div className="bg-light p-1" style={{ minHeight: "100vw" }}>
      <h1 className="">Event Manager</h1>
      <div className="">
        {viewMode === ViewType.day && <Day />}
        {viewMode === ViewType.month && <Month />}
      </div>
    </div>
  );
}

export default App;
