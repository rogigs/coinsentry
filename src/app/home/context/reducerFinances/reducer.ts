import { compareArraysOfObjects } from '@/helpers/toArrays';
import { Finance, FinanceDetails } from '@/services/coinSentry/finances';

import { isAxiosError } from 'axios';
import { Action, ACTIONS_TYPE } from './actions';

export type INITIAL_STATE_TYPE = {
  data: Finance[] | [];
  details: FinanceDetails | undefined;
  dataLenghtInDatabase: number;
  financeToUpdate: string | undefined;
};

export const INITIAL_STATE: INITIAL_STATE_TYPE = {
  data: [],
  details: undefined,
  dataLenghtInDatabase: 0,
  financeToUpdate: undefined,
};

const updateFinanceData = (state: INITIAL_STATE_TYPE, action: Action) => {
  if (isAxiosError(action.payload?.financeData))
    return action.payload?.financeData;
  if (action.payload?.cleanCache) return action.payload?.financeData?.data;

  return compareArraysOfObjects(
    state.data,
    action.payload?.financeData?.data,
    'id',
  );
};
export const reducer = (state: INITIAL_STATE_TYPE, action: Action) => {
  const actionsTypes = {
    [ACTIONS_TYPE.ADD_DATA]: {
      ...state,
      data: updateFinanceData(state, action),
      dataLenghtInDatabase: action.payload?.financeData?.dataLenghtInDatabase,
    },
    [ACTIONS_TYPE.ADD_DETAILS]: {
      ...state,
      details: action.payload,
    },
    [ACTIONS_TYPE.ADD_FINANCE_TO_UPDATE]: {
      ...state,
      financeToUpdate: action.payload,
    },
  };

  return actionsTypes[action.type];
};
