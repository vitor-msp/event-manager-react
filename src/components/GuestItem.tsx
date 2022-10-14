import React from "react";
import { Form } from "react-bootstrap";
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

  const currentUser = useSelector((state: RootState) => state.currentUser);

  const guestEmail = useSelector((state: RootState) =>
    state.users.data.users.find((u) => u.id === user)
  )?.email;

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>{guestEmail}</span>

      <Form.Select
        className="w-auto"
        defaultValue={`${user}-${permission}`}
        onChange={onChangePermission}
        disabled={!canEdit}
      >
        <option value={`${user}-Viewer`}>Viewer</option>
        <option value={`${user}-Editor`}>Editor</option>
      </Form.Select>

      {canEdit && user !== currentUser.id && (
        <span
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDeleteGuest(user)}
        >
          {" "}
          X{" "}
        </span>
      )}
    </li>
  );
};
