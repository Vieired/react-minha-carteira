import styled from "styled-components";

export const Container = styled.div`

    .rdt_TableHead {
        .rdt_TableHeadRow {
            background-color: ${props => props.theme.colors.secondary};
            color: ${props => props.theme.colors.gray};
        }
    }

    .rdt_TableHeadRow, .rdt_TableRow {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
        border-bottom-color: ${props => props.theme.colors.gray};
        min-height: 51px;
    }

    .rdt_TableHeadRow:first-of-type {
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: ${props => props.theme.colors.gray};
    }

    .rdt_TableRow:last-of-type {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: ${props => props.theme.colors.gray};
    }

    .rdt_TableCol:first-of-type,
    .rdt_TableCell:first-of-type {
        padding-left: 0
    }

    .rdt_TableCol:last-of-type,
    .rdt_TableCell:last-of-type {
        padding-right: 0
    }

    .rdt_Pagination {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.white};
        color: ${props => props.theme.colors.gray};
    }
`;