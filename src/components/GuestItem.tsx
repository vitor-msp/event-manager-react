import React from "react";
import { useSelector } from "react-redux";
import { IGuest } from "../store/ducks/eventsCalendar/eventsCalendar.types";
import { RootState } from "../store/store";

export type GuestType = {
  guest: IGuest;
  canEdit: boolean;
  onChangePermission: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onDeleteGuest: (guest: number) => void;
};

export const GuestItem: React.FC<GuestType> = (props) => {
  const { guest, canEdit, onChangePermission, onDeleteGuest } = props;
  const { user, permission } = guest;

  const guestEmail = useSelector((state: RootState) =>
    state.users.data.users.find((u) => u.id === user)
  )?.email;

  return (
    <div>
      <span>user {guestEmail}</span>

      <span> permission </span>
      <select
        defaultValue={`${user}-${permission}`}
        onChange={onChangePermission}
        disabled={!canEdit}
      >
        <option value={`${user}-Viewer`}>Viewer</option>
        <option value={`${user}-Editor`}>Editor</option>
      </select>

      {canEdit && <span onClick={() => onDeleteGuest(user)}> X </span>}
    </div>
  );
};
