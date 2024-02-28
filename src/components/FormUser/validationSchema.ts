import * as yup from 'yup';

export enum DefaultValues {
  email = 'email',
  password = 'password',
}

export const defaultValues = {
  [DefaultValues.email]: '',
  [DefaultValues.password]: '',
};

export type FormInputs = typeof defaultValues;

export const validationSchema = yup
  .object({
    [DefaultValues.email]: yup
      .string()
      .trim()
      .email('Digite um email válido')
      .required('Preencha o campo email'),
    [DefaultValues.password]: yup
      .string()
      .trim()
      .required('Preencha o campo senha'),
  })
  .required();
