import React, { useState } from 'react';
import { Container, Content, Header } from './styles';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
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