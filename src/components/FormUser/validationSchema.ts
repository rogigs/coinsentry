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

// TODO: add validation email
export const validationSchema = yup
  .object({
    [DefaultValues.email]: yup.string().required('Preencha o campo email'),
    [DefaultValues.password]: yup.string().required('Preencha o campo senha'),
  })
  .required();
