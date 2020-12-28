const getUniqueValuesArr = (arr) => [...new Set(arr)];

export const getPropValueByTitle = (productState, title) => {
  const propsNames = title.split("_");
  const prop = propsNames.reduce((acc, curr) => acc[curr] ?? acc, productState);
  return prop.value ?? prop;
};

const rateStates = (propState, productState, changedPropName) =>
  Object.keys(productState).reduce((rating, curName) => {
    if (productState[curName].value === propState[curName]) {
      if (curName === changedPropName) {
        return rating + 10;
      }
      return rating + 1;
    }
    return rating;
  }, 0);

const getSimilarState = (productState, productsProps, changedPropName) => {
  let maxSamePropsIndex = 0;
  productsProps
    .map((state) => rateStates(state, productState, changedPropName))
    .reduce((prev, curr, index) => {
      if (prev < curr) {
        maxSamePropsIndex = index;
        return curr;
      }
      return prev;
    }, 0);
  return productsProps[maxSamePropsIndex];
};

export const setCurrentStateToSimilar = (
  productState,
  productProps,
  changedPropName
) => {
  const similarState = getSimilarState(
    productState,
    productProps,
    changedPropName
  );
  Object.keys(productState).forEach((propName) => {
    productState[propName].value = similarState[propName];
  });
};

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

export const getProductPropsToOrder = (productState, productsProps) => {
  return productsProps.titles.map((item) => ({
    title: item[Object.keys(item)[0]],
    value: getPropValueByTitle(productState, Object.keys(item)[0]),
  }));
};

export const getNameByType = (types, type) => {
  types = types.filter(
    (item) =>
      item.type === type || (Array.isArray(type) && type.includes(item.type))
  );
  return types.reduce((acc, curr) => acc + " " + curr.name, "");
};

const getProductPropValues = (productsProps, prop) =>
  getUniqueValuesArr(
    productsProps.map((item) =>
      item.name ? { title: item.name, value: item[prop] } : item[prop]
    )
  );

const getGroupPropsValues = (propsGroup, except) => {
  return Object.fromEntries(
    Object.keys(propsGroup[0])
      .filter((propName) => !except.includes(propName))
      .map((propName) => [propName, getProductPropValues(propsGroup, propName)])
  );
};

export const getAllProductPropsValues = (
  productsProps,
  propsGroupsNames = [],
  except = ["price"]
) => {
  return propsGroupsNames.length === 0
    ? getGroupPropsValues(productsProps, except)
    : Object.fromEntries(
        propsGroupsNames.map((groupName) => [
          groupName,
          getGroupPropsValues(productsProps[groupName], except),
        ])
      );
};

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

// Максимально похожий объект
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

const getPrice = (productsPropsGroup, stateItem) => {
  let result = productsPropsGroup.filter((propsItem) =>
    isItemsEqual(stateItem, propsItem)
  );
  return result[0].price;
};

const getItemPrice = (
  productProps,
  productState,
  except = ["installation", "delivery", "subDelivery", "total", "set"]
) => {
  let total = 0;

  Object.keys(productState)
    .filter((propName) => !except.includes(propName))
    .forEach((propName) => {
      if (!propName.includes("Qnt")) {
        let qnt = productState[propName + "Qnt"] ?? 1;
        total += qnt * getPrice(productProps[propName], productState[propName]);
      }
    });

  return total;
};

const getDeliveryCost = ({ types }, { delivery }) =>
  types.reduce(
    (acc, curr) => (delivery.includes(curr.type) ? acc + curr.price : acc),
    0
  );

const getInstallationCost = ({ types }, { installation, shelfQnt }) =>
  types
    .filter((item) => installation.includes(item.type))
    .map((item) =>
      item.price.length
        ? getCostByQntRange(item.price, "shelfQnt", shelfQnt)
        : item.price
    )
    .reduce((accum, current) => accum + current);

export const calculateTotalPrice = (
  productState,
  productProps,
  delivery,
  installation
) =>
  (getItemPrice(productProps, productState) +
    getInstallationCost(installation, productState)) *
    productState.itemsQnt +
  getDeliveryCost(delivery, productState);
