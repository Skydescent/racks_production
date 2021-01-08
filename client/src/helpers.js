const getUniqueValuesArr = (arr) => [...new Set(arr)];

const getNamesArr = (fullName) => fullName.split("_");

export const getGroupName = (fullName) =>
  fullName.split("_").slice(0, -1).join("_");

export const getRangeLimits = (range) => range.split(":");

export const getTitle = (productsProps, name) =>
  (productsProps.titles &&
    productsProps.titles.filter((item) => Object.keys(item).includes(name))[0][
      name
    ]) ??
  null;

export const isQuantity = (propName) => propName.includes("Qnt");

export const getPropNameByPos = (fullName, pos = "last") => {
  const namesArr = getNamesArr(fullName);
  if (pos === "last") {
    return namesArr[namesArr.length - 1];
  }
  return namesArr[pos];
};

export const getPropValueByTitle = (productState, title) => {
  const propsNames = getNamesArr(title);
  const prop = propsNames.reduce((acc, curr) => acc[curr] ?? acc, productState);
  return prop.value ?? prop;
};

// Проверить работу взамен getPropValueByTitle
export const getValueByFullName = (state, fullName) => {
  const namesArr = getNamesArr(fullName);
  const prop = namesArr.reduce((acc, curr) => acc[curr] ?? false, state);
  return prop.value ?? prop;
};

export const setValueByFullName = (state, fullName, value) => {
  const [head, ...rest] = getNamesArr(fullName);

  if (!rest.length) {
    if (state[head]) {
      if (state[head].value) {
        state[head].value = value;
      } else {
        state[head] = value;
      }
    } else {
      return false;
    }
  }
  setValueByFullName(state[head], rest.join("_"), value);
};

const setValuesByFullName = (state, items) => {
  items.forEach((item) => {
    setValueByFullName(state, item.name, item.value);
  });
};

export const getGroupProps = (productsProps, fullName) => {
  return getValueByFullName(productsProps, getGroupName(fullName));
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
  productsProps,
  fullName
) => {
  const productGroupState = getGroupProps(productState, fullName);
  const productsGroupProps = getGroupProps(productsProps, fullName);
  const similarState = getSimilarState(
    productGroupState,
    productsGroupProps,
    getPropNameByPos(fullName, "last")
  );

  Object.keys(productGroupState).forEach((propName) => {
    productGroupState[propName].value = similarState[propName];
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
    const [min, max] = getRangeLimits(item[rangePropName]);
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

export const getProductPropValues = (productsProps, fullName) => {
  const groupProps = getGroupProps(productsProps, fullName);
  const propName = getPropNameByPos(fullName, "last");
  return getUniqueValuesArr(
    groupProps.map((item) =>
      item.name ? { title: item.name, value: item[propName] } : item[propName]
    )
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

export const syncActiveInputs = (
  fullName,
  productsProps,
  productState,
  except
) => {
  const activeInputs = getActiveInputs(
    getGroupProps(productsProps, fullName),
    getGroupProps(productState, fullName),
    getPropNameByPos(fullName, "last"),
    getValueByFullName(productState, fullName),
    except
  );

  Object.keys(activeInputs).forEach((propName) => {
    setValuesByFullName(productState, [
      {
        name: `${getGroupName(fullName)}_${propName}_active`,
        value: activeInputs[propName],
      },
      {
        name: `${getGroupName(fullName)}_${propName}_value`,
        value: currentActiveValue(
          getValueByFullName(
            productState,
            `${getGroupName(fullName)}_${propName}_value`
          ),
          activeInputs[propName]
        ),
      },
    ]);
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
  productsProps,
  productState,
  except = ["installation", "delivery", "subDelivery", "total", "set"]
) => {
  let total = 0;

  Object.keys(productState)
    .filter((propName) => !except.includes(propName))
    .forEach((propName) => {
      if (!propName.includes("Qnt")) {
        let qnt = productState[propName + "Qnt"] ?? 1;
        total +=
          qnt * getPrice(productsProps[propName], productState[propName]);
      }

      if (propName.includes("Qnt") && productState[propName].fullName) {
        let qnt = productState[propName].value;
        total +=
          qnt *
          getValueByFullName(
            productState,
            productState[propName].fullName + "_value"
          );
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
