import { protectedRoute } from "@/lib";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

async function getSelledTickets() {
  const tickets = await prisma.ticket.count({
    where: {
      is_paid: true,
    },
  });

  const earnings = await prisma.ticket.aggregate({
    _sum: {
      price: true,
    },
    where: {
      is_paid: true,
    },
  });

  return NextResponse.json({ tickets, earnings });
}

export const { GET } = protectedRoute({
  GET: getSelledTickets,
});
