import React from 'react';
import { Container } from './styles';

const Content: React.FC = ({ children }) => (
    <Container>
        <h4>{ children }</h4>
    </Container>
);

export default Content;