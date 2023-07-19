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
import { DomainSelectOption } from "../../shared/models/Domains";
import { BUDGETS_FREQUENCY, BUDGETS_TYPE } from "../../shared/consts";


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
            width: '70px',
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
            width: '100px',
            selector: (row: any) => row.type,
        },
        {
            name: 'Frequência',
            width: '120px',
            selector: (row: any) => row.frequency,
        },
        {
            name: 'Data',
            width: '120px',
            right: true,
            selector: (row: any) => formatDate(row.date),
        },
        {
            name: 'Valor (R$)',
            width: '150px',
            right: true,            
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
                data={budgetItems?.map((budgetItems:BudgetItem) => {
                    return ({
                        id: budgetItems.id,
                        description: budgetItems?.description || '-',
                        type: BUDGETS_TYPE.find(
                            (x: DomainSelectOption) =>  x.value === budgetItems?.type
                        )?.label || '',
                        frequency: BUDGETS_FREQUENCY.find(
                            (x: DomainSelectOption) => x.value === budgetItems?.frequency
                        )?.label || '',
                        date: budgetItems?.date || '-',
                        amount: budgetItems?.amount || '-',
                    })
                })}
            />
        </Container>
    )
}

export default BudgetManagement;