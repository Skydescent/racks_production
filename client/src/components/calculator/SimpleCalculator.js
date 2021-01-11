import React, { useState } from "react";
import Delivery from "./Delivery";
import Installation from "./Installation";
import PopupOrder from "../PopupOrder";

import { installation } from "../../products/installation";
import { delivery } from "../../products/delivery";

import {
  getInstallationCost,
  getDeliveryCost,
  getNameByType,
} from "../../helpers";

const SimpleCalculator = ({
  children,
  initialProduct,
  img,
  totalContent,
  calcClass = "flex grid_2",
  installationTypes = null,
}) => {
  const [productState, setProductState] = useState(initialProduct);

  if (installationTypes)
    Object.keys(installationTypes).forEach((prop) => {
      installation[prop] = installationTypes[prop];
    });
  productState.delivery = productState.delivery ?? ["self_delivery"];
  productState.installation = productState.installation ?? "self_install";

  const productPropsToOrder = {
    product: null,
    order: [
      {
        title: delivery.title,
        value: getNameByType(
          delivery.types,
          productState.delivery || ["self_delivery"]
        ),
      },
      {
        title: installation.title,
        value: getNameByType(
          installation.types,
          productState.installation || "self_install"
        ),
      },
      {
        title: "Сумма",
        value: productState.total || productState.price,
      },
    ],
    name: productState.name ?? "Стеллажи",
  };

  const handleStateChange = (newProductState) => {
    setProductState((prev) => {
      newProductState.total =
        prev.price +
        getInstallationCost(installation, newProductState) +
        getDeliveryCost(delivery, newProductState);

      return newProductState;
    });
  };

  return (
    <div className={calcClass}>
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        {productState.name && <h1>{productState.name}</h1>}
        {children}
        <div className="price">
          <div>
            <span>
              {productState.priceTitle
                ? productState.priceTitle
                : productState.total ?? productState.price}
            </span>
            &#8381;
          </div>
          <div className="order dark">
            <PopupOrder productPropsToOrder={productPropsToOrder} />
          </div>
        </div>
        {totalContent}
        <Delivery
          delivery={delivery}
          productState={productState}
          handleStateChange={handleStateChange}
        />
        <Installation
          installation={installation}
          productState={productState}
          handleStateChange={handleStateChange}
        />
      </div>
    </div>
  );
};

export default SimpleCalculator;
