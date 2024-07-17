import styled from 'styled-components';

export const Container = styled.li`

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