import { Pagination } from '@/types';

import { sanitize } from '@/helpers/sanitize';
import HttpConfig from '../../httpConfig';
import { mockGetFinances, mockGetFinancesDetails } from './mocks';

export type FinanceDetails = typeof mockGetFinancesDetails.data;
export type Finance = (typeof mockGetFinances.data)[0];

export const getFinances = async ({ page, pageSize }: Pagination) => {
  try {
    if (typeof page !== 'number' || typeof pageSize !== 'number') {
      throw new Error('page and pageSize must be numbers');
    }

    const { data } = await HttpConfig.withToken.get(
      `finances?page=${page}&pageSize=${pageSize}`,
    );

    return { data: data.data, dataLengthInDatabase: data.length };
  } catch (error) {
    return error;
  }
};

export const getFinancesDetails = async () => {
  try {
    const { data } = await HttpConfig.withToken.get('finances/details');

    console.log('Cookies enviados com a requisição:', document.cookie);

    return data.data;
  } catch (error) {
    return error;
  }
};

export const insertFinance = async (finance: Omit<Finance, 'id'>) => {
  try {
    const { data } = await HttpConfig.withToken.post('finances', finance);

    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};

export const deleteFinance = async (id: Pick<Finance, 'id'>) => {
  try {
    const { data } = await HttpConfig.withToken.delete(
      `finances/${sanitize(id)}`,
    );

    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};

export const updateFinance = async (
  id: Pick<Finance, 'id'>,
  finance: Omit<Finance, 'id'>, // should a object
) => {
  try {
    const { data } = await HttpConfig.withToken.put(
      `finances/${sanitize(id)}`,
      finance,
    );

    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};

export const getFinanceById = async (id: Pick<Finance, 'id'>) => {
  try {
    const { data } = await HttpConfig.withToken.get(`finances/${sanitize(id)}`);

    return data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:12 ~ authLogin ~ error:', error);
  }
};
