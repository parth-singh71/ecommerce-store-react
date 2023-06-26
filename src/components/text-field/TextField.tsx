import { SxProps, TextField, Theme } from "@mui/material";

type TextFieldPropsType = {
  size: "small" | "medium";
  type: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const TextFieldComponent = (props: TextFieldPropsType) => {
  const { size, type, label, onChange } = props;
  return (
    <TextField
      fullWidth
      sx={textFieldStyle}
      size={size}
      type={type}
      label={label}
      placeholder={label}
      variant="outlined"
      onChange={onChange}
    />
  );
};

const textFieldStyle: SxProps<Theme> = {
  marginBottom: 2,
};

export default TextFieldComponent;
