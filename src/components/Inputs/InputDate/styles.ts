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

        .react-datepicker-wrapper {

            input {
                width: 100%;
                font-size: inherit;
                background: #fff;
                min-height: 32px;
                border: 1px solid #949494;
                padding: 8px 16px;   
            }
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