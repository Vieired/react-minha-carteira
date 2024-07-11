import styled from "styled-components";
import loader from '../../../assets/loader3.gif';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    &.loading-send::after {
      content: "";
      position: absolute;
      height: -webkit-fill-available;
      width: -webkit-fill-available;
      left: 250px;
      background: url(${loader}) #ffffffab center no-repeat;
      background-size: 5rem;
      margin-top: -25px;
      user-select: none;
      pointer-events: visiblestroke;
      transition: .5s;

      @media (max-width: 576px) {
        left: 0;
      }
    }

    > form {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`

export const Buttons = styled.div`
    display: flex;
    justify-content: end;
    gap: 0 32px;
    height: 40px;

    button {
        width: unset;
    }

    @media (max-width: 576px) {
        width: 100%;
        column-gap: 24px;
        justify-content: space-evenly;

        button {
            width: 100%;
        }
    }
`;