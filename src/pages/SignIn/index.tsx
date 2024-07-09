import React, { useState } from 'react';

import { GoogleLogin } from '@react-oauth/google';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import {
    Container,
    Logo,
    Form,
    FormTitle
} from './styles';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { signIn, sigInWithGoogle } = useAuth();

    const handleGoogleLogin = (response) => {
        sigInWithGoogle(response.credential);
    };

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira" />
                <h2>Minha Carteira</h2>
            </Logo>
            <Form onSubmit={() => signIn(email, password)}>
                <FormTitle>Entrar</FormTitle>
                <Input
                    type="email"
                    required
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    required
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Acessar</Button>
            </Form>

            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                    console.log('Login Failed');
                }}
            />            
        </Container>
    );
}

export default SignIn;