import TextFieldMUI from "@mui/material/TextField";

const TextField = ({ label, variant = "outlined", ...props }) => {
  return <TextFieldMUI label={label} variant={variant} {...props} />;
};

export default TextField;
