import styled, { css } from "styled-components";

interface Props {
    btnTheme: 'primary' | 'secondary' | 'link';
}

export const Container = styled.button<Props>`
    ${prop => {
    if (prop?.btnTheme === 'primary' || prop?.btnTheme === 'secondary')
        return css<Props>`
            /* width: 100%; */
            width: auto;
            margin: 7px 0;
            padding: 10px;
            background-color: ${(x:Props) => 
                x.btnTheme === "primary"
                ?
                prop => prop.theme.colors.success
                :
                x.btnTheme === "secondary"
                    ? prop => prop.theme.colors.secondary
                    : '#eee'
            };
            color: ${(x:Props) => 
                x.btnTheme === "primary"
                ?
                '#FFF'
                :
                x.btnTheme === "secondary"
                    ? prop => prop.theme.colors.btnTextSecondary
                    : '#eee'
            };
            transition: opacity .3s;
            border-radius: 4px;

            &:not(:disabled):hover {
                opacity: .8;
            }
        `;
    }}

    ${props => {
    if (props?.btnTheme === 'link')
        return css<Props>`
            width: auto;
            color: ${x => x.theme.colors.info};

            &:hover {
                text-decoration: underline;
            }
        `;
    }}    

    &:disabled {
        background-color: #eee;
        color: #949494;
    } 
`;