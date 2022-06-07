import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementDay,
  incrementDay,
} from "../store/ducks/currentDate/currentDate.slice";
import { getEventsRequest } from "../store/ducks/eventsCalendar/eventsCalendar.middleware";
import {
  IDay,
  IMonth,
} from "../store/ducks/eventsCalendar/eventsCalendar.types";
import { setViewMonth } from "../store/ducks/viewMode/viewMode.slice";
import { AppDispatch, RootState } from "../store/store";
import { EventMini } from "./EventMini";

export const Day = () => {
  const [day, setDay] = useState<IDay | null>(null);
  const currentDate = useSelector(
    (state: RootState) => state.currentDate.currentDate
  );
  const years = useSelector(
    (state: RootState) => state.eventsCalendar.data.years
  );
  const monthUpdated = useSelector(
    (state: RootState) => state.eventsCalendar.counter
  );

  useEffect(() => {
    (async () => {
      const month = findMonth();

      if (month) {
        updateDay(month);
      } else {
        await dispatch(getEventsRequest(new Date(currentDate.getTime())));
      }
    })();
  }, [currentDate]);

  useEffect(() => {
    const month = findMonth();

    if (month) {
      updateDay(month);
    }
  }, [monthUpdated]);

  const updateDay = (month: IMonth): void => {
    setDay(
      Object.assign(
        {},
        month.days.find((d) => d.day === currentDate.getDate())
      )
    );
  };

  const findMonth = (): IMonth | undefined => {
    return years
      .find((y) => y.year === currentDate.getFullYear())
      ?.months.find((m) => m.month === currentDate.getMonth());
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleIncrementDay = () => {
    dispatch(incrementDay());
  };

  const handleDecrementDay = () => {
    dispatch(decrementDay());
  };

  const handleViewMonth = () => {
    dispatch(setViewMonth());
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          onClick={handleViewMonth}
          className="btn btn-outline-primary mx-3"
        >
          {currentDate.toLocaleString("default", {
            month: "long",
          })}
        </button>

        <h3 className="text-center text-primary mx-3">
          {currentDate.toUTCString().substring(0, 16)}
        </h3>

        <div className="mx-3">
          <button
            type="button"
            onClick={handleDecrementDay}
            className="btn btn-outline-primary mx-1"
          >{`<`}</button>

          <button
            type="button"
            onClick={handleIncrementDay}
            className="btn btn-outline-primary mx-1"
          >{`>`}</button>
        </div>
      </div>

      <div>
        {day?.events?.map((e) => {
          return <EventMini key={e.id} event={e} />;
        })}
      </div>
    </div>
  );
};
