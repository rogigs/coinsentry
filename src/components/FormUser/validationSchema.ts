import * as yup from 'yup';

export enum DefaultValues {
  email = 'email',
  password = 'password',
  keepLogged = 'keepLogged',
}

export const defaultValues = {
  [DefaultValues.email]: '',
  [DefaultValues.password]: '',
  [DefaultValues.keepLogged]: false,
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
    [DefaultValues.keepLogged]: yup.boolean().default(false),
  })
  .required();
