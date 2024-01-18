import { createUser, getUser } from '@/services/coinSentry/login';

export const useLogin = () => ({ createUser, getUser });
