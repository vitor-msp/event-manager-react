import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentDay } from "../store/ducks/currentDate/currentDate.slice";
import { setViewDay } from "../store/ducks/viewMode/viewMode.slice";
import { AppDispatch } from "../store/store";

export type DayType = {
  day: number;
  countEvents: number;
};

export const DayMini: React.FC<DayType> = (props) => {
  const { day, countEvents } = props;

  const dispatch = useDispatch<AppDispatch>();

  const handleViewDay = async () => {
    await dispatch(setCurrentDay(day));

    dispatch(setViewDay());
  };

  return (
    <div onClick={handleViewDay}>
      <span>{`day ${day}: ${countEvents} events`}</span>
      <br />
    </div>
  );
};
