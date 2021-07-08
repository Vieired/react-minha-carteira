import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

// uma interface que será do tipo de um button comum do html
// aproveitando uma tipagem que já existe
type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<IButtonProps> = ({ ...rest }) => (
    <Container {...rest} />
);

export default Button;