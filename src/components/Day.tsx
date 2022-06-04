import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const Day = () => {
  const currentDate = useSelector(
    (state: RootState) => state.currentDate.currentDate
  );
  const day = useSelector((state: RootState) =>
    state.eventsCalendar.data.years
      .find((y) => y.year === currentDate.getFullYear())
      ?.months.find((m) => m.month === currentDate.getMonth())
      ?.days.find((d) => d.day === currentDate.getDate())
  );

  const getFormattedTime = (time: Date): string => {
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  };

  return (
    <div>
      <p>hello month</p>
      <div>
        {day?.events.map((e) => {
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
