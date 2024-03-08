import { User, authUser, createUser } from '@/services/coinSentry/login';
import Cookies from 'js-cookie';

export const useLogin = () => {
  const authLogin = async (user: User) => {
    const { data, headers } = await authUser(user);

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
