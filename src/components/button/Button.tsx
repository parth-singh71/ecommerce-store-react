import { Button } from "@mui/material";
import { PropsWithChildren } from "react";

type ButtonComponentPropsType = {
  type?: "submit" | undefined;
  className?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const ButtonComponent = (props: PropsWithChildren<ButtonComponentPropsType>) => {
  const { type, children, className, onClick } = props;
  return (
    <Button
      fullWidth
      className={className}
      variant="contained"
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
