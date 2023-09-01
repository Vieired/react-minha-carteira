import styled from "styled-components";
import defaultImage from "../../assets/img/perfil-vazio.png";

const squareSize = 247;

export const Wrapper = styled.div`
    width: ${squareSize}px;
    min-width: ${squareSize}px;
    height: min-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > span {
        display: flex;
        align-self: start;

        @media (max-width: 768px) {
            align-self: center;
        }
    }

    > small {
        color: var(--secondary);

        &.errors {
            margin-top: 2px;
            align-self: start;
            text-align: left;
            color: red;
            min-height: 15px;
        }
    }
`;

export const Container = styled.div`
    overflow: hidden;
    height: 100%;
    min-height: 100%;
    min-width: 100%;
    position: relative;
    height: ${squareSize}px;

    @media (max-width: 576px) {
        max-height: ${squareSize}px;
    }

    aside {
        display: 'flex';
        flex-direction: 'row';
        flex-wrap: 'wrap';
        margin-top: 16;
        min-width: 100%;

        img {
            display: block;
            max-width: 100%;
            min-width: 100%;
        }

        &.invalid {
            border: 2px solid red;
        }
    }
`;

const getColor = (props: any) => {
    if(props.isDragAccept || props.isDragReject) {
        return '#ccc';
    }
    // if (props.isDragAccept) {
    //     return '#00e676';
    // }
    // if (props.isDragReject) {
    //     return '#ff1744';
    // }
    if (props.isFocused) {
        return '#2196f3';
    }
    return '#ffffff';
}

export const Wrap = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    border-color: #fff;
    border: 2px solid ${props => getColor(props)};

    &.empty {
        background: url(${defaultImage}) center / 100% 100% no-repeat;
        filter: opacity(0.5);
    }

    &:hover {
        cursor: pointer;
    }

    p {
        font-size: 12px;
        color: var(--secondary);
        background: green;
        background: transparent;
    }
`;