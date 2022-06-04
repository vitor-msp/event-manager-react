import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentEvent } from "../store/ducks/currentEvent/currentEvent.slice";
import { IEvent } from "../store/ducks/eventsCalendar/eventsCalendar.types";
import { AppDispatch } from "../store/store";

export type EventType = {
  event: IEvent;
};

export const EventMini: React.FC<EventType> = (props) => {
  const { title, start } = props.event;

  const dispatch = useDispatch<AppDispatch>();

  const handleSelectEvent = () => {
    dispatch(setCurrentEvent(props.event));
  };

  const getFormattedTime = (time: Date): string => {
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  };

  return (
    <div onClick={handleSelectEvent}>
      <span> {`${title} ${getFormattedTime(start)}`}</span>
      <br />
    </div>
  );
};
