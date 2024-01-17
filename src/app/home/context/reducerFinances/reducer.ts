import { Finance, FinanceDetails } from '@/services/coinSentry/finances';

import { ACTIONS_TYPE, Action } from './actions';

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

// TODO: change type
const compareArraysOfObjects = (oldDatas: any, newDatas: any) => {
  if (newDatas) {
    return [...oldDatas, ...newDatas].reduce((accumulator, currentObject) => {
      const isObjectExist = accumulator.some(
        ({ id }: { id: string }) => id === currentObject.id,
      );

      if (!isObjectExist) {
        accumulator.push(currentObject);
      }

      return accumulator;
    }, []);
  }

  return oldDatas;
};

export const reducer = (state: INITIAL_STATE_TYPE, action: Action) => {
  const actionsTypes = {
    [ACTIONS_TYPE.ADD_DATA]: {
      ...state,
      data: compareArraysOfObjects(state.data, action.payload.data),
      dataLenghtInDatabase: action.payload.dataLenghtInDatabase,
    },
    [ACTIONS_TYPE.ADD_DETAILS]: {
      ...state,
      details: action.payload,
    },
  };

  return actionsTypes[action.type];
};
