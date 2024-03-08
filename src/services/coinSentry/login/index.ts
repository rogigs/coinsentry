import { Response } from '@/types';
import { AxiosResponseHeaders } from 'axios';
import HttpConfig from '../../httpConfig';

export type User = {
  email: string;
  password: string;
};

export const authUser = async (user: User): Promise<Response<any>> => {
  // TODO: observability errors
  try {
    const { data, headers } = await HttpConfig.withoutToken.post(
      `user/auth`,
      user,
    );

    return { data, headers: headers as AxiosResponseHeaders };
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
    throw error;
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

export const refreshToken = async (user: User): Promise<Response<any>> => {
  // TODO: add observability errors
  try {
    const { data, headers } = await HttpConfig.withoutToken.post(
      `user/auth`,
      user,
    );

    return { data, headers: headers as AxiosResponseHeaders };
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
    throw error;
  }
};
