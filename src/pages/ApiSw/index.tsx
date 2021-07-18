import React, { useState } from 'react';
import { Container, Content, Header } from './styles';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import apiSW from '../../services/ApiSw';


interface IPeople {
    birth_year: string;
    eye_color: string;
    skin_color: string;
    hair_color: string;
    filmsUrl: string[];
    gender: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    created: string;
    edited: string;
    speciesUrl: string[];
    starshipsUrl: string[];
}

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
                {items?.map((person:IPeople) => (
                    <HistoryFinanceCard
                        key={person.name}
                        title={person.name}
                        subtitle={`Altura: ${person.height}, Massa: ${person.mass}, Aniversário: ${person.birth_year}`}
                        amount=""
                        tagColor={person.skin_color} />
                ))}
            </Content>
        </Container>
    )
};

export default ApiSw;