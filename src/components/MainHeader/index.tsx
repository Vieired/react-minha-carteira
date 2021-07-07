import React, { useMemo } from 'react';
import { Container, Profile, Welcome, UserName } from './styles';
import emojis from '../../utils/emojis';
import Toggle from '../Toggle';
import { useTheme } from '../../hooks/theme';
import { useState } from 'react';
import dark from '../../styles/themes/dark';

const MainHeader: React.FC = () => {
    const { toggleTheme, theme } = useTheme();

    const [darkTheme, setDarkTheme] = useState(
        () => theme.title === 'dark' ? true : false
    );

    const emoji = useMemo(() => {
        const idx = Math.floor(Math.random() * emojis.length);
        return emojis[idx];
    },[]);
    
    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    return (
        <Container>
            <Toggle
                labelLeft="Light"
                labelRight="Dark"
                checked={darkTheme}
                onChange={handleChangeTheme}
            />

            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>Ednaldo Gomes</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader;