import { createContext, useCallback, useContext, useState } from "react";
import { BudgetItem } from "../shared/models/Budget";
import { budgetService } from "../services/budgetService";
import { toast } from "react-toastify";

interface Context {
    budgetItems: BudgetItem[]|null;
    budgetItemsFound: BudgetItem[];
    budgetItemEditing: BudgetItem|null;
    isLoadingEditForm: boolean;
    fetchBudgetItems: () => void;
    searchBudgetItem: (term: string) => void;
    getBudgetItemById: (id: number) => void;
    addOrEdit: (item: BudgetItem, callback: () => void) => void;
    removeBudgetById: (id: number) => void;
    clearBudgetItem: () => void;
}

interface Props {
    children?: React.ReactNode | React.ReactNode[];
};

export const BudgetContext = createContext<Context>({} as Context);

export const BudgetProvider: React.FC<Props> = ({  children }) => {
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]|null>(null);
    const [budgetItemEditing, setBudgetItemEditing] = useState<BudgetItem|null>(null);
    const [budgetItemsFound, setBudgetItemsFound] = useState<BudgetItem[]>([]);
    const [isLoadingEditForm, setIsLoadingEditForm] = useState<boolean>(true);

    // #region
    const fetchBudgetItems = useCallback(async () => {
        try {
            await budgetService.list().then((response: BudgetItem[]) => {
                setBudgetItems(response);
            });
        } catch (error) {
            toast.error('Erro ao tentar buscar informações.');
            console.log(error);
        }
    },[]);

    const searchBudgetItem = async (term: string) => {
        try {
            const response: BudgetItem[] = await budgetService.search(term);
            setBudgetItemsFound(response);
        } catch (error) {
            toast.error(error);
        }
    }

    const getBudgetItemById = useCallback(async (id: number) => {
        setIsLoadingEditForm(true);
        try {
            await budgetService
                .read(id)
                .then((response: BudgetItem) => {
                    // setBudgetItemEditing(null);
                    setBudgetItemEditing({
                        ...response,
                        /*
                            * Mapeamento dos valores recebidos do backend.
                            * Sem isso a propriedade touched não funciona corretamente,
                            * acarretando falha na exibição da mensagem de erro da validação.
                        */
                        id: response.id,
                        amount: response?.amount || '0.00',
                        date: response?.date || '',
                        description: response?.description || '',
                        frequency: response?.frequency || '',
                        type: response?.type || '',
                        details: response?.details || '',
                    } as BudgetItem);
                    setIsLoadingEditForm(false);
                });
        } catch (error) {
            toast.error(error);
            setIsLoadingEditForm(false);
        } finally {
            // setIsLoadingEditForm(false);
        }
    },[]);

    const addOrEdit = async (item: BudgetItem, callback: () => void) => {
        console.log("Item no contexto: ", item);
        try {
            if(!item?.id || item?.id === "") {
                await budgetService.create(item)
                    .then(() => {
                        toast.success('Item cadastrado com sucesso.', {
                            onOpen: () => {
                                fetchBudgetItems();
                                callback();
                            }
                            // onClose: () => {
                            //     ...
                            //     setIsLoading(false);
                            // },
                        });
                    });
            } else {
                // setIsLoading(true);
                await budgetService.update(item)
                    .then(() => {
                        toast.success('Item atualizado com sucesso.', {
                            onOpen: () => {
                                fetchBudgetItems();
                                callback();
                            }
                            // onClose: () => {
                            //     ...
                            //     setIsLoading(false);
                            // },
                        });
                    });
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const removeBudgetById = async (id: number) => {
        const isConfirm = window.confirm("Tem certeza que deseja apagar este item?");
        if(isConfirm) {
            try {
                await budgetService.remove(id)
                    .then(() => {
                        toast.success('Item removido com sucesso.');
                        fetchBudgetItems();
                    });
            } catch (error) {
                toast.error(error);
            }
        }
        // dialogConfirm({
        //   text: "Você confirma que deseja apagar este item?",
        //   title: "Apagar item",
        //   // bgColor: theme.colors.bgPrimary,
        //   onClickConfirm: async () => {
        //     try {
        //       await userService.deleteUserById(id);
        //       toast.success('Usuário removido com sucesso.');
        //       fetchUsers();
        //     } catch (error) {
        //       toast.error(error);
        //     }
        //   }
        // });
    };

    const clearBudgetItem = (): void => {
        setBudgetItemEditing(null);
    }
    //#endregion

    return (
        <BudgetContext.Provider
            value={{
                budgetItems,
                budgetItemsFound,
                budgetItemEditing,
                isLoadingEditForm,
                fetchBudgetItems,
                searchBudgetItem,
                getBudgetItemById,
                addOrEdit,
                removeBudgetById,
                clearBudgetItem,
            }}
            >
            {children}
        </BudgetContext.Provider>
    );    
}

export const useBudget = () => useContext(BudgetContext);