import styled from 'styled-components';
import loader from '../../assets/loader3.gif';

export const Container = styled.div`

`;

export const Header = styled.h1`

`;

export const Content = styled.main`

`;

export const Loading = styled.div`
    width: 100%;
    min-height: 400px;
    background: url(${loader}) center no-repeat;
    background-size: 5rem;
`;

export const LoadingSectionModal = styled.div`
    width: 100%;
    min-height: 50px;
    background: url(${loader}) center no-repeat;
    background-size: 3rem;
`;

export const Paginate = styled.footer`
    justify-content: end;
    display: flex;
    gap: 10px;

    button {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background-color: ${props => props.theme.colors.tertiary};
        color: ${props => props.theme.colors.white};
    }

    small {
        align-self: center;
    }
`;

export const Metadata = styled.footer`
    small {
        display: flex;
        justify-content: end;
        color: #4f5473;
    }
`;

export const StarshipUL = styled.ul`
    gap: 4px;
    display: flex;
    flex-direction: column;
`;

export const HomePlanet = styled.div`
    display: flex;
    flex-direction: row;

    > span:first-of-type {
        white-space: pre;
    }

    > span:last-of-type {
        width: 30%;
    }
`;