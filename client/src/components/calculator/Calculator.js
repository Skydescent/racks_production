import React, { useState } from "react";
import CalculatorField from "./CalculatorField";
import Total from "./Total";
import Delivery from "./Delivery";
import Installation from "./Installation";
import PopupOrder from "../PopupOrder";

import { installation } from "../../products/installation";
import { delivery } from "../../products/delivery";

import {
  syncActiveInputs,
  calculateTotalPrice,
  getProductPropsToOrder,
  getNameByType,
  setCurrentStateToSimilar,
  setValueByFullName,
} from "../../helpers";

const Calculator = ({
  productsProps,
  initialProduct,
  except = ["price"],
  isInstallation,
  isActiveInputs,
  renderOrder,
}) => {
  const [productState, setProductState] = useState(initialProduct);
  const productPropsToOrder = {
    product: getProductPropsToOrder(productState, productsProps),
    order: [
      {
        title: delivery.title,
        value: getNameByType(delivery.types, productState.delivery),
      },
      {
        title: installation.title,
        value: getNameByType(installation.types, productState.installation),
      },
      {
        title: "Сумма",
        value: productState.total,
      },
    ],
  };

  const handleInputChange = (fullName, propsGroupName, changedPropValue) => {
    setProductState((prev) => {
      let newProductState = Object.assign({}, prev);
      setValueByFullName(newProductState, fullName, changedPropValue);

      if (isActiveInputs) {
        newProductState = syncActiveInputs(
          fullName,
          productsProps,
          newProductState,
          except
        );
      } else {
        setCurrentStateToSimilar(newProductState, productsProps, fullName);
      }
      newProductState.total = calculateTotalPrice(
        newProductState,
        productsProps,
        delivery,
        installation
      );
      console.log(newProductState);
      return newProductState;
    });
  };

  const handleQuantitySliderMove = (propName, value) => {
    setProductState((prev) => {
      const newProductState = { ...prev };

      if (typeof newProductState[propName].value !== "undefined") {
        newProductState[propName].value = value;
      } else {
        newProductState[propName] = value;
      }
      newProductState.total = calculateTotalPrice(
        newProductState,
        productsProps,
        delivery,
        installation
      );

      return newProductState;
    });
  };

  const handleDeliveryChange = (deliveryType) => {
    setProductState((prev) => {
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
        productsProps,
        delivery,
        installation
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
        productsProps,
        delivery,
        installation
      );
      return newProductState;
    });
  };

  return (
    <div>
      {renderOrder &&
        renderOrder.map(({ type, name, range }) => (
          <CalculatorField
            key={name}
            tag={type}
            productsProps={productsProps}
            productState={productState}
            name={name}
            range={range ?? null}
            handlers={{
              field: handleInputChange,
              slider: handleQuantitySliderMove,
            }}
          />
        ))}

      <Total
        total={productState.total}
        deliveryType={productState.delivery}
        order={<PopupOrder productPropsToOrder={productPropsToOrder} />}
      >
        <Delivery
          delivery={delivery}
          productState={productState}
          handleDeliveryChange={handleDeliveryChange}
        />
        {isInstallation && (
          <Installation
            installation={installation}
            productState={productState}
            hadleInstallChange={hadleInstallChange}
          />
        )}
      </Total>
    </div>
  );
};

export default Calculator;
