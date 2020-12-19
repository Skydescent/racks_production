import React from 'react';

const OrderForm = ({ handleFormChange, handleSendOrderMail }) => (
  <form className="form ajax_form" name="order_form">
    <div className="popup_header">Отправка заказа</div>

    <input
      type="phone"
      name="phone"
      maxLength="30"
      placeholder="Контактный телефон"
      onChange={e => handleFormChange(e)}
    />
    <p>
      <em>и/или</em>
    </p>
    <input
      type="email"
      name="email"
      maxLength="30"
      placeholder="Электронная почта"
      onChange={e => handleFormChange(e)}
    />
    <textarea
      name="comment"
      placeholder="Комментарий к заказу"
      rows="3"
      onChange={e => handleFormChange(e)}
    />
    <input
      type="submit"
      value="Отправить"
      name="submit"
      className="sbmt"
      onClick={e => handleSendOrderMail(e)}
    />
  </form>
);

export default OrderForm;
