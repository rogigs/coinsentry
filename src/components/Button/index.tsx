import {
  Button as ButtonMUI,
  ButtonProps,
  CircularProgress,
} from '@mui/material';
import { ReactNode } from 'react';

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
}: CustomButtonProps) => (
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

export default Button;
