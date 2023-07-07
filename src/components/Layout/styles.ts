import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 250px auto;
    grid-template-rows: 70px auto;
    grid-template-areas:
    'AS MH'
    'AS CT';

    height: 100vh;
    min-width: 315px;

    @media(max-width: 600px) {
        grid-template-columns: 100%;
        grid-template-rows: 70px auto;
        grid-template-areas:
        'MH'
        'CT';
    }

    .ReactModalPortal {


        display: flex;
        justify-content: end;
    }
`;

export const ContainerModal = styled.div`
    > div {

        &:first-child {
            display: flex;
            justify-content: end;

            button {
                height: 40px;
                width: 40px;
                font-size: 22px;
            }
        }
    }
`;