import React from "react";

const QuantitySlider = ({
  title,
  min,
  max,
  step,
  propName,
  handleQuantitySliderMove,
  currentValue,
}) => {
  const handleCurrentQuantitySlider = (event) => {
    handleQuantitySliderMove(propName, event.target.value);
  };
  return (
    <div>
      <strong>{title}</strong>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
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
