import api from "./api";
import { BudgetItem } from "../shared/models/Budget";

const ENDPOINT = 'expenses';

async function list(): Promise<BudgetItem[]> {
    const { data } = await api.get(`${ENDPOINT}`);
    return data;
}

export const budgetService = {
    list,
};