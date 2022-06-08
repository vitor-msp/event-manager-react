import { useDispatch, useSelector } from "react-redux";
import { setCurrentEvent } from "../store/ducks/currentEvent/currentEvent.slice";
import { loginRequest } from "../store/ducks/currentUser/currentUser.middleware";
import { getUsersRequest } from "../store/ducks/users/users.middleware";
import { ViewType } from "../store/ducks/viewMode/viewMode.types";
import { AppDispatch, RootState } from "../store/store";
import { Day } from "./Day";
import { Event } from "./Event";
import { Month } from "./Month";

function App() {
  const viewMode = useSelector((state: RootState) => state.viewMode.type);
  const currentEvent = useSelector((state: RootState) => state.currentEvent);
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const dispatch = useDispatch<AppDispatch>();

  const getUsers = () => {
    dispatch(getUsersRequest());
  };

  const login = () => {
    dispatch(loginRequest({ email: "a", password: "a" }));
  };

  const addEvent = () => {
    dispatch(setCurrentEvent({ isAddition: true, creator: currentUser.id! }));
  };

  return (
    <div className="container-fluid p-1">
      <h1>Event Manager</h1>

      {/* <div>
        <button onClick={login}>login</button>
        <button onClick={getUsers}>get users</button>
      </div> */}

      <div className="">
        <button
          style={{ fontSize: "1.5em", position: "absolute" }}
          className="btn btn-lg btn-primary mx-2"
          onClick={addEvent}
        >
          +
        </button>

        {viewMode === ViewType.day && <Day />}
        {viewMode === ViewType.month && <Month />}
      </div>

      {currentEvent.show && <Event event={currentEvent} />}
    </div>
  );
}

export default App;
