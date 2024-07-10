import DataTable, { TableRow } from "react-data-table-component";
// import { useLoader } from "../../shared/contexts/LoadingContext";
// import Spinner from "../Spinner";
import { Container } from "./styles";

interface Props {
    columns: any;
    data: TableRow[];
    responsive?: boolean;
    label?: string;
}

const Table: React.FC<Props> = ({
    columns,
    data,
    responsive = true,
    label = ""
}) => {
    // const { loading } = useLoader();

    return (
        <Container>
            <DataTable
                title={label}
                columns={columns}
                data={data}
                // progressPending={loading}
                // progressComponent={<Spinner />}
                progressComponent={<p>Carregando...</p>}
                noDataComponent={
                    <p style={{lineHeight:'normal'}}>
                        Nenhum registro para mostrar.
                    </p>
                }
                pagination
                paginationComponentOptions={{
                    rowsPerPageText: 'Linhas por página',
                    rangeSeparatorText: 'de',
                    selectAllRowsItem: true,
                    selectAllRowsItemText: 'Todos',
                }}
                customStyles={{
                    headRow: {
                        style: {
                            fontSize: '1rem',
                            // backgroundColor: 'var(--gray5)',
                        },
                    },
                    cells: {
                        style: {
                            fontSize: '1rem',
                            // backgroundColor: '#fff',
                        },
                    },
                }}
                responsive={responsive}
            />
        </Container>
    )
}

export default Table;