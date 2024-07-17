import React, { useState, useEffect, useMemo } from 'react';

import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton';
import { useStarWars } from '../../hooks/StarWarsContext';

import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import formatDate from '../../utils/formatDate';
import formatDateYear from '../../utils/formatDateYear';
import {
    IPeople,
    IResponseStarships,
    IResponseFilm,
} from '../../shared/models/StarWars';
import StarshipLI from './StarshipLI';
import Modal from '../../components/Modal';
import {
    Container,
    Content,
    Header,
    HomePlanet,
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
        isLoadingSectionModal,
        dataSource,
        responseStarshipsClickedItem,
        responseFilmsClickedItem,
        planet,
        fetchItems,
        fetchItemsPageNext,
        fetchItemsPagePrevious,
        getStarshipsByPerson,
        getFilmesByPerson,
        getPlanetById,
    } = useStarWars();

    // const [isLoadingSectionModal, setIsLoadingSectionModal] = useState(true);
    // const [isLoadingStarships, setIsLoadingStarships] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedItem, setClickedItem] = useState<IPeople|null>(null);

    const homePlanet = useMemo<string|React.ReactNode>(() => {
        return (isLoading
            || !clickedItem
            || !planet?.name)
            ? (
                <Skeleton
                    baseColor="#ffffff14"
                    highlightColor="#f5f5f5db"
                />
            )
            : planet?.name;
    },[clickedItem, isLoading, planet?.name]);

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
        getStarshipsByPerson(person);
        getFilmesByPerson(person);
    };

    const handleRequestCloseFunc = (): void => {
        setIsModalOpen(false);
        setClickedItem(null);
    };

    const handleAfterClose = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        fetchItems()
    },[fetchItems]);

    useEffect(() => {
        clickedItem?.homeworld && getPlanetById(clickedItem.homeworld.split('/')[5]);
    },[clickedItem?.homeworld, getPlanetById]);

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
                title={clickedItem?.name || "N/A"}
                contentLabel={"Detalhes do item"}
                appElement={element}
                ariaHideApp={false}
                onRequestClose={handleRequestCloseFunc}
                onAfterClose={handleAfterClose}
            >
                <>
                    <p>Altura: {clickedItem?.height || "N/A"} cm</p>
                    <p>Peso: {clickedItem?.mass || "N/A"} kg</p>
                    <p>Aniversário: {clickedItem?.birth_year || "N/A"}</p>
                    <p>Cor da pele: {clickedItem?.skin_color || "N/A"}</p>
                    <p>Cor do cabelo: {clickedItem?.hair_color || "N/A"}</p>
                    <p>Cor do cabelo: {clickedItem?.eye_color || "N/A"}</p>
                    <p>Gênero: {clickedItem?.gender || "N/A"}</p>
                    <br/>
                    <HomePlanet>
                        <span>Mundo natal: </span>
                        <span title={clickedItem?.homeworld || ""}>
                            {homePlanet}
                        </span>
                    </HomePlanet>
                    <br/>
                    <div>
                        <p>URL das espécies:</p>
                        <ul>
                        {
                            clickedItem?.species?.map((urlSpecies:any) => (
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
                            <small>{`Criado em: ${formatDate(clickedItem?.created || "N/A")}`}</small>
                        </div>
                        <div>
                            <small>{`Última edição: ${formatDate(clickedItem?.edited || "N/A")}`}</small>
                        </div>
                    </Metadata>                
                </>
            </Modal>
        </Container>
    )
};

export default ApiSw;