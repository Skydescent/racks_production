import React, { useState } from "react";
import InputsField from "./InputsField";
import QuantitySlider from "./QuantitySlider";
import Total from "./Total";

import { getAllProductPropsValues, syncActiveInputs } from "../helpers";

const Calculator = ({
  fieldsSet,
  slidersSet,
  productsProps,
  initialProduct,
  propsGroups = [],
  except = ["price"],
}) => {
  const [productState, setProductState] = useState(initialProduct);

  const propValues = getAllProductPropsValues(
    productsProps,
    propsGroups,
    except
  );

  const handleInputChange = (
    propsGroupName,
    changedPropName,
    changedPropValue
  ) => {
    setProductState((prev) => {
      const newProductState = { ...prev };

      syncActiveInputs(
        productsProps,
        newProductState,
        propsGroupName,
        changedPropName,
        changedPropValue,
        except
      );

      newProductState[propsGroupName][changedPropName].value = changedPropValue;
      //newRack.total = calculateTotalPrice(newRack, racksProps);
      return newProductState;
    });
  };

  return (
    <div>
      {fieldsSet
        ? fieldsSet.map((field) => (
            <InputsField
              key={field.propGroup + "_" + field.propName}
              title={field.title}
              propGroup={field.propGroup}
              propName={field.propName}
              propValues={propValues[field.propGroup][field.propName]}
              activeInputs={
                productState[field.propGroup][field.propName].active
              }
              currentValue={productState[field.propGroup][field.propName].value}
              handleInputChange={handleInputChange}
            />
          ))
        : ""}
      {slidersSet ? slidersSet.map((slider) => <QuantitySlider />) : ""}
      <div>Total</div>
    </div>
  );
};

export default Calculator;
