import React, { useState, useEffect } from 'react';

import Modal from 'react-modal';
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton';
import { useStarWars } from '../../hooks/StarWarsContext';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import apiSW from '../../services/ApiSw';
import formatDate from '../../utils/formatDate';
import formatDateYear from '../../utils/formatDateYear';
import {
    IPeople,
    IResponseFilm,
    IResponseStarships,
} from '../../shared/models/StarWars';
import {
    Container,
    Content,
    Header,
    Loading,
    Paginate,
} from './styles';


const ApiSw: React.FC = () => {

    const {
        isLoading,
        items,
        dataPages,
        fetchItems,
        fetchItemsPageNext,
        fetchItemsPagePrevious,
    } = useStarWars();

    // const [items, setItems] = useState<any>({});
    // const [dataPages, setDataPages] = useState<IDataPages>({count: 0, next: null, previous: null});
    // const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSectionModal, setIsLoadingSectionModal] = useState(true);
    const [isLoadingStarships, setIsLoadingStarships] = useState(true);
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
    const [responseFilmsClickedItem, setResponseFilmsClickedItem] = useState<IResponseFilm[]>([
        {
            config: {
                url: ""
            },
            data: {
                title: "",
                release_date: ""
            }
        }
    ]);
    const [responseStarshipsClickedItem, setResponseStarshipsClickedItem] =
        useState<IResponseStarships[]>([
            {
                config: {
                    url: ""
                },
                data: {
                    name: ""
                }
            }
        ]);

    const handleClickPageNext = () => {
        if(dataPages?.next != null) {
            fetchItemsPageNext();
        }
    };

    const handleClickPagePrev = () => {
        if(dataPages?.previous != null) {
            fetchItemsPagePrevious();
        }
    };

    const handleClick = (person:any) => {
        setClickedItem(person);
        setIsModalOpen(true);
        setIsLoadingSectionModal(true);
        getStarshipsByPerson(person);
        getFilmesByPerson(person);
    };

    const handleRequestCloseFunc = ():void => {
        setIsModalOpen(false);
    };

    const getStarshipsByPerson = (person:IPeople) => {
        let promises:any[] = [];

        if(person.starships) {
            person.starships.forEach(x => {
                const id = x.split("/")[5];
                const url = `starships/${id}`;
                promises.push(
                    apiSW.get(url)
                );
            });
            
            Promise.all(promises).then((responses:IResponseStarships[]) => {
                console.log(responses);
                setResponseStarshipsClickedItem(responses);
                setIsLoadingStarships(false);
            })
        }
        else {
            setResponseStarshipsClickedItem([]);
        }
    };

    const getFilmesByPerson = (person:IPeople) => {
        let promises:any[] = [];
        person.films.forEach(x => {
            const id = x.split("/")[5];
            const url = `films/${id}`;
            promises.push(
                apiSW.get(url)
            );
        });
        
        Promise.all(promises).then((responses:IResponseFilm[]) => {
            // console.log(responses);
            // let temp:IDataFilm[] = [];
            // responses.forEach(x => temp.push({
            //     title: x.data.title
            // }));

            // const [um.data, dois.data, tres.data] = responses;
            // const [...resto] = temp;
            // console.log("Temp:", temp);
            // setFilmsdataClickedItem( ...responses.data, {
            //     title: x.title
            // });
            // setFilmsdataClickedItem([...responses.data, { title: responses.data.title }]);

            // [...temp] = responses.data;
            // setFilmsdataClickedItem(responses[0].data);

            setResponseFilmsClickedItem(responses);
            setIsLoadingSectionModal(false);
        })
    };

    useEffect(() => {
        fetchItems()
    },[fetchItems]);

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
            </Content>
            <Modal
                isOpen={isModalOpen}
                contentLabel={"Detalhes do item"}
                ariaHideApp={false}
                onRequestClose={handleRequestCloseFunc}
            >
                <h1>{clickedItem.name}</h1>
                <br />
                <p>Altura: {clickedItem.height} cm</p>
                <p>Peso: {clickedItem.mass} kg</p>
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
                { responseStarshipsClickedItem.length > 0 &&
                    <div>
                        <p>Naves:</p>
                        { isLoadingStarships && (
                            <Skeleton count={3} baseColor="#ffffff14" highlightColor="#f5f5f5db"/>
                        )}
                        { !isLoadingStarships &&
                            <ul>
                                {
                                    responseStarshipsClickedItem?.map((x:IResponseStarships) => (
                                        <li key={x.data.name}>
                                            <button title={x.data.manufacturer}>
                                                {x.data.name} ({x.data.starship_class})
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        }
                        <br/>
                    </div>
                }
                <div>
                    <p>Filmes:</p>
                    { isLoadingSectionModal && (
                        <Skeleton count={3} baseColor="#ffffff14" highlightColor="#f5f5f5db"/>
                    )}
                    { !isLoadingSectionModal &&
                        <ul>
                        {
                            responseFilmsClickedItem?.map((x:IResponseFilm) => (
                                <li key={x.data.title}>
                                    <button title={x.data.opening_crawl}>
                                        {x.data.title} ({formatDateYear(x.data.release_date)})
                                    </button>
                                </li>
                            ))
                        }
                        </ul>
                    }
                </div>
                <br />
                <br />
                <footer>
                    <div>
                        <small>{`Criado em: ${formatDate(clickedItem.created)}`}</small>
                    </div>
                    <div>
                        <small>{`Última edição: ${formatDate(clickedItem.edited)}`}</small>
                    </div>
                </footer>
            </Modal>
        </Container>
    )
};

export default ApiSw;