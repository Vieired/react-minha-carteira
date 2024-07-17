import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import apiSW from "../services/ApiSw";
import { peopleService } from "../services/ApiSw/peopleService";
import { planetsService } from "../services/ApiSw/planetsService";
import {
    IDataPages,
    IDataStarship,
    IPeople,
    IPlanet,
    IResponseFilm,
    IResponseStarships,
} from "../shared/models/StarWars";

interface Context {
    dataSource: IDataPages;
    isLoading: boolean;
    isLoadingStarships: boolean;
    responseStarshipsClickedItem: IResponseStarships[];
    isLoadingSectionModal: boolean;
    responseFilmsClickedItem: IResponseFilm[];
    planet: IPlanet | null;
    fetchItems: () => void;
    fetchItemsPageNext: () => void;
    fetchItemsPagePrevious: () => void;
    getStarshipsByPerson: (person: IPeople) => void;
    getFilmesByPerson: (person:IPeople) => void;
    getPlanetById: (id: string) => void;
    // clearEditingItem: () => void;
}

interface Props {
    children?: React.ReactNode | React.ReactNode[];
};

export const StarWarsContext = createContext<Context>({} as Context);

export const StarWarsProvider: React.FC<Props> = ({ children }) => {
    const [dataSource, setDataSource] = useState<IDataPages>({
        count: 0,
        next: null,
        previous: null,
        results: [],
    });
    // const [budgetItemEditing, setBudgetItemEditing] = useState<BudgetItem|null>(null);
    // const [isLoadingEditForm, setIsLoadingEditForm] = useState<boolean>(true);
    const [responseStarshipsClickedItem, setResponseStarshipsClickedItem] =
        useState<IResponseStarships[]>([
            {
                config: {
                    url: ""
                },
                data: {
                    name: ""
                } as IDataStarship
            }
        ]);
    const [responseFilmsClickedItem, setResponseFilmsClickedItem] =
        useState<IResponseFilm[]>([
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
    const [planet, setPlanet] = useState<IPlanet|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingStarships, setIsLoadingStarships] = useState(true);
    const [isLoadingSectionModal, setIsLoadingSectionModal] = useState(true);

    // #region
    const fetchItems = useCallback(async () => {
        try {
            setIsLoading(true);
            peopleService.list().then((response: IDataPages) => {
                setDataSource(response);
                setIsLoading(false);
            })
            .catch((err) => {
                toast.error('Erro ao tentar buscar informações.');
                console.log("There is a error!");
                setIsLoading(false);
            })
            .finally(() => {
                // setIsLoading(false);
            });
        } catch (error) {
            toast.error('Erro inesperado ao tentar buscar informações.');
            console.log(error);
        }
    },[]);

    const fetchItemsPageNext = useCallback(async () => {
        try {
            setIsLoading(true);
            const page = `${dataSource.next?.split('=')[1]}`;
            peopleService.listNext(page).then((response:any) => {
                setDataSource(response);
                setIsLoading(false);
            })
            .catch((err) => {
                toast.error('Erro ao tentar buscar informações.');
                console.log("There is a error!");
                setIsLoading(false);
            })
            .finally(() => {
                // setIsLoading(false);
            });
        } catch (error) {
            toast.error('Erro inesperado ao tentar buscar informações.');
            console.log(error);
        }
    },[dataSource.next]);

    const fetchItemsPagePrevious = useCallback(async () => {
        try {
            setIsLoading(true);
            const page = `${dataSource.previous?.split('=')[1]}`;
            peopleService.listPrevious(page).then((response:any) => {
                setDataSource(response);
                setIsLoading(false);
            })
            .catch((err) => {
                toast.error('Erro ao tentar buscar informações.');
                console.log("There is a error!");
                setIsLoading(false);
            })
            .finally(() => {
                // setIsLoading(false);
            });
        } catch (error) {
            toast.error('Erro inesperado ao tentar buscar informações.');
            console.log(error);
        }
    },[dataSource.previous]);

    const getStarshipsByPerson = (person:IPeople) => {
        let promises:any[] = [];

        if(person.starships) {
            person.starships.forEach(x => {
                const id = x.split("/")[5];
                const url = `starships/${id}`;
                promises.push(apiSW.get(url));
            });
            
            Promise.all(promises).then((responses:IResponseStarships[]) => {
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
            setResponseFilmsClickedItem(responses);
            setIsLoadingSectionModal(false);
        })
    };

    const getPlanetById = useCallback(async (id: string) => {
        console.log("ID do planet", id);
        try {
            setIsLoading(true);
            await planetsService.getHomeworld(id).then((response: any) => {
                setPlanet(response);
                setIsLoading(false);
            })
            .catch((err) => {
                toast.error('Erro ao tentar buscar informações.');
                console.log("There is a error!", err);
                setIsLoading(false);
            })
            .finally(() => {
                // setIsLoading(false);
            });
        } catch (error) {
            toast.error('Erro inesperado ao tentar buscar informações.');
            console.log(error);
            setIsLoading(false);
        }
    },[]);

    // const clearClickedItem = (): void => {
    //     setEditingItem(null);
    // }
    //#endregion

    return (
        <StarWarsContext.Provider
            value={{
                dataSource,
                isLoading,
                isLoadingStarships,
                responseStarshipsClickedItem,
                isLoadingSectionModal,
                responseFilmsClickedItem,
                planet,
                fetchItems,
                fetchItemsPageNext,
                fetchItemsPagePrevious,
                getStarshipsByPerson,
                getFilmesByPerson,
                getPlanetById,
                // clearEditingItem,
            }}
            >
            {children}
        </StarWarsContext.Provider>
    );    
}

export const useStarWars = () => useContext(StarWarsContext);