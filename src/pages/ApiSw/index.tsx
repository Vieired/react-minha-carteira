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
    const [clickedItem, setClickedItem] = useState({
        birth_year: "",
        eye_color: "",
        skin_color: "",
        hair_color: "",
        filmsUrl: [],
        gender: "",
        height: "",
        homeworld: "",
        mass: "",
        name: "",
        created: "",
        edited: "",
        speciesUrl: [],
        starshipsUrl: []
    });

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

    const handleClick = (person:any) => {
        setClickedItem(person);
        setIsModalOpen(true);
    }

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
                        onClick={() => handleClick(person)} />
                ))}
                <Modal
                    isOpen={isModalOpen}
                    contentLabel={"Detalhes do item"}
                    ariaHideApp={true}
                    onRequestClose={handleRequestCloseFunc}>
                    <h1>{clickedItem.name}</h1>
                    <br />
                    <p>Altura: {clickedItem.height}</p>
                    <p>Peso: {clickedItem.mass}</p>
                    <p>Aniversário: {clickedItem.birth_year}</p>
                    <p>Cor da pele: {clickedItem.skin_color}</p>
                    <p>Cor do cabelo: {clickedItem.hair_color}</p>
                    <p>Cor do cabelo: {clickedItem.eye_color}</p>
                    <p>Gênero: {clickedItem.gender}</p>
                    <p>URL do mundo natal: {clickedItem.homeworld}</p>
                    <p>URLs da espécie: {clickedItem.speciesUrl && clickedItem.speciesUrl[0]}</p>
                    <p>URLs da nave: {clickedItem.starshipsUrl && clickedItem.starshipsUrl[0]}</p>
                    <div>
                        <p>Filmes:</p>
                        <ul>
                        {
                            clickedItem.filmsUrl?.map((UrlFilm:any) => (
                                <li>{UrlFilm}</li>
                            ))
                        }
                        </ul>
                    </div>
                    <p>URLs dos filmes: {clickedItem.filmsUrl && clickedItem.filmsUrl[0]}</p>
                    <br />
                    <br />
                    <br />
                    <small>Criado em: {clickedItem.created}</small>
                </Modal>
            </Content>
        </Container>
    )
};

export default ApiSw;