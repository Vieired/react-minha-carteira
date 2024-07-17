import styled from 'styled-components';

export const Container = styled.li`

    > button {
        background-color: ${props => props.theme.colors.tertiary};
        color: ${props => props.theme.colors.white};
        padding: .5rem;
        border-radius: 4px;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    > div {
        visibility: collapse;
        /* height: 0;
        padding: 8px;
        box-shadow: 2px 2px 11px 0px #000;
        margin-bottom: 16px;
        transition: .5s; */

        &.open {
            visibility: visible;
            padding: 8px;
            box-shadow: 2px 2px 5px 2px #00000075;
            margin-bottom: 16px;            
            /* height: 100vh; */
        }
    }
`;