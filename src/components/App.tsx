import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { loginRequest } from "../store/ducks/currentUser/currentUser.middleware";
import { getUsersRequest } from "../store/ducks/users/users.middleware";
import { AppDispatch, RootState } from "../store/store";
import { Day } from "./Day";
import { Event } from "./Event";
import { Header } from "./Header";
import { Month } from "./Month";

function App() {
  const currentEvent = useSelector((state: RootState) => state.currentEvent);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUsersRequest());

    dispatch(loginRequest({ email: "a", password: "a" }));
  }, []);

  //     <div>
  //   <button onClick={login}>login</button>
  //   <button onClick={getUsers}>get users</button>
  // </div>

  return (
    <div className="container-fluid p-1">
      <BrowserRouter>
        <Routes>
          <Route path={"/" || "/login"} element={<p>login</p>} />
          <Route path="/month" element={<Header child={<Month />} />} />
          <Route path="/day" element={<Header child={<Day />} />} />
          <Route path="/my-account" element={<p>my account</p>} />
        </Routes>
      </BrowserRouter>

      {currentEvent.show && <Event event={currentEvent} />}
    </div>
  );
}

export default App;
