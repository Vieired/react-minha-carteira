import React, { useState, useEffect } from 'react';
import { Container, Content, Header, Loading, Paginate } from './styles';
// import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import apiMarvel from '../../services/ApiMarvel';
import Modal from 'react-modal';
// import formatDate from '../../utils/formatDate';
// import formatDateYear from '../../utils/formatDateYear';


interface IResults {
    id: number;
    name: string;
    description: string;
}

interface IData {
    results: IResults[];
    total: number;
    count?: number;
}

interface IResponse {
    code: string;
    data: IData;
    etag?: string;
}


const ApiMarvel: React.FC = () => {

    const [items, setItems] = useState<any>({});
    // const [dataPages, setDataPages] = useState<IDataPages>({count: 0, next: null, previous: null});
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedItem, setClickedItem] = useState<IResponse>({
        code: "",
        data: {
            results: [
                {
                    id: 0,
                    name: "",
                    description: ""
                }
            ],
            total: 0
        }
    }); 

    useEffect(() => {
        const apiKey = "99708c803f660aaea0ce2bc2332d988e";
        const apiKeyMD5 = "19514201902a6b1cec34bbe6d9813c67";
        const config = {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                Method: 'GET',
                Accept: '*/*'
            }
        };
        const url = `/v1/public/comics?apikey=${apiKey}`;
        // const urlFull = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}`;
        const urlFull = `characters?apikey=${apiKey}`;
        apiMarvel.get(urlFull/*, config*/).then((response) => {
            // setItems(response.data.results);
            // setDataPages(response.data);
            console.log("Response:", response);
        })
        .catch((err) => {
            console.log("There is a error!")
        })
        .finally(() => {
            setIsLoading(false);
        });
    },[]);

    // const handleClickPageNext = () => {
    //     if(dataPages.next != null) {
    //         setIsLoading(true);
    //         const url = `people/?page=${dataPages.next?.split('=')[1]}`;
    //         apiMarvel.get(url).then((response) => {
    //             setItems(response.data.results);
    //             setDataPages(response.data);
    //             // console.log("Response:", response);
    //         })
    //         .catch((err) => {
    //             console.log("There is a error!")
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         });
    //     }
    // };

    // const handleClickPagePrev = () => {
    //     if(dataPages.previous != null) {
    //         setIsLoading(true);
    //         const url = `people/?page=${dataPages.previous?.split('=')[1]}`;
    //         apiMarvel.get(url).then((response) => {
    //             setItems(response.data.results);
    //             setDataPages(response.data);
    //             // console.log("Response:", response);
    //         })
    //         .catch((err) => {
    //             console.log("There is a error!")
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         });
    //     }
    // };

    const handleClick = (person:any) => {
        setClickedItem(person);
        setIsModalOpen(true);
        // setIsLoadingSectionModal(true);
        // getFilmesByPerson(person);
        // getStarshipsByPerson(person);
    };

    const handleRequestCloseFunc = ():void => {
        setIsModalOpen(false);
    };

    return (
        <Container>
            <Header>API Marvel</Header>
            <Content>
                { isLoading && <Loading/> }
                {/* { !isLoading && items?.map((person:IPeople) => (
                    <HistoryFinanceCard
                        key={person.name}
                        title={person.name}
                        subtitle={`${person.height}cm . ${person.mass}kg . Ano de aniversário: ${person.birth_year}`}
                        amount=""
                        tagColor={person.skin_color}
                        onClick={() => handleClick(person)} />
                ))} */}
                {/* <Paginate>
                    <button onClick={handleClickPagePrev}>{"<"}</button>
                    <button onClick={handleClickPageNext}>{">"}</button>
                    <small>Total items: {dataPages.count}</small>
                </Paginate> */}
            </Content>
            <Modal
                isOpen={isModalOpen}
                contentLabel={"Detalhes do item"}
                ariaHideApp={false}
                onRequestClose={handleRequestCloseFunc}>
                {/* <h1>{clickedItem.data.results.name}</h1>
                <br />
                <p>Descrição: {clickedItem.data.results.}</p> */}
                {/* <br/>
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
                        { isLoadingStarships && <LoadingSectionModal/> }
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
                </footer> */}
            </Modal>
        </Container>
    )
};

export default ApiMarvel;