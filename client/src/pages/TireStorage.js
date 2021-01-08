import React from "react";
import Calculator from "../components/calculator/Calculator";
import IMG from "../images/tirestorage-main.jpg";

const TireStorage = () => {
  const productsProps = {
    name: "Стойка для колёс",
    titles: [{ items_model: "Стойка на колёсиках для хранения шин" }],
    items: [{ model: "Стойка на колёсиках для хранения шин", price: 1550 }],
  };
  const initialState = {
    items: [],
    itemsQnt: 1,
    installation: "self_install",
    delivery: ["self_delivery"],
    total: 1550,
  };

  const productsImages = { image: IMG };

  return (
    <section className="content-inner product">
      <Calculator
        productsProps={productsProps}
        initialProduct={initialState}
        isInstallation={false}
        isActiveInputs={true}
        productsImages={productsImages}
      >
        <div>
          <p>
            Удобная стойка на колёсиках для сезонного хранения шин различного
            диаметра. Регулировка межъярусного расстояния позволяет хранить шины
            от R13 до R19 при ширине до 245мм.
          </p>
          <table>
            <tbody>
              <tr>
                <td>Габаритные размеры</td>
                <td>60х50х125 см</td>
              </tr>
              <tr>
                <td>Размеры в упаковке</td>
                <td>122х12х10 см</td>
              </tr>
              <tr>
                <td>Масса</td>
                <td>7,5 кг</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Нагрузка</td>
                <td>до 90 кг</td>
              </tr>
            </tfoot>
          </table>

          <div />
        </div>
      </Calculator>
    </section>
  );
};

export default TireStorage;
