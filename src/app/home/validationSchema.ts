import * as yup from 'yup';

export enum DefaultValues {
  title = 'title',
  operation = 'operation',
  category = 'category',
  valueItem = 'value_item',
}

export const defaultValues = {
  [DefaultValues.title]: '',
  [DefaultValues.operation]: 'entrada',
  [DefaultValues.category]: 'None',
  [DefaultValues.valueItem]: '',
};

export type FormInputs = {
  title: string;
  operation?: string;
  category?: string;
  value_item: string;
};

export const validationSchema = yup
  .object({
    [DefaultValues.title]: yup.string().required('Preencha o campo Título'),
    [DefaultValues.valueItem]: yup.string().required('Preencha o campo Valor'),
  })
  .required();
