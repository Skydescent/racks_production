const getCostByQntRange = (ranges, rangePropName, qnt) =>
  ranges.filter((item) => {
    if (item[rangePropName] === "all") {
      return true;
    }
    const [min, max] = item[rangePropName].split(":");
    return qnt > min && qnt < max;
  })[0].value * qnt;

const getValuesFromRackState = ({
  shelf: {
    depth: { value: depth },
    width: { value: width },
  },
  rack: {
    height: { value: height },
    load: { value: load },
  },
  ...rest
}) => ({ depth, width, height, load, ...rest });

export const getNameFromPropTypeValue = (racksProps, propName, typeValue) =>
  racksProps[propName].filter((item) => item.type === typeValue)[0].name;

export const getNamesFromRackState = (
  { installation, delivery, subDelivery, ...rest },
  racksProps
) => {
  const rackNames = getValuesFromRackState({ ...rest });

  installation = getNameFromPropTypeValue(
    racksProps,
    "installation",
    installation
  );
  delivery = getNameFromPropTypeValue(racksProps, "delivery", delivery);
  subDelivery = getNameFromPropTypeValue(
    racksProps,
    "subDelivery",
    subDelivery
  );

  if (delivery === "самовывоз") {
    subDelivery = "";
  }

  return {
    installation,
    delivery,
    subDelivery,
    ...rackNames,
  };
};

export const getProductPropValues = (racksProps, prop) => [
  ...new Set(
    racksProps.map((item) =>
      item.name ? { title: item.name, value: item[prop] } : item[prop]
    )
  ),
];

export const createActiveInputs = (
  productProps,
  changedPropName,
  changedPropValue,
  propName
) =>
  productProps
    .filter((props) => {
      if (props[changedPropName] !== changedPropValue) {
        return false;
      }
      return true;
    })
    .map((props) => props[propName]);

export const calculateTotalPrice = (rackState, productProps) => {
  const {
    depth,
    width,
    height,
    load,
    shelvesQuantity,
    racksQuantity,
    installation,
    delivery,
    subDelivery,
  } = getValuesFromRackState(rackState);

  const [{ price: shelfPrice }] = productProps.shelf.filter((item) => {
    if (item.depth === depth && item.width === width) {
      return true;
    }
    return false;
  });

  const [{ price: rackPrice }] = productProps.rack.filter((item) => {
    if (item.height === height && item.load === load) {
      return true;
    }
    return false;
  });

  const installCost = productProps.installation
    .filter((item) => installation.includes(item.type))
    .map((item) =>
      item.price.length
        ? getCostByQntRange(item.price, "shelvesQuantity", shelvesQuantity)
        : item.price
    )
    .reduce((accum, current) => accum + current);

  let deliveryCost = 0;
  if (delivery !== "self_delivery") {
    deliveryCost += productProps.delivery.filter(
      (item) => item.type === delivery
    )[0].price;
    deliveryCost += productProps.subDelivery.filter(
      (item) => item.type === subDelivery
    )[0].price;
  }

  return (
    (shelvesQuantity * shelfPrice + rackPrice * 4 + installCost) *
      racksQuantity +
    deliveryCost
  );
};
