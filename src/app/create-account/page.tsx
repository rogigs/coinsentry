'use client';

import { FormUser } from '@/components/FormUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import * as S from './styles';

export default function CreateAccount() {
  const router = useRouter();
  useEffect(() => {
    // push('/home');
  }, []);

  return (
    <S.WrapperSectionForm>
      <FormUser push={router.push} />
    </S.WrapperSectionForm>
  );
}
