import React from "react";
import { getTitle, getValueByFullName } from "../../helpers";

const CalcContent = ({ name, productsProps, productState }) => {
  return (
    <div className="range">
      <strong>{getTitle(productsProps, name)}</strong>
      <p>{getValueByFullName(productState, name)}</p>
    </div>
  );
};

export default CalcContent;
