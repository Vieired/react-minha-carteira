import React, { useMemo } from 'react';
import { Container, Profile, Welcome, UserName } from './styles';
import Toggle from '../Toggle';

const MainHeader: React.FC = () => {

    return (
        <Container>
            <h1>MainHeader</h1>
            <Profile>
                <UserName>Ednaldo Gomes</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader;