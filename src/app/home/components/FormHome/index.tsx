import React, { useEffect, useState } from 'react';
import {
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  RadioGroup,
  Radio,
  TextField,
  FormControl,
} from '@mui/material';
import Button from '@/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  validationSchema,
  defaultValues,
  DefaultValues,
  FormInputs,
} from './validationSchema';
import { useFinances } from '../../hooks/useFinances';
import * as S from './styles';
import { format } from 'date-fns';
import { useDialog } from '@/hooks/useDialog';
import { Finance, insertFinance } from '@/services/coinSentry/finances';
import Image from 'next/image';
import Logo from '../../../../assets/images/logo.png';
import dynamic from 'next/dynamic';
import { Icons } from '@/components/Dialog';
import TextFieldNumberFormat from '@/components/TextFieldNumberFormat';

const DialogHome = dynamic(() => import('../../DialogHome'));

// TODO: review type
type FinanceKeys = 'title' | 'operation' | 'category' | 'value_item';

const FormHome = () => {
  const [dialog, setDialog] = useState({
    title: '',
    icon: Icons.success,
    message: '',
  });

  const { fetchFinances, fetchFinancesDetails, state, updateFinance } =
    useFinances();
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
      console.log(
        '🚀 ~ constonSubmit:SubmitHandler<FormInputs>= ~ data:',
        data,
      );
      console.log(
        '🚀 ~ constonSubmit:SubmitHandler<FormInputs>= ~ state.financeToUpdate:',
        state.financeToUpdate,
      );

      if (state.financeToUpdate) {
        await updateFinance({
          id: state.financeToUpdate,
          finance: {
            ...data,
            value_item: Number(data.value_item.replace(/\D/g, '')),
          },
        });

        setDialog({
          title: 'Sucesso',
          icon: Icons.success,
          message: 'Um item das suas finanças foi atualizado com sucesso!.',
        });
      } else {
        const dateToday = new Date();
        const dateFormatted = format(dateToday, 'dd-MM-yyyy');

        const finance = {
          ...data,
          value_item: Number(data.value_item.replace(/\D/g, '')),
          date_input: dateFormatted, // TODO: remove this when implemented in backend
        } as Finance;

        // TODO: put this in the context
        await insertFinance({ finance });

        setDialog({
          title: 'Sucesso',
          icon: Icons.success,
          message: 'Um item das suas finanças foi cadastrado com sucesso!.',
        });

        await Promise.all([
          fetchFinances({ page: 0, pageSize: 10 }),
          fetchFinancesDetails(),
        ]);
      }

      setShowDialog(true);

      reset();
    } catch (error) {
      setDialog({
        title: 'Erro',
        icon: Icons.error,
        message: 'Um item das suas finanças teve problema ao ser cadastrado!.',
      });
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  };

  return (
    <>
      <DialogHome {...dialog}>
        <p>{dialog.message}</p>
      </DialogHome>
      <S.WrapperSectionForm>
        <S.WrapperForm method="post" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Título"
            error={!!errors.title}
            helperText={errors.title?.message ?? ''}
            {...register(DefaultValues.title)}
          />

          <FormControl fullWidth>
            <InputLabel id="teste">Categoria</InputLabel>
            <Select
              labelId="teste"
              label="Categoria"
              title="category"
              {...register(DefaultValues.category)}
              sx={{
                maxWidth: '100x',
              }}
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
              onChange={(e) =>
                setValue(DefaultValues.operation, e.target.value)
              } // register doesn't work in radio group
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
