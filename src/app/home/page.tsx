'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Player } from '@lottiefiles/react-lottie-player';
import * as S from './styles';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  validationSchema,
  defaultValues,
  DefaultValues,
  FormInputs,
} from './validationSchema';
import {
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  RadioGroup,
  Radio,
  Button,
  TextField,
} from '@mui/material';
import ResumeFinances from './components/ResumeFinances';
import { useFinances } from './hooks/useFinances';
import { useEffect } from 'react';

import { DialogProvider } from '@/context/dialogContext';
import { DialogHome } from './DialogHome';

export default function Home() {
  const { historic, historicDetails, fetchHistoric } = useFinances();
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

  useEffect(() => {
    fetchHistoric();
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      console.log('🚀 ~ onSubmit ~ data:', data);

      fetchHistoric();

      reset();
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  };

  return (
    <>
      <DialogProvider>
        <DialogHome />
      </DialogProvider>
      <S.Wrapper>
        <S.WrapperSectionForm>
          <S.WrapperForm method="post" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Título"
              error={!!errors.title}
              helperText={errors.title?.message ?? ''}
              {...register(DefaultValues.title)}
            />

            <InputLabel>Categoria</InputLabel>
            <Select
              label="Categoria"
              title="category"
              defaultValue={defaultValues.category}
              {...register(DefaultValues.category)}
            >
              <MenuItem value="None">
                <em>None</em>
              </MenuItem>
              <MenuItem value="educacao">Educação</MenuItem>
              <MenuItem value="lazer">Lazer</MenuItem>
              <MenuItem value="saude">Saúde</MenuItem>
              <MenuItem value="saude">Trabalho</MenuItem>
            </Select>
            {/* TODO: Have problems */}
            <S.FormControlRadio>
              <FormLabel id="demo-radio-buttons-group-label">
                Operação:
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                row
                defaultValue={defaultValues.operation}
                {...register(DefaultValues.operation)}
              >
                <S.FormControlLabel
                  value="entrada"
                  control={<Radio />}
                  label="Entrada"
                />
                <S.FormControlLabel
                  value="saída"
                  control={<Radio />}
                  label="Saída"
                />
              </RadioGroup>
            </S.FormControlRadio>
            <TextField
              label="Valor"
              error={!!errors.value_item}
              helperText={errors.value_item?.message ?? ''}
              {...register(DefaultValues.valueItem)}
            />

            <Button variant="outlined" onClick={() => reset()}>
              Limpar
            </Button>
            <Button variant="contained" type="submit">
              Cadastrar
            </Button>
          </S.WrapperForm>
          <Player
            src="https://lottie.host/9e26f999-7f63-4871-b6b8-91bb63f502e7/KdKBd17XAo.json"
            className="player"
            loop
            autoplay
          />
        </S.WrapperSectionForm>

        <ResumeFinances
          details={historicDetails}
          fetchDetails={fetchHistoric}
        />
      </S.Wrapper>
    </>
  );
}
