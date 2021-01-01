import React from "react";
import InputsField from "./InputsField";
import QuantitySlider from "./QuantitySlider";

const CalculatorField = ({ tag }) => {
  const components = { filed: InputsField, slider: QuantitySlider };
  const TagName = components[tag];
  return <TagName />;
};

export default CalculatorField;
