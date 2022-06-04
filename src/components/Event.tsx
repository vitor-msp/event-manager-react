import React from "react";
import { useDispatch } from "react-redux";
import { clearCurrentEvent } from "../store/ducks/currentEvent/currentEvent.slice";
import { ICurrentEvent } from "../store/ducks/currentEvent/currentEvent.types";
import { AppDispatch } from "../store/store";
import { getFormattedTime } from "./EventMini";

export type EventType = {
  event: ICurrentEvent;
};

export const Event: React.FC<EventType> = (props) => {
  const { id, creator, duration, guests, start, title } = props.event;

  const dispatch = useDispatch<AppDispatch>();

  const handleCloseEvent = () => {
    dispatch(clearCurrentEvent());
  };

  return (
    <div onClick={() => {}}>
      <button onClick={handleCloseEvent}>X</button>
      <br />
      <span>{`id `}</span>
      <input type={"text"} value={id ?? ""} />
      <br />
      <span>{`creator `}</span>
      <input type={"text"} value={creator ?? ""} />
      <br />
      <span>{`title `}</span>
      <input type={"text"} value={title ?? ""} />
      <br />
      <span>{`start `}</span>
      <input type={"text"} value={start ? getFormattedTime(start) : ""} />
      <br />
      <span>{`duration `}</span>
      <input type={"text"} value={duration ?? ""} />
      <br />
      <span>{`guests `}</span>
      {guests!.length > 0 &&
        guests!.map((g) => {
          return (
            <div>
              <span>user {g.user}</span>
              <span> permission {g.permission}</span>
            </div>
          );
        })}
      <br />
    </div>
  );
};
