import React from "react";
import { useDispatch } from "react-redux";
import { clearCurrentEvent } from "../store/ducks/currentEvent/currentEvent.slice";
import { ICurrentEvent } from "../store/ducks/currentEvent/currentEvent.types";
import { AppDispatch } from "../store/store";

export type EventYpe = {
  event: ICurrentEvent;
};

export const Event: React.FC<EventYpe> = (props) => {
  const { id, creator, duration, guests, start, title } = props.event;

  const dispatch = useDispatch<AppDispatch>();

  const handleCloseEvent = () => {
    dispatch(clearCurrentEvent());
  };

  return (
    <div onClick={() => {}}>
      <button onClick={handleCloseEvent}>X</button>
      <br />
      <span>{`id ${id}`}</span>
      <br />
      <span>{`creator ${creator}`}</span>
      <br />
      <span>{`title ${title}`}</span>
      <br />
      <span>{`start ${start}`}</span>
      <br />
      <span>{`duration ${duration}`}</span>
      <br />
      <span>{`guests ${guests}`}</span>
      <br />
    </div>
  );
};
