import Button from '@mui/material/Button';
import DialogActionsMUI from '@mui/material/DialogActions';
import DialogContentMUI from '@mui/material/DialogContent';
import DialogTitleMUI from '@mui/material/DialogTitle';
import * as S from './styles';
import ErrorOutlineOutlined from '@mui/icons-material/ErrorOutlineOutlined';
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined'; // TODO: resolve problem of type

import { useDialog } from '@/hooks/useDialog';

export enum Icons {
  error = 'error',
  success = 'success',
  warning = 'warning',
}

type IconType = {
  [Icons.error]: React.ReactElement;
  [Icons.success]: React.ReactElement;
  [Icons.warning]: React.ReactElement;
};

const icons: IconType = {
  error: <ErrorOutlineOutlined sx={{ color: 'red' }} fontSize="large" />,
  success: (
    <CheckCircleOutlineOutlined sx={{ color: 'green' }} fontSize="large" />
  ),
  warning: <WarningAmberOutlined sx={{ color: 'yellow' }} fontSize="large" />,
};

type Children = {
  children?: React.ReactNode;
};

export const DialogComponent = ({ children }: Children) => {
  const { showDialog } = useDialog();

  return (
    <S.BootstrapDialog
      open={showDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {children}
    </S.BootstrapDialog>
  );
};

type DialogTitle = {
  icon: Icons;
  title: string;
};

export const DialogTitle = ({ icon, title }: DialogTitle) => {
  return (
    <DialogTitleMUI className="center">
      {icon && (
        <div className="center icon">{icons[icon] || 'Icon not found'}</div>
      )}

      {title}
    </DialogTitleMUI>
  );
};

export const DialogContent = ({ children }: Children) => {
  return <DialogContentMUI>{children}</DialogContentMUI>;
};

type DialogActions = {
  primaryTxtButton: string;
  primaryActionButton: () => void;
  secondaryTxtButton?: string;
  secondaryActionButton?: () => void;
};

export const DialogActions = ({
  primaryTxtButton,
  primaryActionButton,
  secondaryTxtButton,
  secondaryActionButton,
}: DialogActions) => {
  return (
    <DialogActionsMUI>
      {secondaryActionButton && (
        <Button onClick={secondaryActionButton} autoFocus>
          {secondaryTxtButton}
        </Button>
      )}
      <Button onClick={primaryActionButton} autoFocus>
        {primaryTxtButton}
      </Button>
    </DialogActionsMUI>
  );
};

export default {
  Dialog: DialogComponent,
  DialogTitle,
  DialogContent,
  DialogActions,
};
