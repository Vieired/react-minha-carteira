import React from 'react';
import ReactModal from 'react-modal';
import Button from '../Inputs/Button';
import {
    Container,
    Head,
    Body,
    Footer,
    Buttons,
} from './styles';

interface Props {
    isOpen: boolean;
    // title: string|React.ReactElement<HTMLElement>;
    title: string;
    contentLabel?: string;
    appElement: any;
    ariaHideApp?: boolean;
    // children?: React.ReactNode | React.ReactNode[];
    children?: React.ReactChild | React.ReactChild[];
    onRequestClose: () => void;
    onAfterClose: () => void;
}

const Modal: React.FC<Props> = ({
    isOpen,
    title = "",
    contentLabel = "",
    appElement,
    ariaHideApp = false,
    children = <></>,
    onRequestClose,
    onAfterClose,
}) => {
    // const onAfterClose = () => {
    //     console.log("Modal já está fechado")
    // }

    return (
        <Container>
            <ReactModal
                isOpen={isOpen}
                contentLabel={contentLabel}
                appElement={appElement}
                ariaHideApp={ariaHideApp}
                onRequestClose={onRequestClose}
                onAfterClose={onAfterClose}
            >

                <Head className="head-do-modal">
                    <h1>{title}</h1>
                </Head>

                <Body>
                    {children}
                </Body>

                <Footer>
                    <Buttons>
                        <Button btnTheme='primary' onClick={onRequestClose}>Fechar</Button>
                        {/* <Button btnTheme='primary'>Salvar</Button> */}
                    </Buttons>
                </Footer>
            </ReactModal>
        </Container>
    )
};

export default Modal;