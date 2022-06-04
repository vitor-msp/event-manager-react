import React from "react";
import { useDispatch } from "react-redux";
import { ICurrentEvent } from "../store/ducks/currentEvent/currentEvent.types";
import { AppDispatch } from "../store/store";

export type EventYpe = {
  event: ICurrentEvent;
};

export const Event: React.FC<EventYpe> = (props) => {
  const { id, creator, duration, guests, start, title } = props.event;

  // const dispatch = useDispatch<AppDispatch>();

  // const handleViewDay = async () => {
  //   await dispatch(setCurrentDay(day));

  //   dispatch(setViewDay());
  // };

  return (
    <div onClick={() => {}}>
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
