import React from "react";
import HALLWAY_IMG from "../images/wardrobe_systems/wardrobe_01.jpg";
import WARDROBE_ROOM_IMG from "../images/wardrobe_systems/wardrobe_02.jpg";
import BATH_ROOM_IMG from "../images/wardrobe_systems/wardrobe_02.jpg";

const WardrobeSystems = () => {
  return (
    <section className="content-inner product img-border">
      <div className="flex grid_2">
        <div>
          <img src={HALLWAY_IMG} alt="hallway" />
        </div>
        <div className="table">
          <h1>Гардеробная система «Прихожая»</h1>
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
          <div className="price">
            <div>
              <span>3 400</span>&#8381;
            </div>
            <div className="order dark">
              <a href="#order">Заказать</a>
            </div>
          </div>
          <p>Стоимость минимального базового комплекта</p>
        </div>
      </div>
      <div className="flex grid_2">
        <div>
          <img src={WARDROBE_ROOM_IMG} alt="wardrobe room" />
        </div>
        <div>
          <h1>Функциональная гардеробная комната</h1>
          <p>
            Полки сетчатые и сплошные, перекладины для вешалок, выдвижные
            корзины разной глубины. Формирование комплектации под любой размер
            стены.
          </p>
          <div className="price">
            <div>
              <span>0</span>&#8381;
            </div>
            <div className="order dark">
              <a href="#order">Заказать</a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex grid_2">
        <div>
          <img src={BATH_ROOM_IMG} alt="bathroom" />
        </div>
        <div>
          <h1>Гардеробная система «Ванная комната»</h1>
          <p>
            Сетчатый белый стеллаж не создаёт загроможденности и размещен в
            неиспользуемых нишах. Материал &mdash; полимерное покрытие белого
            цвета.
          </p>
          <div className="price">
            <div>
              <span>менее 10 000</span>&#8381;
            </div>
            <div className="order dark">
              <a href="#order">Заказать</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WardrobeSystems;
