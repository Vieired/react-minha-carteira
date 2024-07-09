import { useState } from "react";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import { BudgetItem } from "../../shared/models/Budget";
import { Container } from "./styles";

interface Props {
    columns: ColumnsType<BudgetItem>;
    dataSource: any[];
    responsive?: boolean;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}

const TableAntDesign: React.FC<Props> = ({
    columns,
    dataSource,
}) => {
    // const { loading } = useLoader();
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
          current: 1,
          pageSize: 10,
        },
    });

    return (
        <Container>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey={(row) => row.id}
                // pagination={tableParams.pagination}
                scroll={{ x: 800 }}
                // sortDirections={['descend', 'ascend']}
            />
        </Container>
    )
}

export default TableAntDesign;