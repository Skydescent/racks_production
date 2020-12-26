export const delivery = {
  title: "Доставка",
  types: [
    { type: "self_delivery", name: "самовывоз", price: 0 },
    { type: "daytime", name: "дневная", price: 200 },
    { type: "evening", name: "вечерняя", price: 0 },
    {
      type: "to_entrance",
      parent: ["daytime", "evening"],
      name: "до подъезда",
      price: 0,
    },
    {
      type: "to_flat",
      parent: ["daytime", "evening"],
      name: "до квартиры",
      price: 100,
    },
  ],
  defChild: "to_flat",
};
