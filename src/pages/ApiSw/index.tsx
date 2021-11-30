import React, { useState, useEffect } from 'react';
import { Container, Content, Header, Loading, LoadingSectionModal, Paginate } from './styles';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import apiSW from '../../services/ApiSw';
import Modal from 'react-modal';
import formatDate from '../../utils/formatDate';
import formatDateYear from '../../utils/formatDateYear';


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

// interface IStarships {
//     name: string;
//     model?: string;
//     cost_in_credits?: string;
//     length?: string;
//     max_atmosphering_speed?: string;
//     starship_class?: string;
// }

interface IDataFilm {
    title: string;
    episode_id?: number;
    opening_crawl?: string;
    director?: string, 
    producer?: string, 
    release_date: string;
    url?: string;
}

interface IConfig {
    url: string;
    baseURL?: string;
    method?: string;
}

interface IResponseFilm {
    config: IConfig;
    data: IDataFilm;
}

interface IDataPages {
    count: number;
    next: string | null;
    previous: string | null;
    results?: IPeople[];
}

interface IDataStarships {
    name: string;
    model?: string;
    manufacturer?: string;
    starship_class?: string;
    cost_in_credits?: string;
    length?: string;
    max_atmosphering_speed?: string;
}

interface IResponseStarships {
    config: IConfig;
    data: IDataStarships;
}

const ApiSw: React.FC = () => {

    const [items, setItems] = useState<any>({});
    const [dataPages, setDataPages] = useState<IDataPages>({count: 0, next: null, previous: null});
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSectionModal, setIsLoadingSectionModal] = useState(true);
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
    const [responseStarshipsClickedItem, setResponseStarshipsClickedItem] = useState<IResponseStarships[]>([
        {
            config: {
                url: ""
            },
            data: {
                name: ""
            }
        }
    ]);    

    useEffect(() => {
        apiSW.get("people/").then((response) => {
            setItems(response.data.results);
            setDataPages(response.data);
            // console.log("Response:", response);
        })
        .catch((err) => {
            console.log("There is a error!")
        })
        .finally(() => {
            setIsLoading(false);
        });
    },[]);

    const handleClickPageNext = () => {
        if(dataPages.next != null) {
            setIsLoading(true);
            const url = `people/?page=${dataPages.next?.split('=')[1]}`;
            apiSW.get(url).then((response) => {
                setItems(response.data.results);
                setDataPages(response.data);
                // console.log("Response:", response);
            })
            .catch((err) => {
                console.log("There is a error!")
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    };

    const handleClickPagePrev = () => {
        if(dataPages.previous != null) {
            setIsLoading(true);
            const url = `people/?page=${dataPages.previous?.split('=')[1]}`;
            apiSW.get(url).then((response) => {
                setItems(response.data.results);
                setDataPages(response.data);
                // console.log("Response:", response);
            })
            .catch((err) => {
                console.log("There is a error!")
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    };

    const handleClick = (person:any) => {
        setClickedItem(person);
        setIsModalOpen(true);
        setIsLoadingSectionModal(true);
        getFilmesByPerson(person);
        getStarshipsByPerson(person);
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
                // setIsLoadingSectionModal(false);
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
                onRequestClose={handleRequestCloseFunc}>
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
                        <br/>
                    </div>
                }
                <div>
                    <p>Filmes:</p>
                    { isLoadingSectionModal && <LoadingSectionModal/> }
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