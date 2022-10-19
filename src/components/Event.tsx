import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal } from "react-bootstrap";
import { clearCurrentEvent } from "../store/ducks/currentEvent/currentEvent.slice";
import { IShowEvent } from "../store/ducks/currentEvent/currentEvent.types";
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

interface IEventToShow {
  id: number | null;
  start: string | null;
  end: string | null;
  title: string | null;
  creator: number | null;
  guests: IGuest[] | null;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();

  let month = (date.getMonth() + 1).toString();
  if (month.length === 1) month = `0${month}`;

  let day = date.getDate().toString();
  if (day.length === 1) day = `0${day}`;

  let hours = date.getHours().toString();
  if (hours.length === 1) hours = `0${hours}`;

  let minutes = date.getMinutes().toString();
  if (minutes.length === 1) minutes = `0${minutes}`;

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const getEndEvent = (start: Date, durationInSec: number): string => {
  const durationInMs = durationInSec * 1000;

  const end = new Date(start.getTime() + durationInMs);

  return formatDate(end);
};

export const Event: React.FC<EventType> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { id, creator, title, start, duration, guests } = props.event.data!;
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const creatorEmail = useSelector((state: RootState) =>
    state.users.data.users.find((u) => u.id === creator)
  )?.email;
  const [currentEvent, setCurrentEvent] = useState<IEventToShow>({
    id,
    creator,
    guests,
    start: formatDate(start ?? new Date()),
    end: getEndEvent(start ?? new Date(), duration ?? 3600),
    title,
  });

  useEffect(() => {
    setShowModal(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  const handleCloseEvent = () => {
    dispatch(clearCurrentEvent());
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
  };

  const handleChangeGuests = (guests: IGuest[]): void => {
    setCurrentEvent({ ...currentEvent, guests });
  };

  const handleAddEvent = async (): Promise<void> => {
    const eventToPost = convertEvent(currentEvent);

    await dispatch(addEventRequest(eventToPost));

    handleCloseEvent();
  };

  const handleExitEvent = async (): Promise<void> => {
    const eventToExit: IEvent = {
      id: id!,
      creator: creator!,
      title: title!,
      start: start!,
      duration: duration!,
      guests: guests!,
    };

    await dispatch(exitEventRequest(eventToExit));

    handleCloseEvent();
  };

  const handleCancelEvent = async (): Promise<void> => {
    const eventToCancel: IEvent = {
      id: id!,
      creator: creator!,
      title: title!,
      start: start!,
      duration: duration!,
      guests: guests!,
    };

    await dispatch(cancelEventRequest(eventToCancel));

    handleCloseEvent();
  };

  const handleEditEvent = async (): Promise<void> => {
    const eventToEdit = convertEvent(currentEvent);

    await dispatch(
      editEventRequest({
        oldStart: props.event.data!.start!,
        editedEvent: { ...eventToEdit, guestsToRemove: getRemovedGuests() },
      })
    );

    handleCloseEvent();
  };

  const getRemovedGuests = (): number[] => {
    const initialGuests = guests!;
    const finalGuests = currentEvent.guests!;

    const removedGuests: number[] = initialGuests
      .filter(
        (initial) =>
          finalGuests.findIndex((final) => final.user === initial.user) === -1
      )
      .map((removed) => removed.user);

    return removedGuests;
  };

  const convertEvent = (event: IEventToShow): IEvent => {
    const { creator, guests, id, start, end, title } = event;

    const startDate = new Date(start!);
    const endDate = new Date(end!);

    const duration: number = (endDate.getTime() - startDate.getTime()) / 1000;

    return {
      creator: creator!,
      guests: guests!,
      id: id!,
      start: startDate,
      duration,
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
            value={currentEvent.start!}
            name={"start"}
            onChange={handleChange}
          />
        </div>

        <div className="row my-2">
          <Form.Label className="col-2">{"End: "}</Form.Label>
          <Form.Control
            className="col-10 w-auto mx-3"
            required={true}
            disabled={!canEdit}
            type={"datetime-local"}
            value={currentEvent.end!}
            name={"end"}
            onChange={handleChange}
          />
        </div>

        <GuestsList
          creator={currentEvent.creator!}
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

        {!props.event.isAddition &&
          props.event.data!.creator !== currentUser.id && (
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
