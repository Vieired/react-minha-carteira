import React, { useState, useEffect } from 'react';
import { Container, Content, Header, Loading, Paginate } from './styles';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import apiSW from '../../services/ApiSw';
import Modal from 'react-modal';


interface IPeople {
    birth_year: string;
    eye_color: string;
    skin_color: string;
    hair_color: string;
    films: string[];
    gender: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    created: string;
    edited: string;
    species: string[];
    starships: string[];
}

interface IDataPages {
    count: number;
    next: string | null;
    previous: string | null;
    results?: IPeople[];
}

const ApiSw: React.FC = () => {

    const [items, setItems] = useState<any>({});
    const [dataPages, setDataPages] = useState<IDataPages>({count: 0, next: null, previous: null});
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedItem, setClickedItem] = useState<IPeople>({
        birth_year: "",
        eye_color: "",
        skin_color: "",
        hair_color: "",
        films: [],
        gender: "",
        height: "",
        homeworld: "",
        mass: "",
        name: "",
        created: "",
        edited: "",
        species: [],
        starships: []
    });

    useEffect(() => {
        apiSW.get("people/").then((response) => {
            setItems(response.data.results);
            setDataPages(response.data);
            console.log("Response:", response);
        })
        .catch((err) => {
            console.log("There is a error!")
        })
        .finally(() => {
            setIsLoading(false);
        });
    },[]);

    const handleClick = (person:any) => {
        setClickedItem(person);
        setIsModalOpen(true);
    }

    const handleRequestCloseFunc = ():void => {
        setIsModalOpen(false);
    };

    const handleClickPageNext = () => {
        if(dataPages.next != null) {
            setIsLoading(true);
            const url = `people/?page=${dataPages.next?.split('=')[1]}`;
            apiSW.get(url).then((response) => {
                setItems(response.data.results);
                setDataPages(response.data);
                console.log("Response:", response);
            })
            .catch((err) => {
                console.log("There is a error!")
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    }

    const handleClickPagePrev = () => {
        if(dataPages.previous != null) {
            setIsLoading(true);
            const url = `people/?page=${dataPages.previous?.split('=')[1]}`;
            apiSW.get(url).then((response) => {
                setItems(response.data.results);
                setDataPages(response.data);
                console.log("Response:", response);
            })
            .catch((err) => {
                console.log("There is a error!")
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    }    

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
                <Paginate>
                    <button onClick={handleClickPagePrev}>{"<"}</button>
                    <button onClick={handleClickPageNext}>{">"}</button>
                    <small>Total items: {dataPages.count}</small>
                </Paginate>
                <Modal
                    isOpen={isModalOpen}
                    contentLabel={"Detalhes do item"}
                    ariaHideApp={false}
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
                    <br/>
                    <p>URL do mundo natal: {clickedItem.homeworld}</p>
                    <br/>
                    <div>
                        <p>URL das espécies:</p>
                        <ul>
                        {
                            clickedItem.species?.map((urlSpecies:any) => (
                                <li key={urlSpecies}>{urlSpecies}</li>
                            ))
                        }
                        </ul>
                    </div>
                    <br/>
                    <div>
                        <p>URL das naves:</p>
                        <ul>
                        {
                            clickedItem.starships?.map((urlStarship:any) => (
                                <li key={urlStarship}>{urlStarship}</li>
                            ))
                        }
                        </ul>
                    </div>
                    <br/>
                    <div>
                        <p>URL dos Filmes:</p>
                        <ul>
                        {
                            clickedItem.films?.map((urlFilm:any) => (
                                <li key={urlFilm}>{urlFilm}</li>
                            ))
                        }
                        </ul>
                    </div>
                    <br />
                    <br />
                    <div>
                        <small>Criado em: {clickedItem.created}</small>
                    </div>
                    <div>
                        <small>Última edição: {clickedItem.edited}</small>
                    </div>
                </Modal>
            </Content>
        </Container>
    )
};

export default ApiSw;