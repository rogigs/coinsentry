import HttpConfig from "../../httpConfig";

export const historicFinances = async () => {
  try {
    const { data } = await HttpConfig.get("historic");

    return data;
  } catch (error) {
    return error;
  }
};

export const historicFinancesDetails = async () => {
  try {
    const { data } = await HttpConfig.get("historic/details");

    return data[0];
  } catch (error) {
    return error;
  }
};

export const insertItem = async (item) => {
  try {
    const { data } = await HttpConfig.post("historic", item);

    return data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:12 ~ authLogin ~ error:", error);
  }
};

export const deleteItem = async (idItem) => {
  try {
    const { data } = await HttpConfig.delete(`historic/${idItem}`);

    return data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:12 ~ authLogin ~ error:", error);
  }
};

export const updateItem = async (idItem, objItem) => {
  try {
    const { data } = await HttpConfig.patch(`historic/${idItem}`, objItem);

    return data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:12 ~ authLogin ~ error:", error);
  }
};

export const selectOneItem = async (idItem) => {
  try {
    const { data } = await HttpConfig.get(`historic/${idItem}`);

    return data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:12 ~ authLogin ~ error:", error);
  }
};
