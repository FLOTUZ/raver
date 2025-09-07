import { NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET() {
  const events = await prisma.event.findMany();

  return NextResponse.json(events);
}
