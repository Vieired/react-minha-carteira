import { createContext, useContext, useState } from "react";

interface Context {
    modalIsOpen: boolean;
    toggleModal: () => void;
}

interface Props {
    children?: React.ReactNode | React.ReactNode[];
};

export const ModalContext = createContext<Context>({} as Context);

export const ModalProvider: React.FC<Props> = ({  children }) => {
    const [modalIsOpen, setOpenModal] = useState<boolean>(false);

    const toggleModal = (): void => {
        setOpenModal(!modalIsOpen)
    }

    return (
        <ModalContext.Provider
            value={{
                modalIsOpen,
                toggleModal,
            }}
            >
            {children}
        </ModalContext.Provider>
    );    
}

export const useModal = () => useContext(ModalContext);