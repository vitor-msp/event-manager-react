import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IGuest } from "../store/ducks/eventsCalendar/eventsCalendar.types";
import { AppDispatch, RootState } from "../store/store";

export type GuestsType = {
  guests: IGuest[];
  canEdit: boolean;
  onChange: (guests: IGuest[]) => void;
};

export const GuestsList: React.FC<GuestsType> = (props) => {
  const { guests, onChange } = props;
  const users = useSelector((state: RootState) => state.users.data.users);
  const usersToShow = users.filter(
    (u) => u.id !== 1 && guests.findIndex((g) => g.user === u.id) === -1
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleChangePermission = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const [user, permission] = e.target.value.split("-");
    const userId = +user;

    let newGuests: IGuest[] = Object.assign([], guests);
    const index = newGuests.findIndex((g) => g.user === userId);

    if (index === -1) return;

    newGuests[index] = {
      user: userId,
      permission,
    };

    onChange([...newGuests]);
  };

  const handleDeleteGuest = (user: number): void => {
    const newGuests = guests.filter((g) => g.user !== user);

    onChange([...newGuests]);
  };

  const handleAddGuest = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newGuest: IGuest = {
      user: +e.target.value,
      permission: "Viewer",
    };

    onChange([...guests, newGuest]);
  };

  return (
    <div>
      <select onChange={handleAddGuest}>
        <option>---</option>
        {usersToShow.map((u) => {
          return (
            <option key={u.id} value={u.id}>
              {u.email}
            </option>
          );
        })}
      </select>

      {guests.length > 0 &&
        guests.map((g) => {
          return (
            <div key={g.user}>
              <span>user {g.user}</span>

              <span> permission </span>
              <select
                defaultValue={`${g.user}-${g.permission}`}
                onChange={handleChangePermission}
              >
                <option value={`${g.user}-Viewer`}>Viewer</option>
                <option value={`${g.user}-Editor`}>Editor</option>
              </select>

              <span onClick={() => handleDeleteGuest(g.user)}> X </span>
            </div>
          );
        })}
    </div>
  );
};
