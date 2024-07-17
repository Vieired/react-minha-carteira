import React, { useState, useEffect } from 'react';

import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton';
import { useStarWars } from '../../hooks/StarWarsContext';

import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import apiSW from '../../services/ApiSw';
import formatDate from '../../utils/formatDate';
import formatDateYear from '../../utils/formatDateYear';
import {
    IDataStarship,
    IPeople,
    IResponseFilm,
    IResponseStarships,
} from '../../shared/models/StarWars';
import StarshipLI from './StarshipLI';
import Modal from '../../components/Modal';
import {
    Container,
    Content,
    Header,
    Loading,
    Metadata,
    Paginate,
    StarshipUL,
} from './styles';


const ApiSw: React.FC = () => {

    const element = document.createElement('div');
    const {
        isLoading,
        isLoadingStarships,
        dataSource,
        responseStarshipsClickedItem,
        fetchItems,
        fetchItemsPageNext,
        fetchItemsPagePrevious,
        getStarshipsByPerson,
    } = useStarWars();

    const [isLoadingSectionModal, setIsLoadingSectionModal] = useState(true);
    // const [isLoadingStarships, setIsLoadingStarships] = useState(true);
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

    const handleClickPageNext = () => {
        if(dataSource?.next != null) {
            fetchItemsPageNext();
        }
    };

    const handleClickPagePrev = () => {
        if(dataSource?.previous != null) {
            fetchItemsPagePrevious();
        }
    };

    const handleClick = (person:IPeople) => {
        setClickedItem(person);
        setIsModalOpen(true);
        setIsLoadingSectionModal(true);
        getStarshipsByPerson(person);
        getFilmesByPerson(person);
    };

    const handleRequestCloseFunc = (): void => {
        setIsModalOpen(false);
    };

    const handleAfterClose = () => {
        setIsModalOpen(false);
    }

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
                { !isLoading && dataSource.results?.map((person:IPeople) => (
                    <HistoryFinanceCard
                        key={person.name}
                        title={person.name}
                        subtitle={`${person.height}cm . ${person.mass}kg . Ano de aniversário: ${person.birth_year}`}
                        amount=""
                        tagColor={person.skin_color}
                        onClick={() => handleClick(person)}
                    />
                ))}
                <Paginate>
                    <button onClick={handleClickPagePrev}>{"<"}</button>
                    <button onClick={handleClickPageNext}>{">"}</button>
                    <small>Total items: {dataSource.count}</small>
                </Paginate>
            </Content>

            <Modal
                isOpen={isModalOpen}
                title={clickedItem.name}
                contentLabel={"Detalhes do item"}
                appElement={element}
                ariaHideApp={false}
                onRequestClose={handleRequestCloseFunc}
                onAfterClose={handleAfterClose}
            >
                <>
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
                                <StarshipUL>
                                    {
                                        responseStarshipsClickedItem?.map((resp:IResponseStarships,i) => (
                                            <StarshipLI key={i} item={resp}/>
                                        ))
                                    }
                                </StarshipUL>
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
                    <Metadata>
                        <div>
                            <small>{`Criado em: ${formatDate(clickedItem.created)}`}</small>
                        </div>
                        <div>
                            <small>{`Última edição: ${formatDate(clickedItem.edited)}`}</small>
                        </div>
                    </Metadata>                
                </>
            </Modal>
        </Container>
    )
};

export default ApiSw;