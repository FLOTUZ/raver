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
import React from "react";

interface TableComponentProps<T> {
  indexKey: keyof T;
  data: T[];
  columns: { key: string; label: string }[];
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
}

export const TableComponent = <T,>({
  indexKey: rowKey,
  columns,
  data,
  rowsPerPage = 4,
  onPageChange,
}: TableComponentProps<T>) => {
  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data, rowsPerPage]);

  return (
    <Table
      aria-label="Tabla parametrizable con paginación"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => {
              setPage(page);
              onPageChange?.(page);
            }}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {/* Usamos 'item[rowKey] as string' para la clave */}
        {(item) => (
          <TableRow key={item[rowKey] as string}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
