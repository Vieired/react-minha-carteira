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
                <MenuItemLink href="#">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>
                <MenuItemLink href="#">
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>
                <MenuItemLink href="#">
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>
                <MenuItemLink href="#">
                    <MdExitToApp />
                    Sair
                </MenuItemLink>                                
            </MenuContainer>
        </Container>
    );
}

export default Aside;