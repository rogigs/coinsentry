import { User, authUser, createUser } from '@/services/coinSentry/login';
import Cookies from 'js-cookie';

export const useLogin = () => {
  const authLogin = async (user: User) => {
    // TODO: review this type
    const { data, headers }: any = await authUser(user);

    // TODO: add route verify if user logged
    Cookies.set('accessToken', headers.authorization, {
      secure: true,
    });

    return data;
  };

  return {
    createUser,
    authLogin,
  };
};
