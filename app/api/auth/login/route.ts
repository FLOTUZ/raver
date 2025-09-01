import { signJwt } from "@/lib";
import { prisma } from "@/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signJwt({
    payload: { userId: user.id, email, name: user.name },
  });

  return NextResponse.json({ token, user });
}
