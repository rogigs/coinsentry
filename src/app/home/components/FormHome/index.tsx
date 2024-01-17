import React from 'react';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { insertItem } from '@/services/coinSentry/finances';
import Image from 'next/image';
import Logo from '../../../../assets/images/logo.png';

const FormHome = () => {
  const { fetchFinances, fetchFinancesDetails } = useFinances();
  const { setShowDialog } = useDialog();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormInputs>({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const dateToday = new Date();
      const dateFormatted = format(dateToday, 'dd-MM-yyyy');

      const objItem = {
        ...data,
        value_item: data.value_item.replace(/\D/g, ''),
        date_input: dateFormatted,
      };

      await insertItem(objItem);

      setShowDialog(true);

      await Promise.all([fetchFinances(), fetchFinancesDetails()]);

      reset();
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  };

  return (
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
          sx={{
            width: '100%',
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
        <S.FormControlRadio>
          <FormLabel id="demo-radio-buttons-group-label">Operação:</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            row
            defaultValue={defaultValues.operation}
            onChange={(e) => setValue(DefaultValues.operation, e.target.value)} // register doesn't work in radio group
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
      <S.WrapperLogo>
        <Image src={Logo} alt="logo" className="logo" />
      </S.WrapperLogo>
    </S.WrapperSectionForm>
  );
};

export default FormHome;
