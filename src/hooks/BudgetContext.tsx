import { createContext, useContext, useState } from "react";
import { BudgetItem } from "../shared/models/Budget";
import { budgetService } from "../services/budgetService";
import { toast } from "react-toastify";

interface Context {
    budgetItems: BudgetItem[];
    budgetItemsFound: BudgetItem[];
    budgetItemEditing: BudgetItem|null;
    fetchBudgetItems: () => void;
    searchBudgetItem: (term: string) => void;
    getBudgetItemById: (id: number) => void;
    edit: (item: BudgetItem, callback: () => void) => void;
    removeBudgetById: (id: number) => void;
}

interface Props {
    children?: React.ReactNode | React.ReactNode[];
};

export const BudgetContext = createContext<Context>({} as Context);

export const BudgetProvider: React.FC<Props> = ({  children }) => {
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
    const [budgetItemEditing, setBudgetItemEditing] = useState<BudgetItem|null>(null);
    const [budgetItemsFound, setBudgetItemsFound] = useState<BudgetItem[]>([]);

    // #region
    const fetchBudgetItems = async () => {
        try {
            const response: BudgetItem[] = await budgetService.list();
            setBudgetItems(response);
        } catch (error) {
            alert(`Erro: ${error}`);
            console.log(error);
        }
    }

    const searchBudgetItem = async (term: string) => {
        try {
            const response: BudgetItem[] = await budgetService.search(term);
            setBudgetItemsFound(response);
        } catch (error) {
            console.log(error);
        }
    }

    const getBudgetItemById = async (id: number) => {
        // setIsLoading(true);
        try {
            const response: BudgetItem = await budgetService.read(id);
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
            } as BudgetItem)
        } catch (error) {
            console.log(error);
        } finally {
            // setIsLoading(false);
        }
      }  

    const edit = async (item: BudgetItem, callback: () => void) => {
        try {
            // setIsLoading(true);
            await budgetService.update(item);
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
        } catch (error) {
            alert(`Erro: ${error}`);
            console.log(error);
        }
    }

    const removeBudgetById = async (id: number) => {
        alert("Item removido com sucesso.");
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
        //       console.log(error);
        //     }
        //   }
        // });
      }    
    //#endregion

    return (
        <BudgetContext.Provider
            value={{
                budgetItems,
                budgetItemsFound,
                budgetItemEditing,
                fetchBudgetItems,
                searchBudgetItem,
                getBudgetItemById,
                edit,
                removeBudgetById,
            }}
            >
            {children}
        </BudgetContext.Provider>
    );    
}

export const useBudget = () => useContext(BudgetContext);