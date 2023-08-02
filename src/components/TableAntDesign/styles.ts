import styled from "styled-components";

export const Container = styled.div`

    .ant-table-thead {

        .ant-table-cell {
            background-color: ${props => props.theme.colors.secondary};
            color: ${props => props.theme.colors.gray};
        }
    }

    tbody.ant-table-tbody {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.white};

        tr.ant-table-row {

            td.ant-table-cell-row-hover {
                background-color: ${props => props.theme.colors.tertiary};
            }
        }
    }

    .ant-pagination {

        li {
            > button > span.anticon svg,
            > a.ant-pagination-item-link span svg {
                color: ${props => props.theme.colors.white};
            }

            &.ant-pagination-item-active {
                background-color: ${props => props.theme.colors.gray};

                a {
                    color: ${props => props.theme.colors.black};
                }
            }

            &.ant-pagination-jump-next a.ant-pagination-item-link div.ant-pagination-item-container span.ant-pagination-item-ellipsis {
                color: ${props => props.theme.colors.white};
            }
        }

        a,
        button {
            color: ${props => props.theme.colors.white};
        }
    }
`;