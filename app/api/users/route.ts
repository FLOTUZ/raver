import { NextResponse } from "next/server";

import { SessionPayload } from "@/interfaces";
import { protectedRoute } from "@/lib";
import { prisma } from "@/prisma";

async function getUsers(req: Request, payload: SessionPayload) {
  const users = await prisma.user.findMany();

  return NextResponse.json({ users, me: payload });
}

async function createUser(req: Request, _: SessionPayload) {
  const body = await req.json();
  const user = await prisma.user.create({ data: body });

  return NextResponse.json(user);
}

export const { GET, POST } = protectedRoute({
  GET: getUsers,
  POST: createUser,
});
