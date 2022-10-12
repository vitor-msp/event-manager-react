import { NavLink } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  return (
    <div className="my-div-home-buttons">
      <NavLink to={"/signup"} className="btn btn-lg btn-outline-primary mx-1">
        Sign Up
      </NavLink>
      <NavLink to={"/login"} className="btn btn-lg btn-outline-primary mx-1">
        Sign In
      </NavLink>
    </div>
  );
};
