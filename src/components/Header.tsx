import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCurrentEvent } from "../store/ducks/currentEvent/currentEvent.slice";
import { loginRequest } from "../store/ducks/currentUser/currentUser.middleware";
import { getUsersRequest } from "../store/ducks/users/users.middleware";
import { AppDispatch, RootState } from "../store/store";

export interface IHeader {
  child: any;
}

export const Header: React.FC<IHeader> = (props) => {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUsersRequest());

    dispatch(loginRequest({ email: "a", password: "a" }));
  }, []);

  const addEvent = () => {
    dispatch(setCurrentEvent({ isAddition: true, creator: currentUser.id! }));
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-between">
        <h1>Event Manager</h1>

        <NavLink to={"/my-account"} className="btn btn-lg btn-outline-primary align-self-start">
          My Account
        </NavLink>
      </div>

      <div>
        <button
          style={{ fontSize: "1.5em", position: "absolute" }}
          className="btn btn-lg btn-primary mx-2"
          onClick={addEvent}
        >
          +
        </button>
      </div>

      {props.child}
    </>
  );
};
