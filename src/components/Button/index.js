import ButtonMUI from "@mui/material/Button";

const Button = ({ variant = "contained", children, ...props }) => {
  return (
    <ButtonMUI variant={variant} {...props}>
      {children}
    </ButtonMUI>
  );
};

export default Button;
