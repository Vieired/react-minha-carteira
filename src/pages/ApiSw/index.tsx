import React, { useState } from 'react';
import { Container, Content, Header } from './styles';
import axios from 'axios';

const ApiSw: React.FC = () => {

    const [items, setItems] = useState([]);
    const api = axios.create({
        baseURL: "https://swapi.dev/api/"
    });

    api.get("people/")
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