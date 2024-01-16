'use client';

import { FormUser } from '@/components/FormUser';
import { useRouter } from 'next/navigation';
import * as S from './styles';
import { useLogin } from '@/hooks/useLogin';

export default function CreateAccount() {
  const router = useRouter();
  const { createUser } = useLogin();

  return (
    <S.WrapperSectionForm>
      <FormUser push={router.push} send={createUser} />
    </S.WrapperSectionForm>
  );
}
