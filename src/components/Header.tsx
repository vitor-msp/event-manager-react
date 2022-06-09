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
      <NavLink
        to={"/my-account"}
        style={{ position: "absolute", right: "5px", top: "5px" }}
        className="btn btn-lg btn-outline-primary"
      >
        My Account
      </NavLink>

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
