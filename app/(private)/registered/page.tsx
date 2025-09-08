"use client";

import { Progress } from "@heroui/react";

import { TableComponent } from "@/components/core";
import { useQuery } from "@/hooks/useQuery";
import { PaginatedResponse, PreRegister } from "@/interfaces";

const RegisteredPage = () => {
  const {
    data: registered,
    loading,
    refetch,
  } = useQuery<{}, PaginatedResponse<PreRegister>>({
    url: "/api/register",
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

  if (!registered) {
    return <div>No hay registros</div>;
  }

  return (
    <div className="flex flex-col gap-4 mb-48 p-4">
      <h1>Registros</h1>
      <TableComponent
        columns={[
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
        totalPages={registered.pages}
        onPageChange={(page) => {
          refetch({ page });
        }}
      />
    </div>
  );
};

export default RegisteredPage;
