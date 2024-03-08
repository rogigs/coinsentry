import { compareArraysOfObjects } from '@/helpers/toArrays';
import { Finance, FinanceDetails } from '@/services/coinSentry/finances';

import { isAxiosError } from 'axios';
import { Action, ACTIONS_TYPE } from './actions';

export type INITIAL_STATE_TYPE = {
  data: Finance[] | [];
  details: FinanceDetails | undefined;
  dataLengthInDatabase: number;
  financeToUpdate: string | undefined;
};

export const INITIAL_STATE: INITIAL_STATE_TYPE = {
  data: [],
  details: undefined,
  dataLengthInDatabase: 0,
  financeToUpdate: undefined,
};

const updateFinanceData = (state: INITIAL_STATE_TYPE, action: Action<any>) => {
  if (isAxiosError(action.payload?.financeData))
    return action.payload?.financeData;
  if (action.payload?.cleanCache) return action.payload?.financeData?.data;

  return compareArraysOfObjects(
    state.data,
    action.payload?.financeData?.data,
    'id',
  );
};

const updateOneFinance = (state: INITIAL_STATE_TYPE, payload: Finance) => {
  const indexToModify = state.data.findIndex(
    (finance) => finance.id === payload.id,
  );

  const newArray = [...state.data];

  if (indexToModify !== -1) {
    newArray[indexToModify] = { ...newArray[indexToModify], ...payload };
  }

  return newArray;
};

const deleteFinances = (state: INITIAL_STATE_TYPE, payload: string[]) => {
  return state.data.filter((finance) => {
    if (payload.some((item) => item === finance.id)) {
      return false;
    }

    return true;
  });
};

const addNewData = (state: INITIAL_STATE_TYPE, payload: Finance) => {
  const newArray = [...state.data];

  newArray.push(payload);

  return newArray;
};

type Reducer<T> = (state: T, action: Action<any>) => T;

export const reducer: Reducer<INITIAL_STATE_TYPE> = (state, action) => {
  if (!action.type) {
    throw Error('Unknown action.');
  } else if (action.type === ACTIONS_TYPE.ADD_DATA) {
    return {
      ...state,
      data: updateFinanceData(state, action),
      dataLengthInDatabase: action.payload.financeData.dataLengthInDatabase,
    };
  } else if (action.type === ACTIONS_TYPE.ADD_DETAILS) {
    return {
      ...state,
      details: action.payload,
    };
  } else if (action.type === ACTIONS_TYPE.ADD_FINANCE_TO_UPDATE) {
    return {
      ...state,
      financeToUpdate: action.payload,
    };
  } else if (action.type === ACTIONS_TYPE.UPDATE_FINANCE) {
    return {
      ...state,
      financeToUpdate: undefined,
      data: updateOneFinance(state, action.payload),
    };
  } else if (action.type === ACTIONS_TYPE.DELETE_FINANCES) {
    return {
      ...state,
      data: deleteFinances(state, action.payload),
    };
  } else if (action.type === ACTIONS_TYPE.ADD_ONE_DATA) {
    return {
      ...state,
      data: addNewData(state, action.payload),
    };
  }

  throw Error('Incorrect action.');
};
