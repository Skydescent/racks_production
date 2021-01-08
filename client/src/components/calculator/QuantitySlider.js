import React from "react";
import { getRangeLimits } from "../../helpers";

const QuantitySlider = ({
  title,
  currentValue,
  propName,
  handler,
  range,
  step,
}) => {
  const handleCurrentQuantitySlider = (event) => {
    handler(propName, event.target.value);
  };
  const [min, max] = getRangeLimits(range);
  return (
    <div>
      <strong>{title}</strong>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={currentValue}
        name={propName}
        onInput={handleCurrentQuantitySlider}
        onChange={handleCurrentQuantitySlider}
      />
      <span> {currentValue} шт.</span>
    </div>
  );
};

export default QuantitySlider;
