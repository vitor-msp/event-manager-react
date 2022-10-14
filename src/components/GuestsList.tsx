import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IGuest } from "../store/ducks/eventsCalendar/eventsCalendar.types";
import { RootState } from "../store/store";
import { GuestItem } from "./GuestItem";

export type GuestsType = {
  creator: number;
  guests: IGuest[];
  canEdit: boolean;
  onChange: (guests: IGuest[]) => void;
};

export const GuestsList: React.FC<GuestsType> = (props) => {
  const { creator, guests, onChange, canEdit } = props;
  const users = useSelector((state: RootState) => state.users.data.users);
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const usersToShow = users.filter(
    (u) =>
      u.id !== currentUser.id &&
      guests.findIndex((g) => g.user === u.id) === -1 &&
      u.id !== creator
  );

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
    <>
      {canEdit && (
        <div className="row my-2">
          <Form.Label className="col-2">{"Guests: "}</Form.Label>
          <Form.Select className="col-10 w-auto mx-3" onChange={handleAddGuest}>
            <option>-- add a guest --</option>
            {usersToShow.map((u) => {
              return (
                <option key={u.id} value={u.id}>
                  {u.email}
                </option>
              );
            })}
          </Form.Select>
        </div>
      )}

      <ul className="row my-2 list-group px-4">
        {guests.length > 0 &&
          guests.map((g) => {
            return (
              <GuestItem
                key={g.user}
                guest={g}
                canEdit={canEdit}
                onChangePermission={handleChangePermission}
                onDeleteGuest={handleDeleteGuest}
              />
            );
          })}
      </ul>
    </>
  );
};
