import { createUser, getUser } from '@/services/coinSentry/login';

export const useLogin = () => {
  return { createUser, getUser };
};
