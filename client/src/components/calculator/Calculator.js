import React, { useState } from "react";
import InputsField from "./InputsField";
import QuantitySlider from "./QuantitySlider";
import Total from "./Total";
import Delivery from "./Delivery";
import Installation from "./Installation";
import Popup from "../Popup";

import { installation } from "../../products/installation";
import { delivery } from "../../products/delivery";

import {
  getAllProductPropsValues,
  syncActiveInputs,
  calculateTotalPrice,
  getProductPropsToOrder,
} from "../../helpers";

const Calculator = ({
  fieldsSet,
  slidersSet,
  productsProps,
  initialProduct,
  propsGroups = [],
  except = ["price"],
}) => {
  productsProps = { delivery, installation, ...productsProps };
  productsProps.titles.push({ delivery: delivery.title });
  productsProps.titles.push({ installation: installation.title });

  const [productState, setProductState] = useState(initialProduct);

  const productPropsToOrder = getProductPropsToOrder(
    productState,
    productsProps
  );

  // getNamesFromRackState(productState, productsProps);

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
      newProductState.total = calculateTotalPrice(
        newProductState,
        productsProps
      );
      return newProductState;
    });
  };

  const handleQuantitySliderMove = (propName, value) => {
    setProductState((prev) => {
      const newProductState = { ...prev };
      newProductState[propName] = value;
      newProductState.total = calculateTotalPrice(
        newProductState,
        productsProps
      );
      return newProductState;
    });
  };

  const handleDeliveryChange = (deliveryType) => {
    setProductState((prev) => {
      console.log(productsProps);
      const newProductState = { ...prev };
      const parents = delivery.types.reduce((acc, curr) =>
        curr.parent ? new Set(curr.parent.concat(acc)) : acc
      );
      if (!newProductState.delivery.includes(deliveryType)) {
        const deliveryTypeItem = delivery.types.filter(
          (item) => item.type === deliveryType
        )[0];
        if (deliveryTypeItem.parent) {
          newProductState.delivery[1] = deliveryType;
        } else {
          if (!newProductState.delivery[1])
            newProductState.delivery[1] = delivery.defChild;
          if (!parents.has(deliveryType)) newProductState.delivery = [];
          newProductState.delivery[0] = deliveryType;
        }
      }
      newProductState.total = calculateTotalPrice(
        newProductState,
        productsProps
      );
      return newProductState;
    });
  };

  const hadleInstallChange = (installType) => {
    setProductState((prev) => {
      const newProductState = { ...prev };
      newProductState.installation = installType;
      newProductState.total = calculateTotalPrice(
        newProductState,
        productsProps
      );
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
      <div className="flex grid_2 range">
        {slidersSet
          ? slidersSet.map((slider) => (
              <QuantitySlider
                key={slider.propName}
                title={slider.title}
                min={slider.range.split(":")[0]}
                max={slider.range.split(":")[1]}
                step={slider.step ?? 1}
                propName={slider.propName}
                handleQuantitySliderMove={handleQuantitySliderMove}
                currentValue={productState[slider.propName]}
              />
            ))
          : ""}
      </div>

      <Total
        total={productState.total}
        deliveryType={productState.delivery}
        order={<Popup />}
      >
        <Delivery
          delivery={delivery}
          productState={productState}
          handleDeliveryChange={handleDeliveryChange}
        />
        <Installation
          installation={installation}
          productState={productState}
          hadleInstallChange={hadleInstallChange}
        />
      </Total>
    </div>
  );
};

export default Calculator;
