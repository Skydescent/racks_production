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
  getValueByFullName,
} from "../../helpers";

const Calculator = ({
  productsProps,
  initialProduct,
  except = ["price"],
  isInstallation,
  isActiveInputs,
  renderOrder,
  productsImages = null,
  children,
}) => {
  const [productState, setProductState] = useState(initialProduct);
  if (productsProps.installation) {
    Object.keys(productsProps.installation).forEach((key) => {
      if (installation[key]) {
        installation[key] = productsProps.installation[key];
      }
    });
  }

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
    name: productsProps.name ?? "Стеллажи",
  };

  const handleStateChange = (newProductState) => {
    setProductState((prev) => {
      newProductState.total = calculateTotalPrice(
        newProductState,
        productsProps,
        delivery,
        installation
      );

      return newProductState;
    });
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

  const renderProductImage = () => {
    if (productsImages) {
      if (productsImages.fullName) {
        const value = getValueByFullName(productState, productsImages.fullName);
        const img = productsImages.images.filter(
          (item) => item.value === value
        )[0].image;
        return (
          <div>
            <img src={img} alt="main_img" />
          </div>
        );
      }

      if (productsImages.image)
        return (
          <div>
            <img src={productsImages.image} alt="main_img" />
          </div>
        );
    }
  };

  return (
    <div className="product_calc">
      {renderProductImage()}
      <div>
        {productsProps.name && <h1>{productsProps.name}</h1>}
        {children}
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
            handleStateChange={handleStateChange}
          />
          {isInstallation && (
            <Installation
              installation={installation}
              productState={productState}
              handleStateChange={handleStateChange}
            />
          )}
        </Total>
      </div>
    </div>
  );
};

export default Calculator;
