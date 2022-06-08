import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentEvent } from "../store/ducks/currentEvent/currentEvent.slice";
import { IEvent } from "../store/ducks/eventsCalendar/eventsCalendar.types";
import { AppDispatch } from "../store/store";
import "./EventMini.css";

export type EventType = {
  event: IEvent;
};

export const getFormattedTime = (time: Date): string => {
  return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
};

export const EventMini: React.FC<EventType> = (props) => {
  const { title, start, duration } = props.event;

  const dispatch = useDispatch<AppDispatch>();

  const handleSelectEvent = () => {
    dispatch(setCurrentEvent({ isAddition: false, data: props.event }));
  };

  return (
    <div
      style={{
        position: "absolute",
        left: "50px",
        top: `calc(50px * ${start.getHours()} + 4px)`,
        minHeight: "30px",
        height: `calc(50px/60 * ${duration / 1000 / 60})`,
        cursor: "pointer",
      }}
      className="eventmini rounded px-2 w-50"
      onClick={handleSelectEvent}
    >
      <span> {`${title} ${getFormattedTime(start)}`}</span>
      <br />
    </div>
  );
};
