import React from "react";

export type DayType = {
  day: number;
  countEvents: number;
}

export const DayMini: React.FC<DayType> = (props) => {
  const { day, countEvents } = props;

  return (
    <>
      <span>{`day ${day}: ${countEvents} events`}</span>
      <br />
    </>
  );
};
