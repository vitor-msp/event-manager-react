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
import { Modal } from "react-bootstrap";

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

      <Modal.Body>Test</Modal.Body>
    </Modal>
  );
};

// <div onClick={() => {}}>
//   <button onClick={handleCloseEvent}>X</button>
//   <br />
//   <span>{`id `}</span>
//   <input type={"text"} value={currentEvent.id ?? ""} disabled={true} />

//   <br />
//   <span>{`creator `}</span>
//   <input type={"email"} value={creatorEmail ?? ""} disabled={true} />

//   <br />
//   <span>{`title `}</span>
//   <input
//     type={"text"}
//     disabled={!canEdit}
//     value={currentEvent.title ?? ""}
//     name={"title"}
//     onChange={handleChange}
//   />

//   <br />
//   <span>{`start `}</span>
//   <input
//     type={"datetime-local"}
//     disabled={!canEdit}
//     value={formatDate(currentEvent.start!)}
//     name={"start"}
//     onChange={handleChangeStart}
//   />

//   <br />
//   <span>{`duration `}</span>
//   <input
//     type={"number"}
//     min={0}
//     disabled={!canEdit}
//     value={currentEvent.duration ?? ""}
//     name={"duration"}
//     onChange={handleChange}
//   />

//   <br />
//   <span>{`guests `}</span>
//   <GuestsList
//     guests={currentEvent.guests!}
//     canEdit={canEdit}
//     onChange={handleChangeGuests}
//   />

//   <br />
//   {props.event.isAddition && <button onClick={handleAddEvent}>add</button>}

//   <br />
//   {!props.event.isAddition && (
//     <button onClick={handleExitEvent}>exit of the event</button>
//   )}

//   <br />
//   {!props.event.isAddition && props.event.data!.creator === 1 && (
//     <button onClick={handleCancelEvent}>cancel event</button>
//   )}

//   <br />
//   {!props.event.isAddition && canEdit && (
//     <button onClick={handleEditEvent}>edit event</button>
//   )}
// </div>
