import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userIsLoggedIn } from "../services/user.service";
import { getUsersRequest } from "../store/ducks/users/users.middleware";
import { AppDispatch, RootState } from "../store/store";
import { Day } from "./Day";
import { Event } from "./Event";
import { Header } from "./Header";
import { Login } from "./Login";
import { Month } from "./Month";
import { MyAccount } from "./MyAccount";
import { SignUp } from "./SignUp";

function App() {
  const currentEvent = useSelector((state: RootState) => state.currentEvent);
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userIsLoggedIn(currentUser)) dispatch(getUsersRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="container-fluid p-1">
      <h1>Event Manager</h1>

      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/login"} element={<Login />} />
          <Route path="/month" element={<Header child={<Month />} />} />
          <Route path="/day" element={<Header child={<Day />} />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>

      {currentEvent.show && <Event event={currentEvent} />}
    </div>
  );
}

export default App;
