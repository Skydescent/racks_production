import React from "react";

const MetalCabinets = () => {
  return (
    <section class="content-inner product">
      <div id="mark1" className="product_calc">
        <div>Изображение</div>
        <div>
          <h1>Шкаф металлический для одежды ШРМ-АК</h1>
          <div className="value">
            <div>
              <strong>Высота шкафа, см</strong>
            </div>
            <div>
              <strong>Глубина, см</strong>
            </div>
          </div>

          <strong>Ширина, см</strong>

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
