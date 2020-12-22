import React from "react";
import Calculator from "../components/Calculator";
import { metalCabinets } from "../products/metalCabinets";

const MetalCabinets = () => {
  const metalCabinetsProps = metalCabinets[0];
  const initialMetalCabinet = metalCabinetsProps.initialState;
  const fieldsSet = [
    { title: "Высота шкафа, см", propName: "height", propGroup: "items" },
    { title: "Глубина, см", propName: "depth", propGroup: "items" },
    { title: "Ширина, см", propName: "width", propGroup: "items" },
    {
      title: "Количество секций",
      propName: "sectionsQnt",
      propGroup: "items",
    },
    {
      title: "Количество полок",
      propName: "shelvesQnt",
      propGroup: "items",
    },
  ];

  return (
    <section className="content-inner product">
      <div id="mark1" className="product_calc">
        <div>Изображение</div>
        <div>
          <h1>Шкаф металлический для одежды ШРМ-АК</h1>
          <Calculator
            fieldsSet={fieldsSet}
            productsProps={metalCabinetsProps}
            initialProduct={initialMetalCabinet}
            propsGroups={["items"]}
          />
          <strong>Комплектация</strong>
          <p>2 перекладины, 4 крючка, 2 врезных замка</p>

          <div className="total">Total</div>
        </div>
      </div>
    </section>
  );
};

export default MetalCabinets;
