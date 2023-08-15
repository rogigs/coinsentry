import TextFieldMUI from '@mui/material/TextField';

function TextField({ label, variant = 'outlined', ...props }) {
  return <TextFieldMUI label={label} variant={variant} {...props} />;
}

export default TextField;
