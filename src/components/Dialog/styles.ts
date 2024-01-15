import { styled } from '@mui/material/styles';
import DialogMUI from '@mui/material/Dialog';

export const BootstrapDialog = styled(DialogMUI)(() => ({
  '& .MuiDialogContent-root': {
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .center': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .MuiDialogTitle-root': {
    gap: '4px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: '600',
  },
}));
