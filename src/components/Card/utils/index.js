import { red, green } from '@mui/material/colors';

export const TYPES = {
  TOTAL: 'total',
  SAIDA: 'saída',
  ENTRADA: 'entrada',
};

export const TYPES_COLORS = (value) => {
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
