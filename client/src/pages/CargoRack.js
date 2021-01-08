import React from "react";
import Calculator from "../components/calculator/Calculator";
import { productsProps, initialState } from "../products/cargoRacks";

import IMG from "../images/cargoracks-main.jpg";

const CargoRack = () => {
  const renderOrder = [
    { type: "field", name: "bar_height" },
    { type: "field", name: "shelf_depth" },
    { type: "field", name: "shelf_width" },
    { type: "slider", name: "shelfQnt", range: "3:10" },
  ];

  const productsImages = { image: IMG };
  return (
    <div>
      <section className="content-inner product">
        <Calculator
          productsProps={productsProps}
          initialProduct={initialState}
          isInstallation={true}
          isActiveInputs={true}
          renderOrder={renderOrder}
          productsImages={productsImages}
        />
      </section>
    </div>
  );
};

export default CargoRack;
