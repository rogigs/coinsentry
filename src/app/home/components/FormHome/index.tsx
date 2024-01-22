import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material'; // TODO: create componentes
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/Button';
import TextFieldNumberFormat from '@/components/TextFieldNumberFormat';
import { useDialog } from '@/hooks/useDialog';
import { Finance } from '@/services/coinSentry/finances';

import { IconsType } from '@/types';
import Logo from '../../../../assets/images/logo.png';
import { useFinances } from '../../hooks/useFinances';
import * as S from './styles';
import {
  DefaultValues,
  defaultValues,
  FormInputs,
  validationSchema,
} from './validationSchema';

const DialogHome = dynamic(() => import('../../DialogHome'));

type FinanceKeys = (typeof DefaultValues)[keyof typeof DefaultValues];

const FormHome = () => {
  const [dialog, setDialog] = useState(() => ({
    title: '',
    icon: IconsType.success,
    message: '',
  }));

  const { state, updateFinance, insertFinance } = useFinances();
  const { setShowDialog } = useDialog();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    control,
  } = useForm<FormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (state.financeToUpdate) {
      const finance = state.data.find(
        (item: Finance) => item.id === state.financeToUpdate,
      );

      Object.keys(finance as Finance).forEach((key) => {
        if (key !== 'id') {
          const financeKey = key as FinanceKeys;

          setValue(financeKey, finance?.[financeKey] as string | undefined);
        }
      });
    }
  }, [state.financeToUpdate]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      if (state.financeToUpdate) {
        await updateFinance(
          state.financeToUpdate as unknown as Pick<Finance, 'id'>,
          {
            ...data,
            value_item: Number(data.value_item.replace(/\D/g, '')),
          } as unknown as Omit<Finance, 'id'>,
        );

        setDialog({
          title: 'Sucesso',
          icon: IconsType.success,
          message: 'Um item das suas finanças foi atualizado com sucesso!',
        });

        reset();

        return;
      }

      const dateToday = new Date();
      const dateFormatted = format(dateToday, 'dd-MM-yyyy');

      await insertFinance({
        ...data,
        value_item: Number(data.value_item.replace(/\D/g, '')),
        date_input: dateFormatted,
      } as unknown as Omit<Finance, 'id'>);

      setDialog({
        title: 'Sucesso',
        icon: IconsType.success,
        message: 'Um item das suas finanças foi cadastrado com sucesso!',
      });

      reset();
    } catch (error) {
      setDialog({
        title: 'Erro',
        icon: IconsType.error,
        message: 'Um item das suas finanças teve problema ao ser cadastrado!',
      });
    } finally {
      setShowDialog(true);
    }
  };

  return (
    <>
      <DialogHome {...dialog}>
        <p>{dialog.message}</p>
      </DialogHome>
      <S.WrapperSectionForm>
        <S.WrapperForm method="post" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={DefaultValues.title}
            control={control}
            render={({ field }) => (
              <TextField
                label="Título"
                error={!!errors.title}
                helperText={errors.title?.message ?? ''}
                {...field}
              />
            )}
          />
          <FormControl fullWidth>
            <InputLabel id="teste">Categoria</InputLabel>
            {/* TODO: resolve problem https://github.com/mui/material-ui/issues/24453 */}
            <Select
              labelId="teste"
              label="Categoria"
              title="category"
              defaultValue={defaultValues[DefaultValues.category]} // it's show defaultValue to user, register put just in object data
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
          </FormControl>

          <Controller
            name={DefaultValues.valueItem}
            control={control}
            render={({ field }) => (
              <TextFieldNumberFormat
                label="Valor(R$)"
                error={!!errors?.value_item}
                helperText={errors?.value_item?.message}
                {...field}
              />
            )}
          />

          <S.FormControlRadio>
            <FormLabel id="demo-radio-buttons-group-label">Operação:</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              row
              defaultValue={defaultValues.operation}
              onChange={
                (e) => setValue(DefaultValues.operation, e.target.value) // register doesn't work in radio group
              }
            >
              <S.FormControlLabel
                value="entrada"
                control={<Radio />}
                label="Entrada"
              />
              <S.FormControlLabel
                value="saida"
                control={<Radio />}
                label="Saída"
              />
            </RadioGroup>
          </S.FormControlRadio>
          <Button variant="outlined" onClick={() => reset()}>
            Limpar
          </Button>
          <Button variant="contained" type="submit" loading={isSubmitting}>
            Cadastrar
          </Button>
        </S.WrapperForm>
        <S.WrapperLogo>
          <Image src={Logo} alt="logo" className="logo" />
        </S.WrapperLogo>
      </S.WrapperSectionForm>
    </>
  );
};

export default FormHome;
