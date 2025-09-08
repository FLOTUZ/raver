"use client";

import { Progress } from "@heroui/react";

import { TableComponent } from "@/components/core";
import { useQuery } from "@/hooks/useQuery";
import { PreRegister } from "@/interfaces";

const RegisteredPage = () => {
  const { data: registered, loading } = useQuery<{}, PreRegister[]>({
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
        ]}
        data={registered.map((preRegister) => ({
          ...preRegister,
          ticket: preRegister.ticket ? "Si" : "No",
        }))}
        indexKey="id"
        rowsPerPage={4}
      />
    </div>
  );
};

export default RegisteredPage;
