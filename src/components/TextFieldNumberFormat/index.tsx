import { TextFieldProps } from '@mui/material/TextField';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import TextField from '../TextField';

type TextFieldNumberFormatProps = NumericFormatProps &
  TextFieldProps & {
    label?: string;
    variant?: string; // TODO: change types
  };

const TextFieldNumberFormat = ({
  label,
  variant,
  ...props
}: TextFieldNumberFormatProps) => (
  <NumericFormat
    {...props}
    label={label}
    variant={variant}
    customInput={TextField}
    type="text"
    thousandSeparator="."
    decimalSeparator=","
    prefix="R$ "
    decimalScale={2}
    allowNegative={false}
  />
);

export default TextFieldNumberFormat;
