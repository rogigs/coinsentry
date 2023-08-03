import { CircularProgress } from "@mui/material";
import ButtonMUI from "@mui/material/Button";

const Button = ({ variant = "contained", children, loading, ...props }) => {
  return (
    <ButtonMUI variant={variant} {...props}>
      {loading ? <CircularProgress size="24px" color="inherit" /> : children}
    </ButtonMUI>
  );
};

export default Button;
