import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    /* gap: 40px; */
    flex-direction: column;
`;

export const Head = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1rem;
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow: auto;
    gap: 16px;
    height: calc(100% - 70px - 72px);
    background-color: ${props => props.theme.colors.primary};
`;

export const Footer = styled.div`
    display: flex;
    padding: 1rem;
    width: 100%;
    justify-content: end;
    bottom: 0;
    position: absolute;

    > div {
        gap: 32px;

        button {
            width: 100px;
        }
    }
`;

export const Buttons = styled.div`
    display: flex;
    justify-content: end;
    gap: 0 32px;
    height: 40px;

    button {
        width: unset;
    }

    @media (max-width: 576px) {
        width: 100%;
        column-gap: 24px;
        justify-content: space-evenly;

        button {
            width: 100%;
        }
    }
`;