import { NumericFormat } from "react-number-format";
import TextField from "../TextField";

const TextFieldNumberFormat = ({ label, variant, ...props }) => {
  return (
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
};

export default TextFieldNumberFormat;
