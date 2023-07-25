import styled from "styled-components";
import loader from '../../assets/loader3.gif';

const Spinner = styled.div`
    width: 100%;
    min-height: 400px;
    background: url(${loader}) center no-repeat;
    background-size: 5rem;
`;

export const BigSpinner: React.FC = () => {
    return (
        <Spinner/>
    )
}