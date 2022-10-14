import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal } from "react-bootstrap";
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
  const [endEvent, setEndEvent] = useState<Date>(new Date());
  const [currentEvent, setCurrentEvent] = useState<ICurrentEvent>({
    id,
    creator,
    duration,
    guests,
    start: start ?? new Date(),
    title,
  });

  useEffect(() => {
    setShowModal(true);
  }, []);

  useEffect(() => {
    const end = new Date(
      currentEvent.start!.getTime() + currentEvent.duration!
    );

    setEndEvent(end);
  }, []);

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

  const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndEvent(new Date(e.target.value));
  };

  useEffect(() => {
    const duration = endEvent.getTime() - currentEvent.start!.getTime();

    setCurrentEvent({
      ...currentEvent,
      duration,
    });
  }, [endEvent]);

  const handleChangeGuests = (guests: IGuest[]): void => {
    setCurrentEvent({ ...currentEvent, guests });
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().substring(0, 16);
  };

  const handleAddEvent = async (): Promise<void> => {
    const eventToPost = copyEvent(currentEvent);

    await dispatch(addEventRequest(eventToPost));

    handleCloseEvent();
  };

  const handleExitEvent = async (): Promise<void> => {
    const eventToExit = copyEvent(props.event.data!);

    await dispatch(exitEventRequest(eventToExit));

    handleCloseEvent();
  };

  const handleCancelEvent = async (): Promise<void> => {
    const eventToCancel = copyEvent(props.event.data!);

    await dispatch(cancelEventRequest(eventToCancel));

    handleCloseEvent();
  };

  const handleEditEvent = async (): Promise<void> => {
    const eventToEdit = copyEvent(currentEvent);

    await dispatch(
      editEventRequest({
        oldStart: props.event.data!.start!,
        editedEvent: eventToEdit,
      })
    );

    handleCloseEvent();
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
        <div className="row my-2">
          <Form.Label className="col-2">{"Creator: "}</Form.Label>
          <Form.Control
            className="col-10 w-auto mx-3"
            required={true}
            disabled={true}
            type={"email"}
            value={creatorEmail ?? ""}
          />
        </div>

        <div className="row my-2">
          <Form.Label className="col-2">{"Title: "}</Form.Label>
          <Form.Control
            className="col-10 w-auto mx-3"
            required={true}
            disabled={!canEdit}
            type={"text"}
            placeholder={`example: Event Test`}
            value={currentEvent.title ?? ""}
            name={"title"}
            onChange={handleChange}
          />
        </div>

        <div className="row my-2">
          <Form.Label className="col-2">{"Start: "}</Form.Label>
          <Form.Control
            className="col-10 w-auto mx-3"
            required={true}
            disabled={!canEdit}
            type={"datetime-local"}
            value={formatDate(currentEvent.start!)}
            name={"start"}
            onChange={handleChangeStart}
          />
        </div>

        <div className="row my-2">
          <Form.Label className="col-2">{"End: "}</Form.Label>
          <Form.Control
            className="col-10 w-auto mx-3"
            required={true}
            disabled={!canEdit}
            type={"datetime-local"}
            value={formatDate(endEvent)}
            name={"duration"}
            onChange={handleChangeEnd}
          />
        </div>

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

        {!props.event.isAddition &&
          props.event.data!.creator === currentUser.id && (
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
