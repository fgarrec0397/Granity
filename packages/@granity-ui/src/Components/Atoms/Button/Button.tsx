import ButtonLib, { ButtonProps as LibButtonProps } from "@mui/material/Button";
import { FC } from "react";

export type ButtonProps = LibButtonProps;

const Button: FC<ButtonProps> = ({ children, ...props }) => {
    return <ButtonLib {...props}>{children}</ButtonLib>;
};

export type { IconButtonProps } from "@mui/material/IconButton";
export { default as IconButton } from "@mui/material/IconButton";

export default Button;
