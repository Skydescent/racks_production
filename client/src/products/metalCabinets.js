export const metalCabinets = [
  {
    name: "Шкаф металлический для одежды ШРМ-АК",
    versions: [
      {
        depth: 500,
        width: 500,
        height: 1860,
        sectionsQnt: 2,
        shelvesQnt: 2,
        price: 100,
      },
      {
        depth: 500,
        width: 500,
        height: 1860,
        sectionsQnt: 1,
        shelvesQnt: 3,
        price: 200,
      },
      {
        depth: 500,
        width: 600,
        height: 1860,
        sectionsQnt: 2,
        shelvesQnt: 2,
        price: 300,
      },
      {
        depth: 500,
        width: 800,
        height: 1860,
        sectionsQnt: 2,
        shelvesQnt: 2,
        price: 400,
      },
    ],
    initialState: {
      versions: {
        depth: { value: 500, active: [500] },
        width: { value: 500, active: [500, 600, 800] },
        height: { value: 1860, active: [1860] },
        sectionsQnt: { value: 2, active: [1, 2] },
        shelvesQnt: { value: 2, active: [2, 3] },
      },
      installation: "self_install",
      delivery: "self_delivery",
      subDelivery: "to_flat",
      total: 100,
    },
  },
  {
    name: "Шкаф металлический, бухгалтерский ШАМ-11",
    version: [
      {
        depth: 500,
        width: 850,
        height: 1860,
        sectionsQnt: 1,
        shelvesQnt: 1,
        price: 100,
      },
      {
        depth: 500,
        width: 850,
        height: 1860,
        sectionsQnt: 1,
        shelvesQnt: 3,
        price: 200,
      },
      {
        depth: 450,
        width: 920,
        height: 1860,
        sectionsQnt: 1,
        shelvesQnt: 3,
        price: 300,
      },
      {
        depth: 400,
        width: 850,
        height: 1860,
        sectionsQnt: 1,
        shelvesQnt: 3,
        price: 400,
      },
      {
        depth: 500,
        width: 850,
        height: 2000,
        sectionsQnt: 1,
        shelvesQnt: 4,
        price: 500,
      },
      {
        depth: 450,
        width: 960,
        height: 1860,
        sectionsQnt: 1,
        shelvesQnt: 3,
        price: 600,
      },
    ],
    initialState: {
      version: {
        depth: 500,
        width: 850,
        height: 1860,
        sectionsQnt: 1,
        shelvesQnt: 1,
      },
      rack: { height: 1860 },
      installation: "self_install",
      delivery: "self_delivery",
      subDelivery: "to_flat",
      total: 100,
    },
  },
  {
    name: "Шкаф металлический, картотечный КР",
    version: [
      { depth: 630, width: 465, height: 715, drawerQnt: 2, price: 100 },
      { depth: 630, width: 465, height: 1025, drawerQnt: 3, price: 200 },
      { depth: 630, width: 465, height: 1335, drawerQnt: 4, price: 300 },
      { depth: 630, width: 465, height: 1645, drawerQnt: 5, price: 400 },
      { depth: 585, width: 525, height: 1370, drawerQnt: 7, price: 500 },
    ],
    initialState: {
      version: { depth: 630, width: 465, height: 715, drawerQnt: 2 },
      installation: "self_install",
      delivery: "self_delivery",
      subDelivery: "to_flat",
      total: 2720,
    },
  },
];
