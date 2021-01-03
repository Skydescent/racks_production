import React from "react";
import InputsField from "./InputsField";
import QuantitySlider from "./QuantitySlider";
import TestInputsField from "./TestInputsField";
import { getTitle } from "../../helpers";
import CalcContent from "./CalcContent";

const CalculatorField = ({
  tag,
  productsProps,
  productState,
  name,
  handler,
}) => {
  const components = {
    field: TestInputsField,
    slider: QuantitySlider,
    content: CalcContent,
  };
  const TagName = components[tag];
  const title = getTitle(productsProps, name);
  return (
    <TagName
      title={title}
      productsProps={productsProps}
      productState={productState}
      name={name}
      handler={handler}
    />
  );
};

export default CalculatorField;
