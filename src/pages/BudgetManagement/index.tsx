import { Link } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import { Container } from "./styles";

const BudgetManagement: React.FC = () => {

    return (
        <Container>
            <ContentHeader
                title="Administração de Orçamentos"
                lineColor="#F7931B"
            />
            <Link to={'/addbudget'} type="button">Adiconar Item de Orçamento</Link>
            <br/>
            <p>Tabela...</p>
        </Container>
    )
}

export default BudgetManagement;