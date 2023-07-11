import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    transition: all 200ms;
    align-self: flex-end;
    flex-direction: column;
    /* margin-bottom: 4px; */
    align-self: flex-start;

    label {
        align-self: start;
        padding: 0 4px 2px 0;
    }

    input {
        width: 100%;
        font-size: inherit;
        background: #fff;
        min-height: 32px;
        border: 1px solid #949494;
        padding: 8px 16px;

        &:disabled {
            background: var(--gray6);
        }
    }

    input[type=number]::-webkit-inner-spin-button { 
        -webkit-appearance: none;
    }
    input[type=number] { 
        -moz-appearance: textfield;
        appearance: textfield;
    }    

    small {
        margin-top: 2px;
        align-self: start;
        text-align: left;
        color: red;
        min-height: 15px;
    }
`;