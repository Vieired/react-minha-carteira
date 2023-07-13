import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    column-gap: 16px;

    a {
        color: ${props => props.theme.colors.white};

        &:link, &:hover, &:visited, &:active {
            color: ${props => props.theme.colors.gray};
        }
    }

    a:last-child {
        color: ${props => props.theme.colors.white};

        &:link, &:hover, &:visited, &:active {
            color: ${props => props.theme.colors.gray};
        }
    }
`;