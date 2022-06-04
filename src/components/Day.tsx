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
import { AppDispatch, RootState } from "../store/store";

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

  const getFormattedTime = (time: Date): string => {
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleIncrementDay = () => {
    dispatch(incrementDay());
  };

  const handleDecrementDay = () => {
    dispatch(decrementDay());
  };

  return (
    <div>
      <p>hello day: {currentDate.getDate()}</p>
      <button onClick={handleDecrementDay}>{`<<`}</button>
      <button onClick={handleIncrementDay}>{`>>`}</button>
      <div>
        {day?.events?.map((e) => {
          return (
            <div key={e.id}>
              <span> {`${e.title} ${getFormattedTime(e.start)}`}</span>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};
