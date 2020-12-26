export const installation = {
  title: "Сборка",
  types: [
    { type: "self_install", name: "самостоятельная", price: 0 },
    {
      type: "build",
      name: "собрать стеллаж",
      price: [
        { shelfQnt: "1:5", value: 500 },
        { shelfQnt: "4:7", value: 600 },
        { shelfQnt: "6:9", value: 700 },
        { shelfQnt: "8:11", value: 800 },
      ],
    },
    {
      type: "build_fix",
      name: "собрать и закрепить к стене",
      price: [{ shelfQnt: "all", value: 100 }],
    },
  ],
};
