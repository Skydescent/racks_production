import React from 'react';

const CalcRadioInput = ({
  title,
  value,
  propName,
  onChange,
  isActive,
  isChecked,
}) => (
  <p>
    <label htmlFor={`${propName}_${value}`}>
      {title}
      <input
        type="radio"
        name={`${propName}_${value}`}
        value={value}
        className="radio"
        id={`${propName}_${value}`}
        onChange={onChange}
        checked={isChecked}
        disabled={!isActive}
      />
    </label>
  </p>
);

export default CalcRadioInput;
