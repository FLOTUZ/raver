import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@heroui/react";

interface TableComponentProps<T> {
  indexKey: keyof T;
  data: any[];
  columns: { key: string; label: string }[];
  totalPages: number;
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const TableComponent = <T,>({
  indexKey: rowKey,
  columns,
  data,
  totalPages,
  totalRows,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}: TableComponentProps<T>) => {
  return (
    <div>
      <Table
        aria-label="Tabla parametrizable con paginación"
        classNames={{
          wrapper: "min-h-[222px]",
        }}
        topContent={
          totalPages > 0 && (
            <div className="flex w-full justify-center flex-col">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={currentPage}
                total={totalPages}
                onChange={onPageChange}
              />
              <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">
                  Total {data.length} of {totalRows}
                </span>
                <label className="flex items-center text-default-400 text-small">
                  Rows per page:
                  <select
                    className="bg-transparent outline-solid outline-transparent text-default-400 text-small"
                    defaultValue={rowsPerPage}
                    value={rowsPerPage}
                    onChange={onRowsPerPageChange}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                </label>
              </div>
            </div>
          )
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item[rowKey] as string}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
