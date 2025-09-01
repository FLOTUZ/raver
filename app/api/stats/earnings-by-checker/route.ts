import { NextResponse } from "next/server";

import { protectedRoute } from "@/lib";
import { prisma } from "@/prisma";

async function earningsByCheckers() {
  const checkers = await prisma.checker.findMany({
    include: {
      user: true,
    },
  });

  return NextResponse.json(checkers);
}

export const { GET } = protectedRoute({
  GET: earningsByCheckers,
});
