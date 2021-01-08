import React from "react";
import Calculator from "../components/calculator/Calculator";
import { metalCabinets } from "../products/metalCabinets";
import CABINET_IMG_01 from "../images/metal_cabinets/cabinet_01.jpg";

const MetalCabinets = () => {
  const productsProps = metalCabinets;

  const renderOrder = [
    { type: "field", name: "items_type" },
    { type: "content", name: "items_model" },
    { type: "field", name: "items_height" },
    { type: "field", name: "items_depth" },
    { type: "field", name: "items_sections" },
    { type: "field", name: "items_shelves" },
    { type: "field", name: "items_drawer" },
    { type: "content", name: "items_set" },
    { type: "slider", name: "addShelfPriceQnt", range: "0:10" },
  ];

  return (
    <section className="content-inner product">
      <div className="product_calc">
        <div>
          <img src={CABINET_IMG_01} alt="main_img" />
        </div>
        <div>
          <h1>{productsProps.name}</h1>
          <Calculator
            productsProps={productsProps}
            initialProduct={productsProps.initialState}
            except={["price"]}
            isActiveInputs={false}
            renderOrder={renderOrder}
          />
        </div>
      </div>
    </section>
  );
};

export default MetalCabinets;
