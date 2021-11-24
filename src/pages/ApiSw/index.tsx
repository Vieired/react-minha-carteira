import React, { useState } from 'react';
import { Container, Content, Header, Loading } from './styles';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import apiSW from '../../services/ApiSw';
import Modal from 'react-modal';


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
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleRequestCloseFunc = () => {
        setIsModalOpen(false);
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
                        tagColor={person.skin_color}
                        onClick={() => setIsModalOpen(true)} />
                ))}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={handleRequestCloseFunc}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum purus lacus, a aliquam diam dapibus id. Etiam turpis nulla, ornare at arcu ut, lobortis feugiat sapien. Fusce at ullamcorper ex. Aenean in odio metus. In sed euismod magna. Quisque consequat, magna pretium molestie gravida, magna libero volutpat diam, sed semper lacus nulla at risus. Fusce placerat mi sit amet commodo feugiat. Pellentesque pellentesque nibh ut porta eleifend. Integer vel mattis elit. Mauris feugiat elit ligula, ac porttitor diam venenatis eget.</p>
                </Modal>
            </Content>
        </Container>
    )
};

export default ApiSw;