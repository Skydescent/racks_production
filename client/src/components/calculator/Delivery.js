import React from "react";
import CalcRadioInput from "./CalcRadioInput";

const Delivery = ({ delivery, productState, handleStateChange }) => {
  const handleDeliveryChange = (deliveryType) => {
    const newProductState = { ...productState };
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
    handleStateChange(newProductState);
  };

  console.log(productState.name);
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
          key={productState.name ? productState.name + item.type : item.type}
          title={item.name}
          value={item.type}
          propName={
            productState.name ? productState.name + item.type : item.type
          }
          onChange={() => handleDeliveryChange(item.type)}
          isChecked={productState.delivery.includes(item.type)}
          isActive={true}
        />
      ))}
    </div>
  );
};

export default Delivery;
