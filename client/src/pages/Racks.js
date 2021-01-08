import React from "react";
import TextAboutProduct from "../components/TextAboutProduct";
import Calculator from "../components/calculator/Calculator";

import IMG from "../images/racks-main.jpg";

import { racksProps, initialRack } from "../products/racks";

const Racks = () => {
  const renderOrder = [
    { type: "field", name: "bar_height" },
    { type: "field", name: "shelf_depth" },
    { type: "field", name: "shelf_width" },
    { type: "field", name: "bar_load" },
    { type: "slider", name: "shelfQnt", range: "2:10" },
    { type: "slider", name: "itemsQnt", range: "1:10" },
  ];

  const productsImages = { image: IMG };

  return (
    <div>
      <section className="calc-bg">
        <Calculator
          productsProps={racksProps}
          initialProduct={initialRack}
          isInstallation={true}
          isActiveInputs={true}
          renderOrder={renderOrder}
          productsImages={productsImages}
        />
      </section>
      <TextAboutProduct />
    </div>
  );
};

export default Racks;
