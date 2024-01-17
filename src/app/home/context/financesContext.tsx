import {
  getFinances,
  getFinancesDetails,
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
  fetchFinances: () => Promise<void>; // TODO: review this type
  fetchFinancesDetails: () => Promise<void>; // TODO: review this type
};

export const FinancesContext = createContext<FinancesContext | null>(null);

export const FinancesProvider = ({ children }: FinancesProvider) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const fetchFinances = useCallback(async () => {
    try {
      const financeData = await getFinances();

      dispatch({
        type: ACTIONS_TYPE.ADD_DATA,
        payload: financeData,
      });
    } catch (error) {
      console.error('Erro ao buscar finanças:', error);
    }
  }, []);

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

  return (
    <FinancesContext.Provider
      value={{ state, dispatch, fetchFinances, fetchFinancesDetails }}
    >
      {children}
    </FinancesContext.Provider>
  );
};
