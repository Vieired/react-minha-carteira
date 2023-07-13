import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Toolbar = styled.div`
    display: flex;
    justify-content: end;

    button {
        display: flex;
        width: unset;
        gap: 8px;
        align-items: center;
    }
`;