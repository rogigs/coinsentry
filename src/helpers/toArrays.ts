type ModelObject = {
  [key: string]: any;
};

export const compareArraysOfObjects = (
  oldDatas: ModelObject[],
  newDatas: ModelObject[],
  key: string,
) => {
  if (newDatas) {
    return [...oldDatas, ...newDatas].reduce((accumulator, currentObject) => {
      const isObjectExist = accumulator.some(
        (obj: ModelObject) => obj[key] === currentObject[key],
      );

      if (!isObjectExist) {
        accumulator.push(currentObject);
      }

      return accumulator;
    }, []);
  }

  return oldDatas;
};
