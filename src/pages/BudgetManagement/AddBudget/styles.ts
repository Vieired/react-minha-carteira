import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    > form {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`

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