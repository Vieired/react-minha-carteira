import React from 'react';
import Modal from 'react-modal';

import MainHeader from '../MainHeader';
import Aside from '../Aside';
import Content from '../Content';
import { useModal } from '../../hooks/ModalContext';
import { useBudget } from '../../hooks/BudgetContext';
import { BudgetItem } from '../../shared/models/Budget';

import { Container, ContainerModal, ItemResult } from './styles';
import formatDate from '../../utils/formatDate';


const Layout: React.FC = ({ children }) => {

    const { modalIsOpen, toggleModal } = useModal();
    const { budgetItemsFound } = useBudget();

    return (
        <Container>
            <MainHeader />
            <Aside />
            <Content>{ children }</Content>
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                <ContainerModal>
                    <div>
                        <button onClick={toggleModal} autoFocus>X</button>
                    </div>
                    <div>
                        <h3>{`Resultados (${budgetItemsFound.length || 0})`}</h3>
                        {budgetItemsFound.map((item: BudgetItem, idx) => (
                            <ItemResult key={idx}>
                                <p>{item.description}</p>
                                <p>{item.amount}</p>
                                <p>{item.type}</p>
                                <p>{formatDate(item.date)}</p>
                            </ItemResult>
                        ))}
                    </div>
                </ContainerModal>
            </Modal>
        </Container>
    )
};

export default Layout;