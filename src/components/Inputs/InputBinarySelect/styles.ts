import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* min-width: 150px; */

    label {
        align-self: start;
        padding: 0 4px 2px 0;
    }

    > div {
        display: flex;
        flex-direction: row;
    }

    .react-select-container {
        align-content: 'flex-start';
        /* width: 153px; */
    }

    small {
        margin-top: 2px;
        align-self: start;
        text-align: left;
        color: red;
        min-height: 15px;
    }
`;