import {
  getFinances,
  getFinancesDetails,
  updateFinance as putFinance,
} from '@/services/coinSentry/finances';
import React, { createContext, useReducer, useCallback } from 'react';
import { ACTIONS_TYPE } from './reducerFinances/actions';
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
  dispatch: React.Dispatch<React.SetStateAction<any>>;
  fetchFinances: (pagination: Pagination) => () => Promise<void>; // TODO: review this type
  fetchFinancesDetails: () => Promise<void>; // TODO: review this type
};

// TODO: resolve problems of types
export const FinancesContext = createContext<FinancesContext | null>(null);

export const FinancesProvider = ({ children }: FinancesProvider) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const fetchFinances = useCallback(
    (pagination: Pagination) => async () => {
      try {
        const financeData = await getFinances(pagination);

        dispatch({
          type: ACTIONS_TYPE.ADD_DATA,
          payload: financeData,
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

  const updateFinance = useCallback(async ({ id, finance }) => {
    try {
      await putFinance({ id, finance });

      dispatch({
        type: ACTIONS_TYPE.ADD_FINANCE_TO_UPDATE,
        payload: undefined,
      });
    } catch (error) {
      console.error('Erro ao atualizar finances:', error);
    }
  }, []);

  return (
    <FinancesContext.Provider
      value={{
        state,
        dispatch,
        fetchFinances,
        fetchFinancesDetails,
        updateFinance,
      }}
    >
      {children}
    </FinancesContext.Provider>
  );
};
