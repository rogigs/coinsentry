export enum ACTIONS_TYPE {
  ADD_DATA = 'ADD_DATA',
  ADD_DETAILS = 'ADD_DETAILS',
}

export type Action = { type: ACTIONS_TYPE; payload?: any };
