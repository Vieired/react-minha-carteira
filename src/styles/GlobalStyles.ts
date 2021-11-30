import { createGlobalStyle } from 'styled-components';

export const GlobalStyled = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }    

    html, body, #root {
        height: 100%;
    }

    *, button, input {
        border: 0;
        outline: 0;
        font-family: 'Roboto', sans-serif;
    }

    button {
        cursor: pointer;
    }

    .ReactModal__Overlay {
        opacity: 0;
        transition: opacity 200ms ease-in-out;
    }

    .ReactModal__Overlay--after-open{
        opacity: 1;
    }

    .ReactModal__Overlay--before-close{
        opacity: 0;
    }

    .ReactModal__Content {
        width: 40%;
        height: 50%;
        margin: auto auto;
        background-color: ${props => props.theme.colors.secondary} !important;
        color: ${props => props.theme.colors.white} !important;
        box-shadow: 0px 0px 8px 0px #a1a1a1;
        border-top-left-radius: 8px !important;
        border-bottom-left-radius: 8px !important;

        ul {
            li {
                list-style: none;
            }
        }

        footer {
            small {
                color: ${props => props.theme.colors.gray};
                display: flex;
                justify-content: end;
            }
        }
    }
`;

export default GlobalStyled;