import React from 'react';
import { useState } from 'react';
import { 
    MdDashboard,
    MdArrowUpward,
    MdArrowDownward,
    MdExitToApp,
    MdClose,
    MdMenu,
    MdMovieFilter,
    MdAddBox
} from 'react-icons/md';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';
import Toggle from '../Toggle';
import {
    Container,
    Header,
    LogImg,
    MenuContainer,
    MenuItemLink,
    Title,
    MenuItemButton,
    ToggleMenu,
    ThemeToggleFooter
} from './styles';


const Aside: React.FC = () => {
    const { signOut } = useAuth();
    const { toggleTheme, theme } = useTheme();

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
    const [darkTheme, setDarkTheme] = useState(
        () => theme.title === 'dark' ? true : false
    );

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened);
    };

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    };

    return (
        <Container menuIsOpen={toggleMenuIsOpened}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    { toggleMenuIsOpened ? <MdClose/> : <MdMenu/> }
                </ToggleMenu>
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
                <MenuItemLink href="/budget">
                    <MdAddBox />
                    Cadastro de Orçamentos
                </MenuItemLink>                
                <MenuItemLink href="/apisw">
                    <MdMovieFilter />
                    API SW
                </MenuItemLink>
                <MenuItemLink href="/apigitlab">
                    <MdMovieFilter />
                    API GitLab
                </MenuItemLink>
                <MenuItemButton onClick={signOut}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>                                
            </MenuContainer>

            <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
                <Toggle
                    labelLeft="Light"
                    labelRight="Dark"
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />                
            </ThemeToggleFooter>
        </Container>
    );
}

export default Aside;