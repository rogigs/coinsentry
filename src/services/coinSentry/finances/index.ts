import HttpConfig from '../../httpConfig';
import { mockGetFinances, mockGetFinancesDetails } from './mocks';
import { Pagination } from '@/types';

export type FinanceDetails = typeof mockGetFinancesDetails.data;
export type Finance = (typeof mockGetFinances.data)[0];

// Omit<(typeof mockGetFinances.data)[0], 'id'>;

type Model = {
  id: string;
};

type FinanceObj = {
  finance: Finance;
};

export const getFinances = async ({ page, pageSize }: Pagination) => {
  try {
    const { data } = await HttpConfig.withToken.get(
      `finances?page=${page}&pageSize=${pageSize}`,
    );

    return { data: data.data, dataLenghtInDatabase: data.length };
  } catch (error) {
    return error;
  }
};

export const getFinancesDetails = async () => {
  try {
    const { data } = await HttpConfig.withToken.get('finances/details');

    return data.data;
  } catch (error) {
    return error;
  }
};

export const insertFinance = async ({ finance }: FinanceObj) => {
  try {
    const { data } = await HttpConfig.withToken.post('finances', finance);

    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};

export const deleteFinance = async ({ id }: Model) => {
  try {
    const { data } = await HttpConfig.withToken.delete(`finances/${id}`);

    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};

export const updateFinance = async ({ id, finance }: Model & FinanceObj) => {
  try {
    const { data } = await HttpConfig.withToken.put(`finances/${id}`, finance);

    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};

export const getFinanceById = async ({ id }: Model) => {
  try {
    const { data } = await HttpConfig.withToken.get(`finances/${id}`);

    console.log('🚀 ~ file: index.js:61 ~ selectOneItem ~ data:', data);
    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};
