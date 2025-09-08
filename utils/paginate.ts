import { Prisma } from "@prisma/client";

import { PaginatedResponse } from "@/interfaces";

type PaginateOptions<T> = {
  orderBy?: Prisma.Args<T, "findMany">["orderBy"];
  include?: Prisma.Args<T, "findMany">["include"];
  where?: Prisma.Args<T, "findMany">["where"];
};

export async function paginate<T>({
  model,
  page = 1,
  rows_per_page = 10,
  options = {},
}: {
  model: any;
  page?: number;
  rows_per_page?: number;
  options?: PaginateOptions<T>;
}) {
  const skip = (page - 1) * rows_per_page;
  const take = rows_per_page;

  const totalRows = await model.count({ where: options.where });

  const data = await model.findMany({
    skip,
    take,
    orderBy: options.orderBy,
    include: options.include,
    where: options.where,
  });

  const totalPages = Math.ceil(totalRows / rows_per_page);

  return {
    pages: totalPages,
    current_page: page,
    next_page: page < totalPages ? page + 1 : null,
    prev_page: page > 1 ? page - 1 : null,
    total_rows: totalRows,
    rows_per_page: rows_per_page,
    data: data,
  } as PaginatedResponse<T>;
}
