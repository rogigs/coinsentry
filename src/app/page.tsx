'use client';

import { useRouter } from 'next/navigation';

import { FormUser } from '@/components/FormUser';
import Login from '@/components/Login';
import { DialogProvider } from '@/context/dialogContext';
import { useLogin } from '@/hooks/useLogin';

export default function Home() {
  const router = useRouter();
  const { authLogin } = useLogin();

  return (
    <DialogProvider>
      <Login>
        <FormUser createAccount push={router.push} send={authLogin} />
      </Login>
    </DialogProvider>
  );
}
