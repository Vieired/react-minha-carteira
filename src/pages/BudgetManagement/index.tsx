import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useBudget } from "../../hooks/BudgetContext";
import ContentHeader from "../../components/ContentHeader";
import { BudgetItem } from "../../shared/models/Budget";

import { Container, Toolbar } from "./styles";
import Table from "../../components/Table";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import Actions from "./Actions";
import { FaTrash } from "react-icons/fa";


const BudgetManagement: React.FC = () => {

    const {
        budgetItems,
        fetchBudgetItems,
        removeBudgetById
    } = useBudget();

    const handleRemoveUserClick = (userId: number) => {
        removeBudgetById(userId);
    };

    const columns = [
        {
            name: 'Ações',
            cell: (row: any) => {
                return (
                    <Actions itemId={row.id} aria-label="Botões de ação">
                        <Link to="#" aria-label="Ação Remover Usuário">
                            <span onClick={() => handleRemoveUserClick(row.id)}>
                                <FaTrash />
                            </span>
                        </Link>
                    </Actions>
                )
            },
        },
        {
            name: 'Descrição',
            sortable: true,
            selector: (row: any) => row.description,
        },
        {
            name: 'Tipo',
            selector: (row: any) => row.type,
        },
        {
            name: 'Frequência',
            selector: (row: any) => row.frequency,
        },
        {
            name: 'Data',
            selector: (row: any) => formatDate(row.date),
        },
        {
            name: 'Valor (R$)',
            selector: (row: any) => formatCurrency(Number(row.amount)),
        }
    ];

    useEffect(() => {
        fetchBudgetItems();
        console.log(budgetItems);
    }, []);

    return (
        <Container>
            <ContentHeader
                title="Administração de Orçamentos"
                lineColor="#F7931B"
            />
            <Toolbar>
                <Link to={'/addbudget'} type="button">Adiconar Item de Orçamento</Link>
            </Toolbar>
            <br/>
            <Table
                columns={columns}
                data={budgetItems?.map((x:BudgetItem) => {
                    return ({
                        id: x.id,
                        description: x?.description || '-',
                        type: x?.type || '-',
                        frequency: x?.frequency || '-',
                        date: x?.date || '-',
                        amount: x?.amount || '-',
                    })
                })}
            />
        </Container>
    )
}

export default BudgetManagement;