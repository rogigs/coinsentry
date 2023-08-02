import HttpConfig from "../../httpConfig";

export const historicFinances = async () => {
  try {
    const { data } = await HttpConfig.get("history");

    return data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:12 ~ authLogin ~ error:", error);
  }
};
