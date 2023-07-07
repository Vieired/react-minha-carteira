import { createContext, useContext, useState } from "react";
import { BudgetItem } from "../shared/models/Budget";
import { budgetService } from "../services/budgetService";

interface Context {
    budgetItems: BudgetItem[];
    fetchBudgetItems: () => void;
}

interface Props {
    children?: React.ReactNode | React.ReactNode[];
};

export const BudgetContext = createContext<Context>({} as Context);

export const BudgetProvider: React.FC<Props> = ({  children }) => {
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);

    // #region
    const fetchBudgetItems = async () => {
        try {
            const response: BudgetItem[] = await budgetService.list();
            setBudgetItems(response);
        } catch (error) {
            console.log(error);
        }
    }
    //#endregion

    return (
        <BudgetContext.Provider
            value={{
                budgetItems,
                fetchBudgetItems,
            }}
            >
            {children}
        </BudgetContext.Provider>
    );    
}

export const useBudget = () => useContext(BudgetContext);