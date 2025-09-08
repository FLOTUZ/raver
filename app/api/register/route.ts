import { NextResponse } from "next/server";

import { SessionPayload } from "@/interfaces";
import { protectedRoute } from "@/lib";
import { prisma } from "@/prisma";

async function getSelledTickets(req: Request, payload: SessionPayload) {
  const preRegisters = await prisma.preRegister.findMany({
    include: {
      ticket: true,
    },
  });

  return NextResponse.json(preRegisters);
}
export const { GET } = protectedRoute({
  GET: getSelledTickets,
});
