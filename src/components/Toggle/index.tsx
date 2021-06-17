import React from 'react';
import { Container, ToggleLabel, ToggleSelector } from './styles';

const Toggle: React.FC = () => {
    return (
        <Container>
            <ToggleLabel>Light</ToggleLabel>
            <ToggleSelector
                checked
                uncheckedIcon={false}
                checkedIcon={false}
                onChange={() => console.log("Mudou o tema")} />
            <ToggleLabel>Dark</ToggleLabel>
        </Container>
    )
}

export default Toggle;