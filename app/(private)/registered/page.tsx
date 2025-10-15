"use client";

import { Button, Progress, useDisclosure } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { ModalComponent } from "@/components/common/modal.component";
import { TableComponent } from "@/components/core";
import { useQuery } from "@/hooks/useQuery";
import { PaginatedQuery, PaginatedResponse, PreRegister } from "@/interfaces";

type FormattedPreRegister = Omit<
  PreRegister,
  "ticket" | "created_at" | "updated_at"
> & {
  ticket: "PAGADO" | "PENDIENTE";
  created_at: string;
  updated_at: string;
};

const RegisteredPage = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
    onChange(isOpen) {
      if (!isOpen) {
        setSelectedRegister(null);
      }
    },
  });

  const [selectedRegister, setSelectedRegister] = useState<PreRegister | null>(
    null
  );

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
    <>
      <div className="flex flex-col gap-4 mb-48 p-4">
        <h1 className="text-2xl font-bold">Asistentes registrados</h1>
        <TableComponent<PreRegister, FormattedPreRegister>
          columns={[
            { key: "name", label: "Nombre" },
            { key: "email", label: "Correo" },
            { key: "telephone", label: "Telefono" },
            { key: "ticket", label: "Ticket" },
            { key: "created_at", label: "Creado" },
            { key: "id", label: "ID" },
          ]}
          currentPage={registered.current_page}
          data={registered.rows.map((preRegister) => ({
            // 1. Datos formateados (para pintar)
            ...preRegister,
            ticket: preRegister.ticket !== null ? "PAGADO" : "PENDIENTE",
            created_at: new Date(preRegister.created_at).toLocaleString(),
            updated_at: new Date(preRegister.updated_at).toLocaleString(),

            // 2. Registro Original (para el click handler)
            __original: preRegister,
          }))}
          indexKey={"id"}
          loadingState={isFetchingMore}
          rowsPerPage={registered.rows_per_page}
          totalPages={registered.pages}
          totalRows={registered.total_rows}
          onPageChange={(page) => {
            refetch({ page, rows_per_page: rowsPerPage });
          }}
          onRefresh={() => {
            refetch({
              page: registered.current_page,
              rows_per_page: rowsPerPage,
            });
          }}
          onRowClick={(row) => {
            setSelectedRegister(row);
            onOpen();
          }}
          onRowsPerPageChange={(event) => {
            refetch({
              page: registered.current_page,
              rows_per_page: parseInt(event.target.value, 10),
            });
            setRowsPerPage(parseInt(event.target.value, 10));
          }}
          onSearch={(value) => {
            refetch({ page: 1, rows_per_page: rowsPerPage, search: value });
          }}
        />
      </div>
      <ModalComponent
        body={
          <div className="flex flex-col gap-2">
            <Link
              href={`/registered/${selectedRegister?.id}?event_id=${selectedRegister?.event_id}`}
            >
              <Button
                className="w-full flex justify-between"
                color={selectedRegister?.ticket != null ? "success" : "primary"}
                disabled={selectedRegister?.ticket != null}
              >
                <div
                  className={`text-lg ${selectedRegister?.ticket != null ? "text-white" : ""}`}
                >
                  {selectedRegister?.ticket != null
                    ? "Ticket ya fué cobrado"
                    : "Cobrar ticket"}
                </div>
                <IoIosArrowForward />
              </Button>
            </Link>
          </div>
        }
        footer={
          <Button color="danger" variant="light" onPress={onClose}>
            Cerrar
          </Button>
        }
        header={<h3>{selectedRegister?.name}</h3>}
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default RegisteredPage;
