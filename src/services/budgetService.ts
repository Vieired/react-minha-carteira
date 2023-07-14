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

async function read(id: number): Promise<BudgetItem> {
    const { data } = await api.get(`${ENDPOINT}/${id}`);
    return data;
}

async function update(item: BudgetItem): Promise<BudgetItem> {
    const { data } = await api.put(`${ENDPOINT}/${item.id}`, item);
    return data;
}

export const budgetService = {
    list,
    search,
    read,
    update,
};