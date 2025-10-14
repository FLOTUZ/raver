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
import React from "react";

// Definimos el tipo de datos fusionado: es el tipo formateado (F)
// más una propiedad '__original' que contiene el tipo original (T).
export type RowData<T, F> = F & {
  __original: T;
};

// La interfaz ahora usa dos genéricos: T para el original y F para el formateado.
interface TableComponentProps<T, F> {
  // indexKey debe ser una clave del objeto formateado (F)
  indexKey: keyof F;
  // data ahora es el array de objetos fusionados
  data: RowData<T, F>[];
  // 'originalData' se elimina de las props, ya que está dentro de 'data'
  onSearch?: (value: string) => void;
  // onRowClick sigue esperando el tipo original T
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

// Se actualiza la firma del componente para aceptar <T, F>
export const TableComponent = <T, F>({
  indexKey: rowKey,
  columns,
  loadingState,
  data, // data es RowData<T, F>[]
  onSearch,
  onRowClick,
  totalPages,
  totalRows,
  rowsPerPage = 10,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}: TableComponentProps<T, F>) => {
  // Convertimos el tipo de 'data' para usarlo en la tabla.
  const typedData = data as any[];

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
          items={typedData} // Usamos los datos fusionados
          loadingContent={<Spinner />}
          loadingState={loadingState ? "loading" : "idle"}
        >
          {/* Aceptamos la firma de UN SOLO argumento que espera la librería (item) */}
          {(item) => {
            // El item es el objeto fusionado (Formatted + __original).
            const fusedItem = item as RowData<T, F>;
            const originalItem = fusedItem.__original;

            return (
              <TableRow
                key={getKeyValue(fusedItem, rowKey as string) as string}
                className="cursor-pointer"
                onClick={() => {
                  // Accedemos a la propiedad __original para el click handler
                  if (onRowClick) {
                    onRowClick(originalItem);
                  }
                }}
              >
                {(columnKey) => (
                  // Pintamos el campo formateado (F)
                  <TableCell>{getKeyValue(fusedItem, columnKey)}</TableCell>
                )}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </div>
  );
};
