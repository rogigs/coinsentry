import WarningAmberOutlined from '@mui/icons-material/BugReportOutlined'; // TODO: resolve problem of type
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined';

import ErrorOutlineOutlined from '@mui/icons-material/ErrorOutlineOutlined';
import Button from '@mui/material/Button';
import DialogActionsMUI from '@mui/material/DialogActions';
import DialogContentMUI from '@mui/material/DialogContent';
import DialogTitleMUI from '@mui/material/DialogTitle';

import { useDialog } from '@/hooks/useDialog';

import { IconsType } from '@/types';
import * as S from './styles';

export type DialogOptions = {
  icon: IconsType;
  title: string;
};

type IconType = {
  [IconsType.error]: React.ReactElement;
  [IconsType.success]: React.ReactElement;
  [IconsType.warning]: React.ReactElement;
};

const icons: IconType = {
  error: <ErrorOutlineOutlined color="error" fontSize="large" />,
  success: <CheckCircleOutlineOutlined color="success" fontSize="large" />,
  warning: <WarningAmberOutlined color="warning" fontSize="large" />,
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

export const DialogTitle = ({ icon, title }: DialogOptions) => (
  <DialogTitleMUI className="center">
    {icon && (
      <div className="center icon">{icons[icon] || 'Icon not found'}</div>
    )}

    {title}
  </DialogTitleMUI>
);

export const DialogContent = ({ children }: Children) => (
  <DialogContentMUI>{children}</DialogContentMUI>
);

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
}: DialogActions) => (
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

export default {
  Dialog: DialogComponent,
  DialogTitle,
  DialogContent,
  DialogActions,
};
