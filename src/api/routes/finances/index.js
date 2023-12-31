import HttpConfig from '../../httpConfig';

export const historicFinances = async () => {
  try {
    const {
      data: { historic },
    } = await HttpConfig.get('historic');

    return historic;
  } catch (error) {
    return error;
  }
};

export const historicFinancesDetails = async () => {
  try {
    const {
      data: { details },
    } = await HttpConfig.get('historic/details');

    return details;
  } catch (error) {
    return error;
  }
};

export const insertItem = async (item) => {
  try {
    const { data } = await HttpConfig.post('historic', item);

    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};

export const deleteItem = async (idItem) => {
  try {
    const { data } = await HttpConfig.delete(`historic/${idItem}`);

    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};

export const updateItem = async (idItem, objItem) => {
  try {
    const { data } = await HttpConfig.put(`historic/${idItem}`, objItem);

    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};

export const selectOneItem = async (idItem) => {
  try {
    const { data } = await HttpConfig.get(`historic/${idItem}`);

    console.log('🚀 ~ file: index.js:61 ~ selectOneItem ~ data:', data);
    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};
