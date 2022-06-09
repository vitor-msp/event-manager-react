import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentDay } from "../store/ducks/currentDate/currentDate.slice";
import { AppDispatch } from "../store/store";
import "./DayMini.css";

export type DayType = {
  day: number;
  countEvents: number;
};

export const DayMini: React.FC<DayType> = (props) => {
  const { day, countEvents } = props;

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleViewDay = async () => {
    await dispatch(setCurrentDay(day));

    navigate("/day");
  };

  return (
    <div
      style={{
        width: "calc(100%/7)",
        height: "75px",
        cursor: "pointer",
      }}
      className="daymini d-flex flex-column justify-content-center align-items-center border"
      onClick={handleViewDay}
    >
      <span style={{ fontSize: "1.5em" }} className="">{`${day}`}</span>
      <span>{`${countEvents} events`}</span>
    </div>
  );
};
