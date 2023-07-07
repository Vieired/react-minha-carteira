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
        
        h3 {
            margin-bottom: 32px;
        }

        &:first-child {
            display: flex;
            justify-content: end;

            button {
                height: 40px;
                width: 40px;
                font-size: 22px;
                background-color: ${props => props.theme.colors.primary};
                color: ${props => props.theme.colors.white};
            }
        }
    }
`;

export const ItemResult = styled.div`
    display: flex;
    border-top: solid grey 1px;
    justify-content: space-between;
    padding: 14px 0;

    p:last-child {
        font-size: 10px;
        color: ${props => props.theme.colors.gray};
    }
`;