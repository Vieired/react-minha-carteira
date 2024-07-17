import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

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
        /* z-index: 1; */

        /* &.ReactModal__Overlay--after-open {
            background-color: rgba(0, 0, 0, 0.75) !important;
        }    */
    }
    
    .ReactModal__Content {
        width: 50%;
        height: 70%;
        margin: auto auto;
        background-color: ${props => props.theme.colors.secondary} !important;
        color: ${props => props.theme.colors.white} !important;
        box-shadow: 0px 0px 8px 0px #a1a1a1;
        border-top-left-radius: 8px !important;
        border-bottom-left-radius: 8px !important;
        padding: 0 !important;
        /* padding: 1rem; */
        /* inset: calc(50% + (48px / 2)) auto auto 50%; !important */

        @media(max-width: 576px) {
            /* width: 90%; */
            width: auto;
        }

        /* > div {
            height: 100%;
        } */

        ul {
            li {
                list-style: none;
            }
        }

        /* footer {
            small {
                color: ${props => props.theme.colors.gray};
                display: flex;
                justify-content: end;
            }
        } */
    }

    .ReactModal__Overlay--after-open{
        opacity: 1;
    }

    .ReactModal__Overlay--before-close{
        opacity: 0;
    }
`;

export default GlobalStyled;