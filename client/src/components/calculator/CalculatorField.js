import React from "react";
import InputsField from "./InputsField";
import QuantitySlider from "./QuantitySlider";
import { getTitle, getPropNameByPos, getValueByFullName } from "../../helpers";
import CalcContent from "./CalcContent";

const CalculatorField = ({
  tag,
  productsProps,
  productState,
  name,
  handlers,
  range,
}) => {
  const components = {
    field: InputsField,
    slider: QuantitySlider,
    content: CalcContent,
  };
  const TagName = components[tag];
  const propGroup = getPropNameByPos(name, 0);
  const propName = getPropNameByPos(name, "last");
  const currentValue = getValueByFullName(productState, name);
  return (
    <TagName
      title={getTitle(productsProps, name)}
      name={name}
      productsProps={productsProps}
      productState={productState}
      currentValue={currentValue}
      propGroup={propGroup}
      propName={propName}
      handler={handlers[tag]}
      range={range}
    />
  );
};

export default CalculatorField;
