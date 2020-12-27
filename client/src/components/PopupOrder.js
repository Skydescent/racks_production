import React from "react";
import Popup from "reactjs-popup";
import OrderForm from "./OrderForm";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ productPropsToOrder, isOrderSend }) => (
  <Popup trigger={<a href="#order">Заказать</a>} modal nested>
    {(close) => (
      <div className="modal">
        <button type="button" className="close" onClick={close}>
          &times;
        </button>
        <OrderForm productPropsToOrder={productPropsToOrder} />
      </div>
    )}
  </Popup>
);
