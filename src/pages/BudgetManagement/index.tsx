import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { useBudget } from "../../hooks/BudgetContext";
import ContentHeader from "../../components/ContentHeader";
import { BudgetItem } from "../../shared/models/Budget";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import { FaPlus, FaTrash } from "react-icons/fa";
import Table from "../../components/Table";
import Actions from "./Actions";
import Button from "../../components/Inputs/Button";

import { Container, Toolbar } from "./styles";


const BudgetManagement: React.FC = () => {

    const {
        budgetItems,
        fetchBudgetItems,
        removeBudgetById
    } = useBudget();
    const { push } = useHistory();

    const columns = [
        {
            name: 'Ações',
            cell: (row: any) => {
                return (
                    <Actions itemId={row.id} aria-label="Botões de ação">
                        <Link to="#" aria-label="Ação Remover Usuário">
                            <span onClick={() => handleRemoveItemClick(row.id)}>
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

    const handleRemoveItemClick = (itemId: number) => {
        removeBudgetById(itemId);
    };

    const handleClick = () => {
        push('/addbudget')
    }

    useEffect(() => {
        fetchBudgetItems();
    }, []);

    return (
        <Container>
            <ContentHeader
                title="Administração de Orçamentos"
                lineColor="#F7931B"
            />
            <Toolbar>
                {/* <Link to={'/addbudget'} type="button">Adicionar Item de Orçamento</Link> */}
                <Button btnTheme="primary" onClick={handleClick}>
                    <FaPlus/>
                    Adicionar Item de Orçamento
                </Button>
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