import React from "react";
import CalcRadioInput from "./CalcRadioInput";
import { getPropNameByPos, getProductPropValues } from "../../helpers";

const TestInputsField = ({
  title,
  productsProps,
  productState,
  name,
  handler,
}) => {
  const propGroup = getPropNameByPos(name, 0);
  const propName = getPropNameByPos(name, "last");
  const propValues = getProductPropValues(productsProps[propGroup], propName);
  const activeInputs = productState[propGroup][propName].active;
  const currentValue =
    productState[propGroup][propName].value ??
    productState[propGroup][propName];

  return (
    <div className="range">
      {title && <strong>{title}</strong>}

      {propValues.map((item) => (
        <CalcRadioInput
          key={name + (item.value ?? item)}
          title={item.title ?? item}
          value={item.value ?? item}
          propName={propName}
          onChange={() => handler(propGroup, propName, item.value ?? item)}
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

export default TestInputsField;
