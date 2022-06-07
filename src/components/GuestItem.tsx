import React from "react";
import { IGuest } from "../store/ducks/eventsCalendar/eventsCalendar.types";

export type GuestType = {
  guest: IGuest;
  canEdit: boolean;
  onChangePermission: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onDeleteGuest: (guest: number) => void;
};

export const GuestItem: React.FC<GuestType> = (props) => {
  const { guest, canEdit, onChangePermission, onDeleteGuest } = props;
  const { user, permission } = guest;

  return (
    <div>
      <span>user {user}</span>

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
