import styled from 'styled-components'

export const Container = styled.div`
    grid-area: MH;

    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.secondary};

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 10px;

    border-bottom: 1px solid ${props => props.theme.colors.gray};
`;

export const Profile = styled.div`
    color: ${props => props.theme.colors.white};
`;

export const Welcome = styled.h3`

`;

export const Img = styled.img`
    width: 19px;
`;

export const UserName = styled.span`

`;

export const Search = styled.div`
    
    form {
        display: flex;
        flex-direction: row;
    }

    input {
        padding: 8px;
        border-radius: 8px 0 0 8px;
    }

    button {
        padding: 0px 16px;
        border-radius: 0 8px 8px 0;
        font-size: 21px;
        vertical-align: middle;
        height: 33px;

        &:not(:disabled) {
            background: ${props => props.theme.colors.info};
            color: ${props => props.theme.colors.white};
        }
    }
`;