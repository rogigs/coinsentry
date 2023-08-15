import TextFieldMUI from '@mui/material/TextField';

const TextField = ({ label, variant = 'outlined', ...props }) => (
  <TextFieldMUI label={label} variant={variant} {...props} />
);

export default TextField;
