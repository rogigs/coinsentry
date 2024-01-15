import { red, green } from '@mui/material/colors';

export enum CardTypes {
  total = 'total',
  saida = 'saída',
  entrada = 'entrada',
}

export const typeColors = (value: number) => {
  if (value > 0) {
    return {
      backgroundColor: `${green[700]}  !important`,
      color: 'var(--white-color) !important',
    };
  }

  if (value < 0) {
    return {
      backgroundColor: `${red[700]} !important`,
      color: 'var(--white-color) !important',
    };
  }

  return {
    backgroundColor: 'inherit',
    color: 'inherit',
  };
};
