import React from "react";
import Calculator from "../components/Calculator;";
import { metalCabinets } from "../products/metalCabinets";
import { racksProps } from "../products/racks";

const MetalCabinets = () => {
  racksProps = metalCabinets[0].version;
  const fieldsSet = [
    { title: "Высота шкафа, см", propName: "height" },
    { title: "Глубина, см", propName: "depth" },
    { title: "Ширина, см", propName: "width" },
    { title: "Количество секций", propName: "sectionsQnt" },
    { title: "Количество полок", propName: "shelvesQnt" },
  ];

  return (
    <section class="content-inner product">
      <div id="mark1" className="product_calc">
        <div>Изображение</div>
        <div>
          <h1>Шкаф металлический для одежды ШРМ-АК</h1>
          <Calculator fieldsSet={fieldsSet} racksProps={racksProps} />

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
