export type Pagination = {
  page: number;
  pageSize: number;
};

export enum IconsType {
  error = 'error',
  success = 'success',
  warning = 'warning',
}

export type IconsOptions = keyof typeof IconsType;
