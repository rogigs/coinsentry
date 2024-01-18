export enum ACTIONS_TYPE {
  ADD_DATA = 'ADD_DATA',
  ADD_DETAILS = 'ADD_DETAILS',
  ADD_FINANCE_TO_UPDATE = 'ADD_FINANCE_TO_UPDATE',
}

export type Action = { type: ACTIONS_TYPE; payload?: any };
