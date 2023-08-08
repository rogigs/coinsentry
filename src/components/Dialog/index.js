import Button from "@mui/material/Button";
import DialogMUI from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { styled } from "@mui/material/styles";
import { ICONS } from "./utils";

const BootstrapDialog = styled(DialogMUI)(() => ({
  "& .MuiDialogContent-root": {
    textAlign: "center",
  },
  "& .MuiDialogActions-root": {
    display: "flex",
    justifyContent: "center",
  },
  "& .center": {
    display: "flex",
    justifyContent: "center",
  },
  "& .MuiDialogTitle-root": {
    gap: "4px",
    justifyContent: "flex-start",
    alignItems: "center",
    fontWeight: "600",
  },
}));

const Dialog = ({ open, handleClose, children, icon = "error", title }) => {
  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="center">
        <div className="center icon">{ICONS[icon]}</div>
        {title}
      </DialogTitle>
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
