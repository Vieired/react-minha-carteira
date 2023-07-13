import { Link } from "react-router-dom";

import { FaPencilAlt } from "react-icons/fa";

import { Container } from "./styles";

interface Props {
    itemId: number;
    children?: React.ReactNode | React.ReactNode[];
}

const Actions: React.FC<Props> = ({children, itemId}) => {
    
    return (
        <Container>
            <Link
                to={`/budget/edit/:${itemId}`}
                aria-label="Ação Editar Usuário"
            >
                <FaPencilAlt />
            </Link>
            {children}
        </Container>
    )
}
export default Actions;