import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useReducer,
} from 'react';

import {
  deleteFinance as delFinance,
  Finance,
  getFinances,
  getFinancesDetails,
  insertFinance as postFinance,
  updateFinance as putFinance,
} from '@/services/coinSentry/finances';
import { Pagination } from '@/types';

import { Icons } from '@/components/Dialog';
import { Action, ACTIONS_TYPE } from './reducerFinances/actions';
import {
  INITIAL_STATE,
  INITIAL_STATE_TYPE,
  reducer,
} from './reducerFinances/reducer';

type FinancesProvider = {
  children?: React.ReactNode;
};

type FinancesContext = {
  state: INITIAL_STATE_TYPE;
  dispatch: React.Dispatch<React.SetStateAction<Action>>;
  fetchFinances: (pagination: Pagination) => () => Promise<void>;
  fetchFinancesDetails: () => Promise<void>;
  updateFinance: (
    id: Pick<Finance, 'id'>,
    finance: Omit<Finance, 'id'>,
  ) => Promise<void>;
  insertFinance: (finance: Omit<Finance, 'id'>) => Promise<void>;
  deleteFinances: (
    idItems: string[],
    setDialog: Dispatch<
      SetStateAction<{
        title: string;
        icon: Icons;
        message: string;
      }>
    >,
  ) => Promise<void>;
};

export const FinancesContext = createContext<FinancesContext | null>(null);

export const FinancesProvider = ({ children }: FinancesProvider) => {
  // TODO: resolve problems of types
  const [state, dispatch]: [
    INITIAL_STATE_TYPE,
    React.Dispatch<React.SetStateAction<Action>>,
  ] = useReducer(reducer as any, INITIAL_STATE as any) as unknown as any;

  console.log('🚀 ~ FinancesProvider ~ state:', state.data);

  const fetchFinances = useCallback(
    (pagination: Pagination) =>
      async (cleanCache = false) => {
        try {
          const financeData = await getFinances(pagination);
          console.log('🚀 ~ financeData:', financeData);

          dispatch({
            type: ACTIONS_TYPE.ADD_DATA,
            payload: {
              financeData,
              cleanCache,
            },
          });
        } catch (error) {
          console.error('Erro ao buscar finanças:', error);
        }
      },
    [],
  );

  const fetchFinancesDetails = useCallback(async () => {
    try {
      const financeDetailsData = await getFinancesDetails();

      dispatch({
        type: ACTIONS_TYPE.ADD_DETAILS,
        payload: financeDetailsData,
      });
    } catch (error) {
      console.error('Erro ao buscar details:', error);
    }
  }, []);

  const updateFinance = useCallback(
    async (id: Pick<Finance, 'id'>, finance: Omit<Finance, 'id'>) => {
      try {
        await putFinance(id, finance);

        dispatch({
          type: ACTIONS_TYPE.ADD_FINANCE_TO_UPDATE,
          payload: undefined,
        });
      } catch (error) {
        console.error('Erro ao atualizar finances:', error);
      }
    },
    [],
  );

  const insertFinance = useCallback(async (finance: Omit<Finance, 'id'>) => {
    try {
      await postFinance(finance);

      if (state.data.length < 10) {
        await Promise.all([
          fetchFinances({ page: 0, pageSize: 10 }),
          fetchFinancesDetails(),
        ]);
      }
    } catch (error) {
      console.error('Erro ao atualizar finances:', error);
    }
  }, []);

  const deleteFinances = useCallback(
    async (
      idItems: string[],
      setDialog: Dispatch<
        SetStateAction<{
          title: string;
          icon: Icons;
          message: string;
        }>
      >,
    ) => {
      try {
        const deletePromises = idItems.map((item) =>
          delFinance(item as unknown as Pick<Finance, 'id'>),
        );

        await Promise.all(deletePromises);

        // TODO: UPDATE TABLE
        setDialog({
          title: 'Sucesso',
          icon: Icons.success,
          message: 'Seu(s) item(s) das suas finanças foram excluídos!',
        });
      } catch (error) {
        console.error('Erro ao deletar finances:', error);

        setDialog({
          title: 'Erro',
          icon: Icons.error,
          message: 'Não foi possivel excluir seu(s) item(s) das suas finanças!',
        });
      }
    },
    [],
  );

  return (
    <FinancesContext.Provider
      value={{
        state,
        dispatch,
        fetchFinances,
        fetchFinancesDetails,
        updateFinance,
        insertFinance,
        deleteFinances,
      }}
    >
      {children}
    </FinancesContext.Provider>
  );
};
