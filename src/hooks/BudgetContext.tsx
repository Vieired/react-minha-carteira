import { createContext, useContext, useState } from "react";
import { BudgetItem } from "../shared/models/Budget";
import { budgetService } from "../services/budgetService";

interface Context {
    budgetItems: BudgetItem[];
    budgetItemsFound: BudgetItem[];
    fetchBudgetItems: () => void;
    searchBudgetItem: (term: string) => void;
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
    //#endregion

    return (
        <BudgetContext.Provider
            value={{
                budgetItems,
                budgetItemsFound,
                fetchBudgetItems,
                searchBudgetItem,
            }}
            >
            {children}
        </BudgetContext.Provider>
    );    
}

export const useBudget = () => useContext(BudgetContext);