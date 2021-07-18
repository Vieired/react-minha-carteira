import React, { useState } from 'react';
import { Container, Content, Header } from './styles';
import apiSW from '../../services/ApiSw';

const ApiSw: React.FC = () => {

    const [items, setItems] = useState([]);

    apiSW.get("people/")
        .then((response) => listPersons(response.data))
        .catch((err) => {
            console.log("There is a error!")
        });

    const listPersons = (persons: any) => {
        setItems(persons.results);
    };

    return (
        <Container>
            <Header>API Star Wars</Header>
            <Content>
                {items?.map((person:any) => (
                    <div>{person.name}</div>
                ))}
            </Content>
        </Container>
    )
};

export default ApiSw;