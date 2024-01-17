import { Finance, FinanceDetails } from '@/services/coinSentry/finances';

import { ACTIONS_TYPE, Action } from './actions';
import { compareArraysOfObjects } from '@/helpers/toArrays';

export type INITIAL_STATE_TYPE = {
  data: Finance[] | [];
  details: FinanceDetails | undefined;
  dataLenghtInDatabase: number;
};

export const INITIAL_STATE: INITIAL_STATE_TYPE = {
  data: [],
  details: undefined,
  dataLenghtInDatabase: 0,
};

export const reducer = (state: INITIAL_STATE_TYPE, action: Action) => {
  const actionsTypes = {
    [ACTIONS_TYPE.ADD_DATA]: {
      ...state,
      data: compareArraysOfObjects(state.data, action.payload.data, 'id'),
      dataLenghtInDatabase: action.payload.dataLenghtInDatabase,
    },
    [ACTIONS_TYPE.ADD_DETAILS]: {
      ...state,
      details: action.payload,
    },
  };

  return actionsTypes[action.type];
};
