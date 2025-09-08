"use client";

import { Progress } from "@heroui/react";
import { useState } from "react";

import { TableComponent } from "@/components/core";
import { useQuery } from "@/hooks/useQuery";
import { PaginatedQuery, PaginatedResponse, PreRegister } from "@/interfaces";

const RegisteredPage = () => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const {
    data: registered,
    loading,
    isFetchingMore,
    refetch,
  } = useQuery<PaginatedQuery, PaginatedResponse<PreRegister>>({
    url: "/api/register",
    keepData: true,
  });

  if (loading) {
    return (
      <Progress
        isIndeterminate
        aria-label="Loading..."
        className="w-full"
        size="sm"
      />
    );
  }

  if (registered == null) {
    return <div>No hay registros</div>;
  }

  return (
    <div className="flex flex-col gap-4 mb-48 p-4">
      <h1>Registros</h1>
      <TableComponent
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Nombre" },
          { key: "email", label: "Correo" },
          { key: "telephone", label: "Telefono" },
          { key: "ticket", label: "Ticket" },
          { key: "created_at", label: "Creado" },
          { key: "updated_at", label: "Actualizado" },
        ]}
        currentPage={registered.current_page}
        data={registered.rows.map((preRegister) => ({
          ...preRegister,
          ticket: preRegister.ticket !== null ? "Si" : "No",
          created_at: new Date(preRegister.created_at).toLocaleString(),
          updated_at: new Date(preRegister.updated_at).toLocaleString(),
        }))}
        indexKey={"id"}
        loadingState={isFetchingMore}
        rowsPerPage={registered.rows_per_page}
        totalPages={registered.pages}
        totalRows={registered.total_rows}
        onPageChange={(page) => {
          refetch({ page, rows_per_page: rowsPerPage });
        }}
        onRowsPerPageChange={(event) => {
          refetch({
            page: registered.current_page,
            rows_per_page: parseInt(event.target.value, 10),
          });
          setRowsPerPage(parseInt(event.target.value, 10));
        }}
      />
    </div>
  );
};

export default RegisteredPage;
