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
  return `${time.getHours()}:${time.getMinutes()}`;
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
        top: `calc(50px * ${start.getHours()} + 50px/60 * ${start.getMinutes()})`,
        minHeight: "30px",
        height: `calc(50px/60 * ${duration / 1000 / 60})`,
        width: "auto",
        cursor: "pointer",
      }}
      className="eventmini rounded px-2 d-flex justify-content-center align-items-center"
      onClick={handleSelectEvent}
    >
      <span className="mx-4">{title}</span>

      <span className="mx-4">
        {`${getFormattedTime(start)} - ${getFormattedTime(
          new Date(start.getTime() + duration)
        )}`}
      </span>
      <br />
    </div>
  );
};
