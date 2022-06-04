import React from "react";
import { useDispatch } from "react-redux";
import { IGuest } from "../store/ducks/eventsCalendar/eventsCalendar.types";
import { AppDispatch } from "../store/store";

export type GuestsType = {
  guests: IGuest[];
  canEdit: boolean;
  onChange: (guests: IGuest[]) => void;
};

export const GuestsList: React.FC<GuestsType> = (props) => {
  const { guests, onChange } = props;

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = () => {
    onChange([]);
  };

  return (
    <div>
      {guests.length > 0 &&
        guests.map((g) => {
          return (
            <div key={g.user}>
              <span>user {g.user}</span>
              <span> permission {g.permission}</span>
            </div>
          );
        })}
    </div>
  );
};
