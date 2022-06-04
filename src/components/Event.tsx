import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import { IEvent } from "../store/ducks/eventsCalendar/eventsCalendar.types";
import { AppDispatch } from "../store/store";

export type EventType = {
  event: IShowEvent;
};

export const Event: React.FC<EventType> = (props) => {
  const { id, creator, duration, guests, start, title } = props.event.data!;
  const [canEdit, setCanEdit] = useState<boolean>(false);
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
      if (props.event.data!.creator === 1) {
        setCanEdit(true);
        return;
      }

      if (
        props.event.data!.guests?.find(
          (g) => g.user === 1 && g.permission === "Editor"
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
    <div onClick={() => {}}>
      <button onClick={handleCloseEvent}>X</button>
      <br />
      <span>{`id `}</span>
      <input type={"text"} value={currentEvent.id ?? ""} disabled={true} />

      <br />
      <span>{`creator `}</span>
      <input type={"text"} value={currentEvent.creator ?? ""} disabled={true} />

      <br />
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
      {currentEvent.guests!.length > 0 &&
        currentEvent.guests!.map((g) => {
          return (
            <div>
              <span>user {g.user}</span>
              <span> permission {g.permission}</span>
            </div>
          );
        })}

      <br />
      {props.event.isAddition && <button onClick={handleAddEvent}>add</button>}

      <br />
      {!props.event.isAddition && (
        <button onClick={handleExitEvent}>exit of the event</button>
      )}

      <br />
      {!props.event.isAddition && props.event.data!.creator === 1 && (
        <button onClick={handleCancelEvent}>cancel event</button>
      )}

      <br />
      {!props.event.isAddition && canEdit && (
        <button onClick={handleEditEvent}>edit event</button>
      )}
    </div>
  );
};
