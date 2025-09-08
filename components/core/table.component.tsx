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
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const TableComponent = <T,>({
  indexKey: rowKey,
  columns,
  data,
  totalPages,
  currentPage,
  onPageChange,
}: TableComponentProps<T>) => {
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
            page={currentPage}
            total={totalPages}
            onChange={onPageChange}
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
  );
};
