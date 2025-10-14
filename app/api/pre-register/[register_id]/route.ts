import { NextResponse } from "next/server";

import { protectedRoute } from "@/lib";
import { prisma } from "@/prisma";

async function getPreregistered(
  _: Request,
  context: { params: { register_id: string } }
) {
  const { register_id } = context.params;

  const preregistered = await prisma.preRegister.findUnique({
    where: { id: register_id },
  });

  return NextResponse.json(preregistered);
}

export const { GET } = protectedRoute({
  GET: getPreregistered,
});
