import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const outerTheme = createTheme({
  palette: {
    primary: {
      main: '#88c9f2', //var(--primary-color),
      light: '#c9e1f0', //var(--primary-color-light-low)
      dark: '#69bcf0', //var(--primary-color-dark-low)
      contrastText: '#394D59', // var(--primary-color-dark-high),
    },
    secondary: {
      main: '#F285B8', //var(--secondary-color),
      light: '#bf8fa6', //var(--secondary-color-light-low)
      dark: '#593a49', //var(--secondary-color-dark-low)
      contrastText: '#394D59', // var(--primary-color-dark-high),
    },
    success: {
      main: '#ADF288', //var(--success-color),
      contrastText: '#394D59', // var(--primary-color-dark-high),
    },
    error: {
      main: '#ff6961', //var(--error-color)
    },
    text: {
      primary: '#394D59', // var(--primary-color-dark-high),
    },
    background: {
      default: '#F2F2F2', // var(--gray-color),
      paper: '#F2F2F2', // var(--gray-color),
    },
    action: {
      hover: '#f29f8d', //var(--support-color-3)
    },
  },
});

type BrandTheme = {
  children: React.ReactNode;
};

const BrandTheme = ({ children }: BrandTheme) => {
  return <ThemeProvider theme={outerTheme}>{children}</ThemeProvider>;
};

export default BrandTheme;
