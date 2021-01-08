import React from "react";

const CalcRadioInput = ({
  title,
  value,
  propName,
  onChange,
  isActive,
  isChecked,
}) => (
  <p>
    <span onClick={isActive ? onChange : null}>
      <input
        readOnly
        id={`${propName}_${value}`}
        className="radio"
        type="radio"
        name={`${propName}_${value}`}
        value={value}
        checked={isChecked}
        disabled={!isActive}
      />
      <span>{title}</span>
    </span>
  </p>
);

export default CalcRadioInput;
