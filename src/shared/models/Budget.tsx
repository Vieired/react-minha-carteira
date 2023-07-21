export interface BudgetItem {
    id: string;
    description: string;
    amount: string;
    type: string;
    frequency: string;
    date: string;
    details: string;
}

export interface GeneralSearch {
    generalSearch: string
}