import HttpConfig from '../../httpConfig';

export type User = {
  email: string;
  password: string;
};

export const authUser = async (user: User) => {
  try {
    const { data, headers } = await HttpConfig.withoutToken.post(
      `user/auth`,
      user,
    );

    return { data, headers };
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};

export const createUser = async (user: User) => {
  try {
    const { data } = await HttpConfig.withoutToken.post(
      'user/create-account',
      user,
    );

    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};
