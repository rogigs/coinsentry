'use client';

import { FormUser } from '@/components/FormUser';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/useLogin';
import { Login } from '@/components/Login';

export default function Home() {
  const router = useRouter();
  const { getUser } = useLogin();

  return (
    <Login>
      <FormUser createAccount push={router.push} send={getUser} />
    </Login>
  );
}
