import { NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await context.params;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event)
    return NextResponse.json({ error: "Event not found" }, { status: 404 });

  const body = await request.json();
  const updatedEvent = await prisma.event.update({
    where: { id: eventId },
    data: { ...body },
  });

  return NextResponse.json(updatedEvent);
}
