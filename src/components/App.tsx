import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { setCurrentEvent } from "../store/ducks/currentEvent/currentEvent.slice";
import { loginRequest } from "../store/ducks/currentUser/currentUser.middleware";
import { getUsersRequest } from "../store/ducks/users/users.middleware";
import { AppDispatch, RootState } from "../store/store";
import { Day } from "./Day";
import { Event } from "./Event";
import { Month } from "./Month";

function App() {
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
      <div className="d-flex flex-row justify-content-between">
        <h1>Event Manager</h1>

        <button className="btn btn-outline-primary" onClick={() => {}}>
          My Account
        </button>
      </div>

      {/* <div>
        <button onClick={login}>login</button>
        <button onClick={getUsers}>get users</button>
      </div> */}

      <div>
        <button
          style={{ fontSize: "1.5em", position: "absolute" }}
          className="btn btn-lg btn-primary mx-2"
          onClick={addEvent}
        >
          +
        </button>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path={"/" || "login"} element={<p>login</p>} />
          <Route path="month" element={<Month />} />
          <Route path="day" element={<Day />} />
          <Route path="my-account" element={<p>my account</p>} />
        </Routes>
      </BrowserRouter>

      {currentEvent.show && <Event event={currentEvent} />}
    </div>
  );
}

export default App;
