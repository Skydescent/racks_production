import React, { useState } from "react";
import InputsField from "../components/InputsField";
import QuantitySlider from "../components/QuantitySlider";
import Total from "../components/Total";

import {
  getProductPropValues,
  createActiveInputs,
  calculateTotalPrice,
  getNamesFromRackState,
} from "../helpers";

import { sendMail } from "../services/MailService";

import { racksProps, initialRack } from "../products/racks";

const Racks = () => {
  const [rackState, setRackState] = useState(initialRack);
  const [orderState, setOrder] = useState({
    phone: null,
    email: null,
    comment: null,
    isOrderSend: false,
  });

  const handleInputChange = (propGroup, propName, value) => {
    setRackState((prev) => {
      const newRack = { ...prev };
      if (["installation", "delivery", "subDelivery"].includes(propGroup)) {
        newRack[propGroup] = value;
      } else {
        const relatedProp = Object.keys(prev[propGroup]).filter(
          (relatedPropName) => relatedPropName !== propName
        )[0];

        const newActiveInputs = createActiveInputs(
          racksProps,
          propGroup,
          propName,
          value,
          relatedProp
        );

        newRack[propGroup][propName].value = value;
        newRack[propGroup][relatedProp].active = newActiveInputs;
      }
      newRack.total = calculateTotalPrice(newRack, racksProps);
      return newRack;
    });
  };

  const handleQuantitySliderMove = (propGroup, value) => {
    setRackState((prev) => {
      const newRack = { ...prev };
      newRack[propGroup] = value;
      newRack.total = calculateTotalPrice(newRack, racksProps);
      return newRack;
    });
  };

  const handleSendOrderMail = (e) => {
    e.preventDefault();

    // Валидация полей формы заказа
    if (!orderState.phone && !orderState.email) {
      alert("Поля телефон и/или почта должны быть заполнены!");
      return;
    }
    const rackNames = getNamesFromRackState(rackState, racksProps);

    const data = { ...orderState, ...rackNames };

    sendMail(data).then((response) => {
      if (response.result === "success") {
        setOrder(() => ({
          email: null,
          phone: null,
          comment: null,
          isOrderSend: true,
        }));
        setTimeout(() => {
          setOrder(() => ({
            email: null,
            phone: null,
            comment: null,
            isOrderSend: false,
          }));
        }, 3000);
      }
    });
  };

  const handleFormChange = (e) => {
    setOrder((prev) => {
      const newOrder = { ...prev };
      newOrder[e.target.name] = e.target.value;
      return newOrder;
    });
  };

  const renderInputsField = (propGroup, propName, title) => {
    const propValues = getProductPropValues(racksProps[propGroup], propName);

    let activeInputs = null;
    let currentValue = rackState[propGroup];

    if (
      rackState[propGroup][propName] &&
      rackState[propGroup][propName].value &&
      rackState[propGroup][propName].active
    ) {
      currentValue = rackState[propGroup][propName].value;
      activeInputs = rackState[propGroup][propName].active;
    }

    return (
      <InputsField
        title={title}
        propGroup={propGroup}
        propName={propName}
        propValues={propValues}
        activeInputs={activeInputs}
        currentValue={currentValue}
        handleInputChange={handleInputChange}
      />
    );
  };

  const renderQuantitySliderMove = (title, min, max, step, name, propGroup) => {
    const currentValue = rackState[propGroup];
    return (
      <QuantitySlider
        title={title}
        min={min}
        max={max}
        step={step}
        name={name}
        handleQuantitySliderMove={handleQuantitySliderMove}
        propGroup={propGroup}
        currentValue={currentValue}
      />
    );
  };

  return (
    <div>
      <section className="calc-bg">
        <div className="calc">
          <div>Изображение</div>
          <div>
            {renderInputsField("rack", "height", "Высота стеллажа, см")}
            {renderInputsField("shelf", "depth", "Глубина полки см")}
            {renderInputsField("shelf", "width", "Ширина полки, см")}
            {renderInputsField("rack", "load", "Нагрузка на стеллаж, кг")}
            <div className="flex grid_2 range">
              {renderQuantitySliderMove(
                "Количество полок",
                2,
                10,
                1,
                "shelf",
                "shelvesQuantity"
              )}
              {renderQuantitySliderMove(
                "Количество стеллажей",
                1,
                10,
                1,
                "rack",
                "racksQuantity"
              )}
            </div>
            <div className="total">
              <Total
                total={rackState.total}
                deliveryType={rackState.delivery}
                handleSendOrderMail={handleSendOrderMail}
                handleFormChange={handleFormChange}
                isOrderSend={orderState.isOrderSend}
              />
              {renderInputsField("delivery", "type", "Доставка")}
              {rackState.delivery === "self_delivery" ||
                renderInputsField("subDelivery", "type", "")}
              {renderInputsField("installation", "type", "Сборка")}
            </div>
          </div>
        </div>
      </section>
      <section>Второй блок</section>
    </div>
  );
};

export default Racks;
