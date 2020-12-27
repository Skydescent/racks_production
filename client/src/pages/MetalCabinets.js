import React from "react";
import Calculator from "../components/calculator/Calculator";
import { metalCabinets } from "../products/metalCabinets";
import CABINET_IMG_01 from "../images/metal_cabinets/cabinet_01.jpg";

const MetalCabinets = () => {
  const metalCabinetsProps = metalCabinets[0];
  const initialMetalCabinet = metalCabinetsProps.initialState;
  const fieldsSet = [
    { title: "Высота шкафа, см", propName: "height", propGroup: "items" },
    { title: "Глубина, см", propName: "depth", propGroup: "items" },
    { title: "Ширина, см", propName: "width", propGroup: "items" },
    {
      title: "Количество секций",
      propName: "sections",
      propGroup: "items",
    },
    {
      title: "Количество полок",
      propName: "shelves",
      propGroup: "items",
    },
  ];
  return (
    <section className="content-inner product">
      <div className="product_calc">
        <div>
          <img src={CABINET_IMG_01} alt="main_img" />
        </div>
        <div>
          <h1>{metalCabinets[0].name}</h1>
          <Calculator
            fieldsSet={fieldsSet}
            productsProps={metalCabinetsProps}
            initialProduct={initialMetalCabinet}
            propsGroups={["items"]}
            productContent={"items_set"}
            except={["price", "set"]}
          />
        </div>
      </div>
    </section>
  );
};

export default MetalCabinets;
