import {
  Button as ButtonMUI,
  ButtonProps,
  CircularProgress,
} from '@mui/material';

type CustomButtonProps = ButtonProps & {
  variant?: 'contained' | 'outlined' | 'text';
  loading?: boolean;
  children?: React.ReactNode | React.ReactElement;
  className?: any;
};

const Button = ({
  variant = 'contained',
  children,
  loading,
  className = {},
  ...props
}: CustomButtonProps) => (
  <ButtonMUI
    variant={variant}
    disabled={loading}
    sx={{
      ...className,
    }}
    {...props}
  >
    {loading ? <CircularProgress size="24px" color="inherit" /> : children}
  </ButtonMUI>
);

export default Button;
