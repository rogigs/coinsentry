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
import { IconsOptions, IconsType, Pagination } from '@/types';

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
  dispatch: React.Dispatch<Action<any>>;
  fetchFinances: (pagination: Pagination) => () => Promise<void>;
  fetchFinancesDetails: () => Promise<void>;
  updateFinance: (
    id: Pick<Finance, 'id'>,
    finance: Omit<Finance, 'id'>,
  ) => Promise<void>;
  insertFinance: (finance: Omit<Finance, 'id'>) => Promise<void>;
  deleteFinances: (
    idItems: (string | Object)[],
    setDialog: Dispatch<
      SetStateAction<{
        title: string;
        icon: IconsOptions;
        message: string;
      }>
    >,
  ) => Promise<void>;
};

export const FinancesContext = createContext<FinancesContext | null>(null);

export const FinancesProvider = ({ children }: FinancesProvider) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const fetchFinances = useCallback(
    (pagination: Pagination) =>
      async (cleanCache = false) => {
        try {
          const financeData = await getFinances(pagination);

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
        const financeUpdated = await putFinance(id, finance);

        dispatch({
          type: ACTIONS_TYPE.UPDATE_FINANCE,
          payload: financeUpdated.data,
        });
      } catch (error) {
        console.error('Erro ao atualizar finances:', error);
      }
    },
    [],
  );

  const insertFinance = useCallback(async (finance: Omit<Finance, 'id'>) => {
    try {
      const newFinance = await postFinance(finance);

      await fetchFinancesDetails();

      dispatch({
        type: ACTIONS_TYPE.ADD_ONE_DATA,
        payload: newFinance.data,
      });
    } catch (error) {
      console.error('Erro ao atualizar finances:', error);
    }
  }, []);

  const deleteFinances = useCallback(
    async (
      idItems: (string | Object)[],
      setDialog: Dispatch<
        SetStateAction<{
          title: string;
          icon: IconsOptions;
          message: string;
        }>
      >,
    ) => {
      try {
        const deletePromises = idItems.map((item) =>
          delFinance(item as unknown as Pick<Finance, 'id'>),
        );

        await Promise.all(deletePromises);

        setDialog({
          title: 'Sucesso',
          icon: IconsType.success,
          message: 'Seu(s) item(s) das suas finanças foram excluídos!',
        });

        dispatch({
          type: ACTIONS_TYPE.DELETE_FINANCES,
          payload: idItems,
        });
      } catch (error) {
        console.error('Erro ao deletar finances:', error);

        setDialog({
          title: 'Erro',
          icon: IconsType.error,
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
