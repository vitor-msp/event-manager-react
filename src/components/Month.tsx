import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  decrementMonth,
  incrementMonth,
} from "../store/ducks/currentDate/currentDate.slice";
import { getEventsRequest } from "../store/ducks/eventsCalendar/eventsCalendar.middleware";
import { IDay } from "../store/ducks/eventsCalendar/eventsCalendar.types";
import { AppDispatch, RootState } from "../store/store";
import { DayMini } from "./DayMini";

export const Month = () => {
  const currentDate = useSelector(
    (state: RootState) => state.currentDate.currentDate
  );
  const monthUpdated = useSelector(
    (state: RootState) => state.eventsCalendar.counter
  );
  const years = useSelector(
    (state: RootState) => state.eventsCalendar.data.years
  );
  const daysComponents: any[] = [];
  const [daysRender, setDaysRender] = useState<any>([]);

  const populateDays = (currentDate: Date, days?: IDay[]) => {
    while (daysComponents.length > 0) {
      daysComponents.pop();
    }

    let counterDay = 1;

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

    while (counterDay <= getLastDay(currentDate)) {
      daysComponents.push(
        <DayMini key={counterDay} day={counterDay} countEvents={0} />
      );

      counterDay++;
    }

    setDaysRender(daysComponents);
  };

  useEffect(() => {
    const month = years
      .find((y) => y.year === currentDate.getFullYear())
      ?.months.find((m) => m.month === currentDate.getMonth());

    if (month) {
      populateDays(currentDate, month.days);
    }
  }, [monthUpdated]);

  useEffect(() => {
    (async () => {
      const month = years
        .find((y) => y.year === currentDate.getFullYear())
        ?.months.find((m) => m.month === currentDate.getMonth());

      if (month) {
        populateDays(currentDate, month.days);
      } else {
        await dispatch(getEventsRequest(new Date(currentDate.getTime())));
      }
    })();
  }, [currentDate]);

  const dispatch = useDispatch<AppDispatch>();

  const handleIncrementMonth = () => {
    dispatch(incrementMonth());
  };

  const handleDecrementMonth = () => {
    dispatch(decrementMonth());
  };

  const getLastDay = (currentDate: Date) => {
    const date = new Date(currentDate.getTime());
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return date.getDate();
  };

  return (
    <div>
      <p>hello month: {currentDate.getMonth() + 1}</p>
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
