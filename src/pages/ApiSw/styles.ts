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
    background-color: red;
    background: url(${loader}) center no-repeat;
    background-size: 5rem;
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