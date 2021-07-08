import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

// uma interface que será do tipo de um input comum do html
// aproveitando uma tipagem que já existe
type IInputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<IInputProps> = ({ ...rest }) => (
    <Container {...rest} />
);

export default Input;