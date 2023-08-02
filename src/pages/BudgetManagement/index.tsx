import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useBudget } from "../../hooks/BudgetContext";
import { BudgetItem } from "../../shared/models/Budget";
import { DomainSelectOption } from "../../shared/models/Domains";
import { BUDGETS_FREQUENCY, BUDGETS_TYPE } from "../../shared/consts";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import { FaPlus, FaTrash } from "react-icons/fa";
import ContentHeader from "../../components/ContentHeader";
import Table from "../../components/Table";
import TableAntDesign from "../../components/TableAntDesign";
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
            width: '70px',
            cell: (row: any) => {
                return (
                    <Actions itemId={row.id} aria-label="Botões de ação">
                        {/* <Link to="#" aria-label="Ação Remover Usuário">
                            <span onClick={() => handleRemoveItemClick(row.id)}>
                                <FaTrash />
                            </span>
                        </Link> */}
                        <button onClick={() => handleRemoveItemClick(Number(row.id))}>
                            <FaTrash />
                        </button>                        
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

    const columnsAnt: any = [
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            width: 70,
        },        
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',            
            width: 100,
        },
        {
            title: 'Frequência',
            dataIndex: 'frequency',
            key: 'frequency',
            width: 120,
        },
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
            width: 120,
            align: 'right',
        },                    
        {
            title: 'Valor (R$)',
            dataIndex: 'amount',
            key: 'amount',
            width: 150,
            align: 'right',
        },
    ];

    const handleRemoveItemClick = (itemId: number) => {
        removeBudgetById(itemId);
    };

    const handleClick = () => {
        push('/addbudget')
    }

    useEffect(() => {
        if(budgetItems?.length === 0) {
            fetchBudgetItems();
        }
    }, [budgetItems?.length, fetchBudgetItems]);

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
            <TableAntDesign
                columns={columnsAnt}
                dataSource={budgetItems?.map((item:BudgetItem) => {
                    return {
                        id: item.id,
                        actions: (
                            <Actions itemId={Number(item.id)} aria-label="Botões de ação">
                                {/* <Link to="#" aria-label="Ação Remover Usuário">
                                    <span onClick={() => handleRemoveItemClick(Number(item.id))}>
                                        <FaTrash />
                                    </span>
                                </Link> */}
                                <button onClick={() => handleRemoveItemClick(Number(item.id))}>
                                    <FaTrash />
                                </button>
                            </Actions>
                        ),
                        description: item?.description || '-',
                        type: BUDGETS_TYPE.find(
                            (x: DomainSelectOption) =>  x.value === item?.type
                        )?.label || '',
                        frequency: BUDGETS_FREQUENCY.find(
                            (x: DomainSelectOption) => x.value === item?.frequency
                        )?.label || '',
                        date: item?.date ? formatDate(item.date) : '-',
                        amount: item?.amount ? formatCurrency(Number(item.amount)) : '-',
                        details: item.details,
                    }
                })}
            />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
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