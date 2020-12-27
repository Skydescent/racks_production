import React from "react";

const Total = ({ total, deliveryType, children, order }) => {
  const deliveryTitle = {
    self_delivery: "Стеллаж в наличии",
    daytime: "Доставим к определенному времени",
    evening: "Доставим с 17:00 до 20:00, по городу до подъезда бесплатно",
  }[deliveryType[0]];
  return (
    <div className="total">
      <div className="price">
        <div>
          <span className="js-total">{total}</span> &#8381;
          <input type="hidden" value={total} name="total" />
        </div>
        <div className="payment-comment">{deliveryTitle}</div>
        <div className="order">{order}</div>
      </div>
      {children}
    </div>
  );
};

export default Total;
