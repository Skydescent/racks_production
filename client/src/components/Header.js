import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  { to: '/garderobnyye_sistemy', text: 'Гардеробные системы' },
  { to: '/shkafy_metallicheskiye', text: 'Шкафы металлические' },
  { to: '/gruzovyye', text: 'Грузовые стиллажи' },
  { to: '/khraneniye_shin', text: 'Хранение Шин' },
  { to: '/bytovyye', text: 'Бытовые стиллажи' },
];

function Header() {
  return (
    <header>
      <div className="fixed">
        <div className="header content-inner">
          <div>
            <a href="/">Стеллаж-Томск</a>
          </div>
          <div>
            <p>
              <a href="https://yandex.ru/maps/67/tomsk/?ol=biz&amp;oid=1066389702">
                Томск, ул. Елизаровых, 26
              </a>
            </p>
            <p>Пн - Пт с 10:00 до 19:00, перерыв c 13:00 до 14:00</p>
            <p>Сб с 11:00 до 16:00, Вс — выходной</p>
          </div>
          <div>
            <a href="tel:+79039554145">+7 903 955-41-45</a>
            <a href="tel:83822224145">8 3822 22-41-45</a>
          </div>
        </div>
        <nav className="nav_container">
          <div className="nav_list">
            {links.map(item => (
              <Link key={item.to} className="section_list_link" to={item.to}>
                {item.text}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
