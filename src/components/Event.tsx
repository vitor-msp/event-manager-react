import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentEvent } from "../store/ducks/currentEvent/currentEvent.slice";
import {
  ICurrentEvent,
  IShowEvent,
} from "../store/ducks/currentEvent/currentEvent.types";
import {
  cancelEventRequest,
  editEventRequest,
  exitEventRequest,
  addEventRequest,
} from "../store/ducks/eventsCalendar/eventsCalendar.middleware";
import {
  IEvent,
  IGuest,
} from "../store/ducks/eventsCalendar/eventsCalendar.types";
import { AppDispatch, RootState } from "../store/store";
import { GuestsList } from "./GuestsList";
import { Form, Modal } from "react-bootstrap";

export type EventType = {
  event: IShowEvent;
};

export const Event: React.FC<EventType> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { id, creator, duration, guests, start, title } = props.event.data!;
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const creatorEmail = useSelector((state: RootState) =>
    state.users.data.users.find((u) => u.id === creator)
  )?.email;

  useEffect(() => {
    setShowModal(true);
  }, []);

  const [currentEvent, setCurrentEvent] = useState<ICurrentEvent>({
    id,
    creator,
    duration,
    guests,
    start: start ?? new Date(),
    title,
  });

  useEffect(() => {
    (() => {
      if (props.event.data!.creator === currentUser.id) {
        setCanEdit(true);
        return;
      }

      if (
        props.event.data!.guests?.find(
          (g) => g.user === currentUser.id && g.permission === "Editor"
        )
      ) {
        setCanEdit(true);
        return;
      }
      setCanEdit(false);
    })();
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  const handleCloseEvent = () => {
    dispatch(clearCurrentEvent());
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
  };

  const handleChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEvent({
      ...currentEvent,
      start: new Date(e.target.value),
    });
  };

  const handleChangeGuests = (guests: IGuest[]): void => {
    setCurrentEvent({ ...currentEvent, guests });
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().substring(0, 16);
  };

  const handleAddEvent = async (): Promise<void> => {
    const eventToPost = copyEvent(currentEvent);

    await dispatch(addEventRequest(eventToPost));
  };

  const handleExitEvent = async (): Promise<void> => {
    const eventToExit = copyEvent(props.event.data!);

    await dispatch(exitEventRequest(eventToExit));
  };

  const handleCancelEvent = async (): Promise<void> => {
    const eventToCancel = copyEvent(props.event.data!);

    await dispatch(cancelEventRequest(eventToCancel));
  };

  const handleEditEvent = async (): Promise<void> => {
    const eventToEdit = copyEvent(currentEvent);

    await dispatch(
      editEventRequest({
        oldStart: props.event.data!.start!,
        editedEvent: eventToEdit,
      })
    );
  };

  const copyEvent = (event: ICurrentEvent): IEvent => {
    const { creator, duration, guests, id, start, title } = event;

    return {
      creator: creator!,
      duration: duration!,
      guests: guests!,
      id: id!,
      start: start!,
      title: title!,
    };
  };

  return (
    <Modal show={showModal} onHide={handleCloseEvent}>
      <Modal.Header closeButton>
        <Modal.Title>Event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex my-2">
          <Form.Label>{"Id: "}</Form.Label>
          <Form.Control
            className="w-auto mx-3"
            disabled={true}
            type={"text"}
            value={currentEvent.id ?? ""}
          />
        </div>

        <div className="d-flex my-2">
          <Form.Label>{"Creator: "}</Form.Label>
          <Form.Control
            className="w-auto mx-3"
            required={true}
            disabled={true}
            type={"email"}
            placeholder={`example: test@test.com`}
            value={creatorEmail ?? ""}
            // onChange={(event) => {
            //   onInputChange(event.target.value);
            // }}
            // isValid={showValidation === true && isValid === true ? true : false}
            // isInvalid={
            //   showValidation === true && isValid === false ? true : false
            // }
          />
        </div>

        <span>{`title `}</span>
        <input
          type={"text"}
          disabled={!canEdit}
          value={currentEvent.title ?? ""}
          name={"title"}
          onChange={handleChange}
        />
        <br />
        <span>{`start `}</span>
        <input
          type={"datetime-local"}
          disabled={!canEdit}
          value={formatDate(currentEvent.start!)}
          name={"start"}
          onChange={handleChangeStart}
        />
        <br />
        <span>{`duration `}</span>
        <input
          type={"number"}
          min={0}
          disabled={!canEdit}
          value={currentEvent.duration ?? ""}
          name={"duration"}
          onChange={handleChange}
        />
        <br />
        <span>{`guests `}</span>
        <GuestsList
          guests={currentEvent.guests!}
          canEdit={canEdit}
          onChange={handleChangeGuests}
        />
      </Modal.Body>

      <Modal.Footer>
        {props.event.isAddition && (
          <button className="btn btn-primary" onClick={handleAddEvent}>
            add
          </button>
        )}

        {!props.event.isAddition && (
          <button className="btn btn-danger" onClick={handleExitEvent}>
            exit of the event
          </button>
        )}

        {!props.event.isAddition && props.event.data!.creator === 1 && (
          <button className="btn btn-danger" onClick={handleCancelEvent}>
            cancel event
          </button>
        )}

        {!props.event.isAddition && canEdit && (
          <button className="btn btn-primary" onClick={handleEditEvent}>
            edit event
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
