'use client';

import { FormUser } from '@/components/FormUser';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/useLogin';
import { Login } from '@/components/Login';

export default function CreateAccount() {
  const router = useRouter();
  const { createUser } = useLogin();

  return (
    <Login>
      <FormUser push={router.push} send={createUser} />
    </Login>
  );
}
