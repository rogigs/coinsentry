import HttpConfig from "../../httpConfig";

export const historicFinances = async () => {
  try {
    const { data } = await HttpConfig.get("historic");

    return data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:12 ~ authLogin ~ error:", error);
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

export const deleteItem = async (item) => {
  try {
    const { data } = await HttpConfig.delete(`historic/${item}`);

    return data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:12 ~ authLogin ~ error:", error);
  }
};
