const getUniqueValuesArr = (arr) => [...new Set(arr)];

const currentActiveValue = (currentValue, active) => {
  return active.includes(currentValue) ? currentValue : active[0];
};

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
  bar: {
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

export const getProductPropValues = (productsProps, prop) =>
  getUniqueValuesArr(
    productsProps.map((item) =>
      item.name ? { title: item.name, value: item[prop] } : item[prop]
    )
  );

const getGroupPropsValues = (propsGroup, except) =>
  Object.fromEntries(
    Object.keys(propsGroup[0])
      .filter((propName) => !except.includes(propName))
      .map((propName) => [propName, getProductPropValues(propsGroup, propName)])
  );

export const getAllProductPropsValues = (
  productsProps,
  propsGroupsNames = [],
  except = ["price"]
) =>
  propsGroupsNames.length === 0
    ? getGroupPropsValues(productsProps, except)
    : Object.fromEntries(
        propsGroupsNames.map((groupName) => [
          groupName,
          getGroupPropsValues(productsProps[groupName], except),
        ])
      );

export const createActiveInputs = (
  propsGroup,
  changedPropName,
  changedPropValue,
  relatedPropName
) =>
  getUniqueValuesArr(
    propsGroup
      .filter((props) => {
        if (props[changedPropName] !== changedPropValue) {
          return false;
        }
        return true;
      })
      .map((props) => props[relatedPropName])
  );

export const getActiveInputs = (
  productsPropsGroup,
  productStateGroup,
  changedPropName,
  changedPropValue,
  except
) => {
  const activeInputsArr = Object.keys(productStateGroup)
    .filter(
      (relatedPropName) =>
        relatedPropName !== changedPropName && !except.includes(relatedPropName)
    )
    .map((propName) => [
      propName,
      createActiveInputs(
        productsPropsGroup,
        changedPropName,
        changedPropValue,
        propName
      ),
    ]);

  return Object.fromEntries(activeInputsArr);
};

export const syncActiveInputs = (
  productsProps,
  productState,
  propsGroupName,
  changedPropName,
  changedPropValue,
  except
) => {
  const activeInputs = getActiveInputs(
    productsProps[propsGroupName],
    productState[propsGroupName],
    changedPropName,
    changedPropValue,
    except
  );

  Object.keys(activeInputs).forEach((propName) => {
    productState[propsGroupName][propName].active = activeInputs[propName];
    productState[propsGroupName][propName].value = currentActiveValue(
      productState[propsGroupName][propName].value,
      activeInputs[propName]
    );
  });

  return productState;
};

const isItemsEqual = (stateItem, propsItem) =>
  Object.keys(stateItem).every(
    (propName) =>
      stateItem[propName].value === propsItem[propName] ||
      stateItem[propName] === propsItem[propName]
  );

const getPrice = (productsPropsGroup, stateItem) =>
  productsPropsGroup.filter((propsItem) =>
    isItemsEqual(stateItem, propsItem)
  )[0].price;

const getItemPrice = (
  productProps,
  productState,
  except = ["installation", "delivery", "subDelivery", "total"]
) => {
  let total = 0;

  Object.keys(productState)
    .filter((propName) => !except.includes(propName))
    .forEach((propName) => {
      if (!propName.includes("Qnt")) {
        total +=
          productState[propName + "Qnt"] *
          getPrice(productProps[propName], productState[propName]);
      }
    });

  return total;
};

const getDeliveryCost = (
  { delivery: deliveryProp, subDelivery: subDeliveryProp },
  { delivery, subDelivery }
) =>
  delivery !== "self_delivery"
    ? deliveryProp.filter((item) => item.type === delivery)[0].price +
      subDeliveryProp.filter((item) => item.type === subDelivery)[0].price
    : 0;

const getInstallationCost = (
  { installation: propsInstall },
  { installation, shelfQnt }
) =>
  propsInstall
    .filter((item) => installation.includes(item.type))
    .map((item) =>
      item.price.length
        ? getCostByQntRange(item.price, "shelfQnt", shelfQnt)
        : item.price
    )
    .reduce((accum, current) => accum + current);

export const calculateTotalPrice = (rackState, productProps) =>
  (getItemPrice(productProps, rackState) +
    getInstallationCost(productProps, rackState)) *
    rackState.itemsQnt +
  getDeliveryCost(productProps, rackState);
