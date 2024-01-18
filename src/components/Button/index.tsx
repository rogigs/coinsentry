import React, { ReactNode } from 'react';
import {
  CircularProgress,
  Button as ButtonMUI,
  ButtonProps,
} from '@mui/material';

type CustomButtonProps = ButtonProps & {
  variant?: 'contained' | 'outlined' | 'text';
  loading?: boolean;
  children: ReactNode;
};

const Button = ({
  variant = 'contained',
  children,
  loading,
  ...props
}: CustomButtonProps) => {
  return (
    <ButtonMUI
      variant={variant}
      disabled={loading}
      sx={{
        '&.Mui-disabled': {
          backgroundColor: 'var(--primary-color)',
        },
      }}
      {...props}
    >
      {loading ? <CircularProgress size="24px" color="inherit" /> : children}
    </ButtonMUI>
  );
};

export default Button;
