import React from 'react';
import logoImg from '../../assets/logo.svg';
import {
    Container,
    Header,
    LogImg,
    MenuContainer,
    MenuItemLink,
    Title
} from './styles';
import { 
    MdDashboard,
    MdArrowUpward,
    MdArrowDownward,
    MdExitToApp
} from 'react-icons/md';

const Aside: React.FC = () => {
    return (
        <Container>
            <Header>
                <LogImg src={logoImg} alt="Logo Minha Carteira" />
                <Title>Minha Carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>
                <MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>
                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>
                <MenuItemLink href="/logout">
                    <MdExitToApp />
                    Sair
                </MenuItemLink>                                
            </MenuContainer>
        </Container>
    );
}

export default Aside;