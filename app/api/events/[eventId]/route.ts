import { NextResponse } from "next/server";

import { protectedRoute } from "@/lib";
import { prisma } from "@/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await context.params;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event)
    return NextResponse.json({ error: "Event not found" }, { status: 404 });

  return NextResponse.json(event);
}

async function updateEvent(
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

export const { PUT } = protectedRoute({
  PUT: updateEvent,
});
