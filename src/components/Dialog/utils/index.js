import {
  ErrorOutlineSharp,
  CheckCircleOutlineOutlined,
  WarningOutlined,
} from '@mui/icons-material';

export const ICONS = {
  error: <ErrorOutlineSharp sx={{ color: 'red' }} fontSize="large" />,
  success: (
    <CheckCircleOutlineOutlined sx={{ color: 'green' }} fontSize="large" />
  ),
  warning: <WarningOutlined sx={{ color: 'yellow' }} fontSize="large" />,
};
