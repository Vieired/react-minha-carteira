import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    label {
        align-self: start;
        padding: 0 4px 2px 0;
    }

    > input {
        width: 100%;
        font-size: inherit;
        background: #fff;
        min-height: 32px;
        border: 1px solid #949494;
        padding: 8px 16px;   
    }

    small {
        margin-top: 2px;
        align-self: start;
        text-align: left;
        color: red;
        min-height: 15px;
    }
`;