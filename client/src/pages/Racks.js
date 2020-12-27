import React from "react";
import TextAboutProduct from "../components/TextAboutProduct";
import Calculator from "../components/calculator/Calculator";

import IMG from "../images/racks-main.jpg";

import { racksProps, initialRack } from "../products/racks";

const Racks = () => {
  const fieldsSet = [
    { title: "Высота стеллажа, см", propName: "height", propGroup: "bar" },
    { title: "Глубина полки см", propName: "depth", propGroup: "shelf" },
    { title: "Ширина полки, см", propName: "width", propGroup: "shelf" },
    {
      title: "Нагрузка на стеллаж, кг",
      propName: "load",
      propGroup: "bar",
    },
  ];

  const slidersSet = [
    { title: "Количество полок", propName: "shelfQnt", range: "2:10" },
    { title: "Количество стеллажей", propName: "itemsQnt", range: "1:10" },
  ];

  return (
    <div>
      <section className="calc-bg">
        <div className="calc">
          <div>
            <img src={IMG} alt="main_img" />
          </div>
          <Calculator
            fieldsSet={fieldsSet}
            slidersSet={slidersSet}
            productsProps={racksProps}
            initialProduct={initialRack}
            propsGroups={["shelf", "bar"]}
            isInstallation={true}
          />
        </div>
      </section>
      <TextAboutProduct />
    </div>
  );
};

export default Racks;
