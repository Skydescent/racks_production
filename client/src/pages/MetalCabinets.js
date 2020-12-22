import React from "react";
import Calculator from "../components/Calculator";
import { metalCabinets } from "../products/metalCabinets";

const MetalCabinets = () => {
  const metalCabinetsProps = metalCabinets[0];
  const initialMetalCabinet = metalCabinetsProps.initialState;
  const fieldsSet = [
    { title: "Высота шкафа, см", propName: "height", propGroup: "versions" },
    { title: "Глубина, см", propName: "depth", propGroup: "versions" },
    { title: "Ширина, см", propName: "width", propGroup: "versions" },
    {
      title: "Количество секций",
      propName: "sectionsQnt",
      propGroup: "versions",
    },
    {
      title: "Количество полок",
      propName: "shelvesQnt",
      propGroup: "versions",
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
            propsGroups={["versions"]}
          />

          <strong>Количество секций</strong>

          <strong>Количество полок</strong>

          <strong>Комплектация</strong>
          <p>2 перекладины, 4 крючка, 2 врезных замка</p>

          <div className="total">Total</div>
        </div>
      </div>
    </section>
  );
};

export default MetalCabinets;
