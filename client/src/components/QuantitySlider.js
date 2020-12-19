import React from 'react';

const QuantitySlider = ({
  title,
  min,
  max,
  step,
  name,
  handleQuantitySliderMove,
  propGroup,
  currentValue,
}) => {
  const handleCurrentQuantitySlider = event => {
    handleQuantitySliderMove(propGroup, event.target.value);
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
        name={name}
        onInput={handleCurrentQuantitySlider}
        onChange={handleCurrentQuantitySlider}
      />
      <span className={`${name}_val`}> {currentValue} шт.</span>
    </div>
  );
};

export default QuantitySlider;
