import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async $allOperations({ operation, model, args, query }) {
        console.log(`[Prisma] ${model}.${operation}`, JSON.stringify(args));
        try {
          const result = await query(args);

          console.log(`[Prisma] ${model}.${operation} success`);

          return result;
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
              case "P2002":
                throw {
                  code: "DUPLICATE",
                  message: `Ya existe un registro duplicado en ${model}`,
                };
              case "P2003":
                throw {
                  code: "FOREIGN_KEY",
                  message: "Error de integridad referencial",
                };
              case "P2025":
                throw { code: "NOT_FOUND", message: `${model} no encontrado` };
              default:
                throw {
                  code: "DB_ERROR",
                  message: "Error en la base de datos",
                };
            }
          }

          if (error instanceof Prisma.PrismaClientValidationError) {
            throw {
              code: "VALIDATION_ERROR",
              message: "Los datos enviados no son válidos",
            };
          }

          throw error;
        }
      },
    },
  },
});

export { prisma };
