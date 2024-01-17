import { Finance, FinanceDetails } from '@/services/coinSentry/finances';

import { ACTIONS_TYPE, Action } from './actions';

export type INITIAL_STATE_TYPE = {
  data: Finance | [];
  details: FinanceDetails | undefined;
};

export const INITIAL_STATE: INITIAL_STATE_TYPE = {
  data: [],
  details: undefined,
};

export const reducer = (state: INITIAL_STATE_TYPE, action: Action) => {
  const actionsTypes = {
    [ACTIONS_TYPE.ADD_DATA]: {
      ...state,
      data: action.payload,
    },
    [ACTIONS_TYPE.ADD_DETAILS]: {
      ...state,
      details: action.payload,
    },
  };

  return actionsTypes[action.type];
};
