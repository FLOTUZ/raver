import { NextResponse } from "next/server";

import { PreRegister, SessionPayload } from "@/interfaces";
import { protectedRoute } from "@/lib";
import { prisma } from "@/prisma";
import { paginate } from "@/utils";

async function getSelledTickets(req: Request, payload: SessionPayload) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const rows_per_page = parseInt(searchParams.get("rows_per_page") ?? "10", 10);

  const filtersParam = searchParams.get("filters");
  const filters = filtersParam ? JSON.parse(filtersParam) : {};

  const orderBy =
    filters?.order_by_column && filters?.order
      ? { [filters.order_by_column]: filters.order }
      : undefined;

  const paginatedResponse = await paginate<PreRegister>({
    model: prisma.preRegister,
    page,
    rows_per_page,
    options: {
      orderBy,
      include: {
        ticket: true,
      },
    },
  });

  return NextResponse.json(paginatedResponse);
}

export const { GET } = protectedRoute({
  GET: getSelledTickets,
});
