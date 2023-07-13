import { createContext, useContext, useState } from "react";
import { BudgetItem } from "../shared/models/Budget";
import { budgetService } from "../services/budgetService";

interface Context {
    budgetItems: BudgetItem[];
    budgetItemsFound: BudgetItem[];
    fetchBudgetItems: () => void;
    searchBudgetItem: (term: string) => void;
    removeBudgetById: (id: number) => void;
}

interface Props {
    children?: React.ReactNode | React.ReactNode[];
};

export const BudgetContext = createContext<Context>({} as Context);

export const BudgetProvider: React.FC<Props> = ({  children }) => {
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
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
                fetchBudgetItems,
                searchBudgetItem,
                removeBudgetById,
            }}
            >
            {children}
        </BudgetContext.Provider>
    );    
}

export const useBudget = () => useContext(BudgetContext);