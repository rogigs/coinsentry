import Cookies from 'js-cookie';

import HttpConfig from '../../httpConfig';

type User = {
  email: string;
  password: string;
};

export const getUser = async (user: User) => {
  try {
    const { data, headers } = await HttpConfig.withoutToken.post(
      `user/auth`,
      user,
    );

    Cookies.set('accessToken', headers.authorization, {
      secure: true,
    });

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
