import Cookies from 'js-cookie';

export const protectPage = (push) => {
  const accessToken = Cookies.get('accessToken');

  if (!accessToken) {
    push('/');
  }
};
