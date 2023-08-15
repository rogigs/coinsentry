import * as yup from 'yup';

export const validationSchema = yup
  .object({
    title: yup.string().required('Preencha o campo Título'),
    value_item: yup.string().required('Preencha o campo Valor'),
  })
  .required();
