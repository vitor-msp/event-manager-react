import { useSelector, useDispatch } from "react-redux";
import {
  decrementDay,
  incrementDay,
} from "../store/ducks/currentDate/currentDate.slice";
import { AppDispatch, RootState } from "../store/store";

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
