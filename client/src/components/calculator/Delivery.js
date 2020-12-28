import React from "react";
import CalcRadioInput from "./CalcRadioInput";

const Delivery = ({ delivery, productState, handleDeliveryChange }) => {
  let deliveryTypes = delivery.types.filter((item) => {
    if (item.parent) {
      return item.parent.includes(productState.delivery[0]);
    }
    return true;
  });
  return (
    <div className="range">
      <strong>{delivery.title}</strong>
      {deliveryTypes.map((item) => (
        <CalcRadioInput
          key={item.type}
          title={item.name}
          value={item.type}
          propName={item.type}
          onChange={() => handleDeliveryChange(item.type)}
          isChecked={productState.delivery.includes(item.type)}
          isActive={true}
        />
      ))}
    </div>
  );
};

export default Delivery;
