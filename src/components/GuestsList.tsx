import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentEvent } from "../store/ducks/currentEvent/currentEvent.slice";
import {
  IEvent,
  IGuest,
} from "../store/ducks/eventsCalendar/eventsCalendar.types";
import { AppDispatch } from "../store/store";

export type GuestsType = {
  guests: IGuest[];
};

export const GuestsList: React.FC<GuestsType> = (props) => {
  // const { title, start } = props.guests;

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      {props.guests.length > 0 &&
        props.guests.map((g) => {
          return (
            <div>
              <span>user {g.user}</span>
              <span> permission {g.permission}</span>
            </div>
          );
        })}
    </div>
  );
};
