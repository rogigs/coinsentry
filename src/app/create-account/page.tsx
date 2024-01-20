'use client';

import { useRouter } from 'next/navigation';

import { FormUser } from '@/components/FormUser';
import { Login } from '@/components/Login';
import { DialogProvider } from '@/context/dialogContext';
import { useLogin } from '@/hooks/useLogin';

export default function CreateAccount() {
  const router = useRouter();
  const { createUser } = useLogin();

  return (
    <DialogProvider>
      <Login>
        <FormUser push={router.push} send={createUser} />
      </Login>
    </DialogProvider>
  );
}
