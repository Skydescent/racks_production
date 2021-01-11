import React from "react";
import Calculator from "../components/calculator/Calculator";
import { metalCabinets } from "../products/metalCabinets";
import CABINET_CLOTHES from "../images/metal_cabinets/cabinet_01.jpg";
import CABINET_ACCOUNTING from "../images/metal_cabinets/cabinet_04.jpg";
import CABINET_CARD from "../images/metal_cabinets/cabinet_05.jpg";

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
    { type: "slider", name: "itemsQnt", range: "0:10" },
  ];

  const productsImages = {
    fullName: "items_type",
    images: [
      { value: "для одежды", image: CABINET_CLOTHES },
      { value: "бухгалтерский", image: CABINET_ACCOUNTING },
      { value: "картотечный", image: CABINET_CARD },
    ],
  };

  return (
    <section className="content-inner product">
      <Calculator
        productsProps={productsProps}
        initialProduct={productsProps.initialState}
        except={["price"]}
        isActiveInputs={false}
        isInstallation={true}
        renderOrder={renderOrder}
        productsImages={productsImages}
      />
    </section>
  );
};

export default MetalCabinets;
