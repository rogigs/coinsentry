import HttpConfig from '../../httpConfig';

type User = {
  email: string;
  password: string;
};

export const getUser = async (user: User) => {
  try {
    const { data } = await HttpConfig.withoutToken.get(
      `user/me?email=${user.email}&&password=${user.password}`,
    );

    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};

export const createUser = async (user: User) => {
  console.log('🚀 ~ createUser ~ user:', user);
  try {
    const { data } = await HttpConfig.withoutToken.post('user/me', user);

    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};
