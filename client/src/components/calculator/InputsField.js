import React from "react";
import CalcRadioInput from "./CalcRadioInput";
import { getProductPropValues, getValueByFullName } from "../../helpers";

const InputsField = ({
  title,
  name,
  productsProps,
  productState,
  currentValue,
  propGroup,
  propName,
  handler,
}) => {
  const propValues = getProductPropValues(productsProps, name);
  const activeInputs = getValueByFullName(productState, name + "_active");
  return (
    <div className="range">
      {title && <strong>{title}</strong>}

      {propValues.map((item) => (
        <CalcRadioInput
          key={propName + "_" + (item.value ?? item)}
          title={item.title ?? item}
          value={item.value ?? item}
          propName={propName}
          onChange={() => handler(name, propGroup, item.value ?? item)}
          isChecked={currentValue === (item.value ?? item)}
          isActive={
            activeInputs === "all"
              ? true
              : activeInputs.includes(item.value ?? item)
          }
        />
      ))}
    </div>
  );
};

export default InputsField;
