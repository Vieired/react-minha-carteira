import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: var(--space-x-small);

  /* &.ck-display-mode {
    .ck.ck-editor__top.ck-reset_all {
      display: none;
    }

    .ck-editor__main {
      .ck.ck-editor__editable_inline {
        height: 159.42px;
      }
    }
  } */

  label {
    display: flex;
    align-items: center;
    column-gap: var(--space-x-small);
    height: 16px;

    svg {
      font-size: var(--font-paragraph);
    }
  }

  .ck-editor__main {
    .ck.ck-content > p,
    .ck.ck-content > ul,
    .ck.ck-content > ol,
    .ck.ck-content > blockquote,
    .ck.ck-content > pre {
      margin-bottom: var(--ck-spacing-large);
    }

    .ck.ck-editor__editable_inline {
      height: 490px;
      color: #000;

      > :last-child {
        margin-bottom: var(--ck-spacing-large);
      }
    }

    .ck-content h4 {
      font-size: 18px !important;
    }

    h3 {
      font-size: 22px !important;
    }

    h2 {
      font-size: 26px !important;
    }

    ul,
    ol {
      margin-left: 2.666em;
    }

    ol {
      list-style-type: decimal;
    }

    ul {
      list-style-type: disc !important;

      li {
        display: list-item !important;
        text-align: left !important;
      }
    }

    a {
      text-decoration: underline;
    }

    strong {
      font-weight: bold;
    }

    i {
      font-style: italic;
    }
  }

  .m-zoom {
    z-index: 2; // fixs ckeditor overlay
  }

  @media print {
    button#btnZoom {
      display: none;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-items: center;

  width: 24px;
  height: 6px;
  margin: 5px;
`;

export const ModalContainer = styled.div`
  display: flex;

  .ck-editor__main {
    width: 90vw;

    .ck.ck-content > p,
    .ck.ck-content > ul,
    .ck.ck-content > ol,
    .ck.ck-content > blockquote,
    .ck.ck-content > pre {
      //margin-bottom: var(--ck-spacing-large);

      .ck.ck-editor__editable_inline > :last-child {
        //margin-bottom: var(--ck-spacing-large);
      }
    }

    .ck.ck-editor__editable_inline {
      min-height: 350px;

      > :last-child {
        margin-bottom: var(--ck-spacing-large);
      }
    }
  }
`;
