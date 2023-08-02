import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    column-gap: 16px;

    /* &:focus-within {
        border: solid blue 3px;
    } */

    a {
        color: ${props => props.theme.colors.white};
        border-radius: 6px;
        outline: 4px transparent #91caff;

        &:link, &:hover, &:visited, &:active {
            color: ${props => props.theme.colors.gray};
        }

        &:focus {
            outline: 4px solid #91caff;
            outline-offset: 1px;
            transition: outline-offset 0s,outline 0s;
        }
    }

    a:last-child {
        color: ${props => props.theme.colors.white};

        &:link, &:hover, &:visited, &:active {
            color: ${props => props.theme.colors.gray};
        }
    }
`;