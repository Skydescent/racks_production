import React from "react";
import SimpleCalculator from "../components/calculator/SimpleCalculator";
import HALLWAY_IMG from "../images/wardrobe_systems/wardrobe_01.jpg";
import WARDROBE_ROOM_IMG from "../images/wardrobe_systems/wardrobe_02.jpg";
import BATH_ROOM_IMG from "../images/wardrobe_systems/wardrobe_02.jpg";

const WardrobeSystems = () => {
  const initialHallWayState = {
    name: "Гардеробная система «Прихожая»",
    price: 3400,
  };
  const initialWardrobeRoomState = {
    name: "Функциональная гардеробная комната",
    price: 0,
  };
  const initialBathRoomState = {
    name: "Гардеробная система «Ванная комната»",
    priceTitle: "менее 10 000",
    total: 9999,
  };

  const installation = {
    types: [
      { type: "self_install", name: "самостоятельная", price: 0 },
      {
        type: "build",
        name: "собрать стеллаж",
        price: "price*0.1",
      },
      {
        type: "build_fix",
        name: "собрать и закрепить к стене",
        price: "price*0.05",
      },
    ],
  };

  return (
    <section className="content-inner product img-border">
      <SimpleCalculator
        initialProduct={initialHallWayState}
        img={HALLWAY_IMG}
        installationTypes={installation}
        totalContent={<p>Стоимость минимального базового комплекта</p>}
      >
        <div className="table">
          <p>
            Удобная и недорогая прихожая с сетчатыми полками под обувь и
            головные уборы, корзинами под вещи и перчатки.
          </p>
          <ul>
            <li>
              Глубина полок<span>300 или 400 мм</span>
            </li>
            <li>
              Ширина<span>600, 900 или 1200 мм</span>
            </li>
          </ul>
        </div>
      </SimpleCalculator>
      <SimpleCalculator
        initialProduct={initialWardrobeRoomState}
        img={WARDROBE_ROOM_IMG}
        installationTypes={installation}
      >
        <p>
          Полки сетчатые и сплошные, перекладины для вешалок, выдвижные корзины
          разной глубины. Формирование комплектации под любой размер стены.
        </p>
      </SimpleCalculator>
      <SimpleCalculator
        initialProduct={initialBathRoomState}
        img={BATH_ROOM_IMG}
        installationTypes={installation}
      >
        <p>
          Сетчатый белый стеллаж не создаёт загроможденности и размещен в
          неиспользуемых нишах. Материал &mdash; полимерное покрытие белого
          цвета.
        </p>
      </SimpleCalculator>
    </section>
  );
};

export default WardrobeSystems;
