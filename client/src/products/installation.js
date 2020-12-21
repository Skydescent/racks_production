export const installation = [
  { type: "self_install", name: "самостоятельная", price: 0 },
  {
    type: "build",
    name: "собрать стеллаж",
    price: [
      { shelvesQuantity: "1:5", value: 500 },
      { shelvesQuantity: "4:7", value: 600 },
      { shelvesQuantity: "6:9", value: 700 },
      { shelvesQuantity: "8:11", value: 800 },
    ],
  },
  {
    type: "build_fix",
    name: "собрать и закрепить к стене",
    price: [{ shelvesQuantity: "all", value: 100 }],
  },
];
