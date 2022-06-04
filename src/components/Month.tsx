import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  decrementMonth,
  incrementMonth,
} from "../store/ducks/currentDate/currentDate.slice";
import { AppDispatch, RootState } from "../store/store";
import { DayMini } from "./DayMini";

export const Month = () => {
  const currentDate = useSelector(
    (state: RootState) => state.currentDate.currentDate
  );
  const days = useSelector(
    (state: RootState) =>
      state.eventsCalendar.data.years
        .find((y) => y.year === currentDate.getFullYear())
        ?.months.find((m) => m.month === currentDate.getMonth())?.days
  );

  const getLastDay = () => {
    const date = currentDate;
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return date.getDate();
  };

  let counterDay = 1;
  const daysComponents: any[] = [];
  const [daysRender, setDaysRender] = useState<any>([]);

  const populateDays = () => {
    days?.map((d) => {
      while (d.day !== counterDay) {
        daysComponents.push(
          <DayMini key={counterDay} day={counterDay} countEvents={0} />
        );

        counterDay++;
      }

      daysComponents.push(
        <DayMini key={d.day} day={d.day} countEvents={d.events.length} />
      );

      counterDay++;
    });

    while (counterDay <= getLastDay()) {
      daysComponents.push(
        <DayMini key={counterDay} day={counterDay} countEvents={0} />
      );

      counterDay++;
    }

    setDaysRender(daysComponents);
  };

  useEffect(() => {
    populateDays();
  }, [days]);

  const dispatch = useDispatch<AppDispatch>();

  const handleIncrementMonth = () => {
    dispatch(incrementMonth());
  };

  const handleDecrementMonth = () => {
    dispatch(decrementMonth());
  };

  return (
    <div>
      <p>hello month: {currentDate.getMonth()}</p>
      <button onClick={handleDecrementMonth}>{`<<`}</button>
      <button onClick={handleIncrementMonth}>{`>>`}</button>
      <div>
        {daysRender.map((day: any) => {
          return day;
        })}
      </div>
    </div>
  );
};
