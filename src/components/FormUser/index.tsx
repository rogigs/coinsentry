import { Button, TextField } from '@mui/material';
import * as S from './styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  DefaultValues,
  FormInputs,
  defaultValues,
  validationSchema,
} from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

type FormUser = {
  createAccount?: boolean;
  push: (pathName: string) => void;
};

export const FormUser = ({ createAccount, push }: FormUser) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      reset();

      push('/home');
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  };

  return (
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

      <Button variant="contained" type="submit">
        Cadastrar
      </Button>
    </S.WrapperForm>
  );
};
