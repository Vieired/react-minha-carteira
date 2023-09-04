import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    transition: all 200ms;
    align-self: flex-end;
    flex-direction: column;
    align-self: flex-start;

    label {
        align-self: start;
        align-self: center;
    }

    span {
        display: flex;
        gap: 16px;
    }

    input {
        font-size: inherit;
        background: #fff;
        /* min-height: 32px; */
        border: 1px solid #949494;
        padding: 8px 16px;
        margin: 0;

        &:disabled {
            background: var(--gray6);
        }
    }

    small {
        margin-top: 2px;
        align-self: start;
        text-align: left;
        color: red;
        min-height: 15px;
    }
`;