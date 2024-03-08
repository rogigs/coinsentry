import Cookies from 'js-cookie';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const protectPage = (
  push: (href: string, options?: NavigateOptions | undefined) => void,
) => {
  const accessToken = Cookies.get('accessToken');

  if (!accessToken) {
    push('/');
  }
};
