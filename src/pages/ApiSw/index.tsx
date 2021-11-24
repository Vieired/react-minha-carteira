import React, { useState } from 'react';
import { Container, Content, Header, Loading } from './styles';
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
    const [isLoading, setIsLoading] = useState(true);

    apiSW.get("people/")
        .then((response) => listPersons(response.data))
        .catch((err) => {
            console.log("There is a error!")
        })
        .finally(() => {
            setIsLoading(false);
        });

    const listPersons = (persons: any) => {
        setItems(persons.results);
    };

    return (
        <Container>
            <Header>API Star Wars</Header>
            <Content>
                { isLoading && <Loading/> }
                { !isLoading && items?.map((person:IPeople) => (
                    <HistoryFinanceCard
                        key={person.name}
                        title={person.name}
                        subtitle={`${person.height}cm . ${person.mass}kg . Ano de aniversário: ${person.birth_year}`}
                        amount=""
                        tagColor={person.skin_color} />
                ))}
            </Content>
        </Container>
    )
};

export default ApiSw;