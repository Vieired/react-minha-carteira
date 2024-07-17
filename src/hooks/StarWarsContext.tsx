import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { starWarsService } from "../services/starWarsService";
import { IDataPages, IDataStarship, IPeople, IResponseStarships } from "../shared/models/StarWars";
import apiSW from "../services/ApiSw";

interface Context {
    dataSource: IDataPages;
    isLoading: boolean;
    isLoadingStarships: boolean;
    responseStarshipsClickedItem: IResponseStarships[];
    fetchItems: () => void;
    fetchItemsPageNext: () => void;
    fetchItemsPagePrevious: () => void;
    getStarshipsByPerson: (person: IPeople) => void;
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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingStarships, setIsLoadingStarships] = useState(true);

    // #region
    const fetchItems = useCallback(async () => {
        try {
            setIsLoading(true);
            starWarsService.list().then((response: IDataPages) => {
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
            starWarsService.listNext(page).then((response:any) => {
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
            starWarsService.listPrevious(page).then((response:any) => {
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
                console.log(responses);
                setResponseStarshipsClickedItem(responses);
                setIsLoadingStarships(false);
            })
        }
        else {
            setResponseStarshipsClickedItem([]);
        }
    };

    // const clearEditingItem = (): void => {
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
                fetchItems,
                fetchItemsPageNext,
                fetchItemsPagePrevious,
                getStarshipsByPerson,
                // clearEditingItem,
            }}
            >
            {children}
        </StarWarsContext.Provider>
    );    
}

export const useStarWars = () => useContext(StarWarsContext);