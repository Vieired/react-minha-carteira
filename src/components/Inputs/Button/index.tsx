import { ButtonHTMLAttributes } from "react";
import { Container } from "./styles";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnTheme: 'primary' | 'secondary' | 'link';
    type?: "submit" | "reset" | "button";
}

const Button: React.FC<Props> = ({ type = "button", ...rest }) => (
    <Container {
        ...{
            ...rest,
            type
        }
    } />
);

export default Button;