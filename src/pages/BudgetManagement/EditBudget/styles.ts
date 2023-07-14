import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const Buttons = styled.div`
    display: flex;
    justify-content: end;
    column-gap: 32px;

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