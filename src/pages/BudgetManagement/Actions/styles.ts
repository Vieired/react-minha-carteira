import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    column-gap: 16px;

    /* &:focus-within {
        border: solid blue 3px;
    } */

    a, button {
        color: ${props => props.theme.colors.gray};
        border-radius: 6px;
        outline: 4px solid transparent;
        background-color: transparent;

        /* &:link, &:visited, &:active {
            color: ${props => props.theme.colors.gray};
        } */

        &:hover {
            color: ${props => props.theme.colors.white};
        }        

        &:focus {
            outline: 4px solid #91caff;
            outline-offset: 1px;
            transition: outline-offset 0s,outline 0s;
        }
    }

    /* a:last-child, button:last-child {
        color: ${props => props.theme.colors.white};

        &:link, &:hover, &:visited, &:active {
            color: ${props => props.theme.colors.gray};
        }
    } */
`;