import {
  Input,
  Pagination,
  Spinner,
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
  onSearch?: (value: string) => void;
  onRowClick?: (row: T) => void;
  columns: { key: string; label: string }[];
  loadingState?: boolean;
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
  loadingState,
  data,
  onSearch,
  onRowClick,
  totalPages,
  totalRows,
  rowsPerPage = 10,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}: TableComponentProps<T>) => {
  return (
    <div>
      <Table
        aria-label="Tabla parametrizable con paginación"
        bottomContent={
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
                <span className="text-default-400 text-small mt-2">
                  Total {data.length} de {totalRows}
                </span>
                <label className="flex items-center text-default-400 text-small">
                  Filas por página:
                  <select
                    className="bg-transparent outline-solid outline-transparent text-default-400 text-small"
                    value={rowsPerPage}
                    onChange={onRowsPerPageChange}
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </label>
              </div>
            </div>
          )
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
        topContent={
          onSearch && (
            <Input
              className="w-full"
              placeholder="Buscar..."
              onValueChange={(value) => onSearch(value)}
            />
          )
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No hay datos"}
          items={data}
          loadingContent={<Spinner />}
          loadingState={loadingState ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow
              key={item[rowKey] as string}
              className="cursor-pointer"
              onClick={() => (onRowClick ? onRowClick(item) : undefined)}
            >
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
