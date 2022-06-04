import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
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

  return (
    <div>
      <p>hello month</p>
      <div>
        {daysRender.map((day: any) => {
          return day;
        })}
      </div>
    </div>
  );
};
