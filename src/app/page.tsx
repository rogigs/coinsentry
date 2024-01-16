'use client';

import { FormUser } from '@/components/FormUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import * as S from './styles';
import { useLogin } from '@/hooks/useLogin';

export default function Home() {
  const router = useRouter();
  const { getUser } = useLogin();

  return (
    <main>
      <S.WrapperSectionForm>
        <FormUser createAccount push={router.push} send={getUser} />
      </S.WrapperSectionForm>
    </main>
  );
}
