import api from "./api";
import { BudgetItem } from "../shared/models/Budget";

const ENDPOINT = 'budgets';

async function list(): Promise<BudgetItem[]> {
    const { data } = await api.get(`${ENDPOINT}`);
    return data;
}

async function search(term: string): Promise<BudgetItem[]> {
    const { data } = await api.get(`${ENDPOINT}`);

    // return data.filter((x: BudgetItem) => 
    //     x.description.toLowerCase() === term.toLowerCase()
    // );

    return data.filter((x: BudgetItem) => {
        return x.description.toLowerCase().match(term.toLowerCase()) ? x : false;
    });
}

export const budgetService = {
    list,
    search,
};