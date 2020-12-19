import React from 'react';
import Popup from 'reactjs-popup';
import OrderForm from './OrderForm';
import SuccessOrder from './SuccessOrder';

export default ({ handleSendOrderMail, handleFormChange, isOrderSend }) => {
  let content;

  if (!isOrderSend) {
    content = (
      <OrderForm
        handleSendOrderMail={handleSendOrderMail}
        handleFormChange={handleFormChange}
      />
    );
  } else {
    content = <SuccessOrder />;
  }

  return (
    <Popup trigger={<a href="#order">Заказать</a>} modal nested>
      {close => (
        <div className="modal">
          <button type="button" className="close" onClick={close}>
            &times;
          </button>
          {content}
        </div>
      )}
    </Popup>
  );
};
