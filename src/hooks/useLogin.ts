import { User, authUser, createUser } from '@/services/coinSentry/login';
import Cookies from 'js-cookie';

export const useLogin = () => {
  const authLogin = async (user: User) => {
    const { data, headers } = await authUser(user);

    const accessToken = Cookies.get('accessToken');
    const keepLogged = localStorage.getItem('keepLogged');

    if (keepLogged && !accessToken) {
      const expirationDate = new Date();

      Cookies.set('accessToken', headers.authorization, {
        secure: true,
        expires: expirationDate.setFullYear(expirationDate.getFullYear() + 1),
      });
    } else {
      console.log('HIRE MAN');

      Cookies.set('accessToken', headers.authorization, {
        secure: true,
      });
    }

    return data;
  };

  return {
    createUser,
    authLogin,
  };
};
