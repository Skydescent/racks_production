import React from "react";

const CalcContent = ({ title, currentValue }) => {
  return (
    <div className="range">
      <strong>{title}</strong>
      <p>{currentValue}</p>
    </div>
  );
};

export default CalcContent;
