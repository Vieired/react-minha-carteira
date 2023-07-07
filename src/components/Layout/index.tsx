import React from 'react';
import Modal from 'react-modal';

import { Container, ContainerModal } from './styles';

import MainHeader from '../MainHeader';
import Aside from '../Aside';
import Content from '../Content';
import { useModal } from '../../hooks/ModalContext';
import { useBudget } from '../../hooks/BudgetContext';
import { BudgetItem } from '../../shared/models/Budget';

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
                        <button onClick={toggleModal}>X</button>
                    </div>
                    <div>
                        <h3>Resultados da busca:</h3>
                        {budgetItemsFound.map((item: BudgetItem, idx) => (
                            <div key={idx}>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </ContainerModal>
            </Modal>
        </Container>
    )
};

export default Layout;