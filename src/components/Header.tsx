import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCurrentEvent } from "../store/ducks/currentEvent/currentEvent.slice";
import { AppDispatch, RootState } from "../store/store";
import "./Header.css";

export interface IHeader {
  child: any;
}

export const Header: React.FC<IHeader> = (props) => {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const dispatch = useDispatch<AppDispatch>();

  const addEvent = () => {
    dispatch(setCurrentEvent({ isAddition: true, creator: currentUser.id! }));
  };

  return (
    <>
      <div className="my-div-account-buttons">
        <NavLink
          to={"/my-account"}
          className="btn btn-lg btn-outline-primary mx-1"
        >
          My Account
        </NavLink>
        <NavLink to={"/logout"} className="btn btn-lg btn-outline-primary mx-1">
          Logout
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
