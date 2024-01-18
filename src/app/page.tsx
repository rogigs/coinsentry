'use client';

import { useRouter } from 'next/navigation';

import { FormUser } from '@/components/FormUser';
import { Login } from '@/components/Login';
import { useLogin } from '@/hooks/useLogin';

export default function Home() {
  const router = useRouter();
  const { getUser } = useLogin();

  return (
    <Login>
      <FormUser createAccount push={router.push} send={getUser} />
    </Login>
  );
}
