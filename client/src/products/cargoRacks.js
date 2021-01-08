export const productsProps = {
  name: "Грузовые стеллажи",
  titles: [
    { bar_height: "Высота стеллажа, см" },
    { shelf_depth: "Глубина полки см" },
    { shelf_width: "Ширина полки, см" },
    { bar_load: "Нагрузка на стеллаж, кг" },
    { shelfQnt: "Количество полок" },
    { itemsQnt: "Количество стеллажей" },
  ],
  shelf: [
    { depth: 510, width: 150, price: 100 },
    { depth: 510, width: 185, price: 120 },
    { depth: 635, width: 150, price: 200 },
    { depth: 635, width: 185, price: 220 },
    { depth: 785, width: 150, price: 300 },
    { depth: 785, width: 185, price: 320 },
  ],
  bar: [
    { height: 200, load: 900, price: 300 },
    { height: 250, load: 900, price: 400 },
    { height: 300, load: 900, price: 500 },
  ],
};

export const initialState = {
  shelf: {
    depth: {
      value: 510,
      active: [510, 635, 785],
    },
    width: {
      value: 150,
      active: [150, 185],
    },
  },
  bar: {
    height: {
      value: 200,
      active: [200, 250, 300],
    },
    load: {
      value: 900,
      active: [900],
    },
  },
  shelfQnt: 3,
  barQnt: 4,
  itemsQnt: 1,
  installation: "self_install",
  delivery: ["self_delivery"],
  total: 1560,
};
