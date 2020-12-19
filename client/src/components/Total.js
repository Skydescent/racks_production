import React from 'react';
import Popup from './Popup';

const Total = ({
  total,
  deliveryType,
  handleSendOrderMail,
  handleFormChange,
  isOrderSend,
}) => {
  const deliveryTitle = {
    self_delivery: 'Стеллаж в наличии',
    daytime: 'Доставим к определенному времени',
    evening: 'Доставим с 17:00 до 20:00, по городу до подъезда бесплатно',
  }[deliveryType];
  return (
    <div className="price">
      <div>
        <span className="js-total">{total}</span> &#8381;
        <input type="hidden" value={total} name="total" />
      </div>
      <div className="payment-comment">{deliveryTitle}</div>
      <div className="order">
        <Popup
          handleFormChange={handleFormChange}
          handleSendOrderMail={handleSendOrderMail}
          isOrderSend={isOrderSend}
        />
      </div>
    </div>
  );
};

export default Total;
