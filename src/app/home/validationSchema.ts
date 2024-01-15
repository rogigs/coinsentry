import * as yup from 'yup';

export const defaultValues = {
  title: '',
  operation: 'entrada',
  category: 'None',
  value_item: '',
};

export const validationSchema = yup
  .object({
    title: yup.string().required('Preencha o campo Título'),
    value_item: yup.string().required('Preencha o campo Valor'),
  })
  .required();
