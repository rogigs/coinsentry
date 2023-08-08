import Button from "@mui/material/Button";
import DialogMUI from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { styled } from "@mui/material/styles";
import { ICONS } from "./utils";

const BootstrapDialog = styled(DialogMUI)(() => ({
  "& .MuiDialogContent-root": {
    padding: "24px",
  },
  "& .MuiDialogActions-root": {
    padding: "24px",
  },
  "& .center": {
    display: "flex",
    justifyContent: "center",
  },
  "& .icon": {
    paddingTop: "24px",
  },
}));

const Dialog = ({ open, handleClose, children, icon, title }) => {
  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {icon && <div className="center icon">{ICONS[icon]}</div>}
      <DialogTitle className="center">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Fechar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default Dialog;
