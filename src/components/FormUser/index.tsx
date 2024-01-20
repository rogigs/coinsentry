import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Dialog from '@/components/Dialog';
import { useDialog } from '@/hooks/useDialog';
import { useState } from 'react';
import * as S from './styles';
import {
  DefaultValues,
  FormInputs,
  defaultValues,
  validationSchema,
} from './validationSchema';

import { IconsType } from '@/types';

type FormUser = {
  createAccount?: boolean;
  push: (pathName: string) => void;
  send: (user: FormInputs) => Promise<{ data: any[]; status: number }>;
};

export const FormUser = ({ createAccount, push, send }: FormUser) => {
  const [dialog, setDialog] = useState({
    title: '',
    icon: IconsType.success,
    message: '',
  });

  const { setShowDialog } = useDialog();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const { status } = await send(data);

      if (status === 204) {
        throw new Error('User not found');
      }

      reset();
      push('/home');
    } catch (error) {
      setDialog({
        title: 'Erro',
        icon: IconsType.error,
        message: createAccount
          ? 'Email ou senhas incorretos. Por favor, tente novamente.'
          : 'Não foi possível criar o usuário. Por favor, tente novamente.',
      });

      setShowDialog(true);
    }
  };

  return (
    <>
      <Dialog.Dialog>
        <Dialog.DialogTitle
          icon={IconsType[dialog.icon]}
          title={dialog.title}
        />
        <Dialog.DialogContent>
          <p>{dialog.message}</p>
        </Dialog.DialogContent>
        <Dialog.DialogActions
          primaryTxtButton="Fechar"
          primaryActionButton={() => setShowDialog(false)}
        />
      </Dialog.Dialog>
      <S.WrapperForm method="post" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="email"
          error={!!errors.email}
          helperText={errors.email?.message ?? ''}
          {...register(DefaultValues.email)}
        />

        <TextField
          label="senha"
          error={!!errors.password}
          type="password"
          helperText={errors.password?.message ?? ''}
          {...register(DefaultValues.password)}
        />

        {createAccount && (
          <Button variant="outlined" onClick={() => push('/create-account')}>
            Criar Conta
          </Button>
        )}

        <Button variant="contained" type="submit" loading={isSubmitting}>
          {createAccount ? 'Logar' : 'Cadastrar'}
        </Button>
      </S.WrapperForm>
    </>
  );
};
