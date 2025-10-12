import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { SessionPayload } from "@/interfaces";
import { protectedRoute, sendMail } from "@/lib";
import { prisma } from "@/prisma";

async function getCheckers(_: Request, payload: SessionPayload) {
  const checkers = await prisma.checker.findMany({
    where: {
      user: {
        host_id: payload.hostId,
      },
    },
  });

  return NextResponse.json({ checkers });
}

async function createCheckers(req: Request, payload: SessionPayload) {
  const { name, email } = await req.json();

  const userAlreadyExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userAlreadyExists) {
    return NextResponse.json(
      { error: "El correo  electrónico ya está en uso por otro usuario" },
      { status: 400 }
    );
  }

  const randomPassword = Array(12)
    .fill(0)
    .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
    .join("");

  const user = await prisma.user.create({
    data: {
      email,
      name,
      host_id: payload.hostId,
      role: "CHEKER",
      password: await bcrypt.hash(randomPassword, 10),
    },
  });

  const checker = await prisma.checker.create({
    data: {
      user_id: user.id,
    },
  });

  const randomToken = Array(12)
    .fill(0)
    .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
    .join("");

  const ott_token = await prisma.oneTimeToken.create({
    data: {
      token: randomToken,
      url: `${process.env.FRONTEND_URL}/reset-password?ott=${randomToken}`,
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
  });

  const { info, previewUrl } = await sendMail({
    to: email,
    subject: "RAVR - Bienvenido a RAVR!",
    template: "welcome-checker",
    context: {
      name,
      ott_token_url: ott_token.url,
    },
  });

  return NextResponse.json(checker);
}

export const { GET, POST } = protectedRoute({
  GET: getCheckers,
  POST: createCheckers,
});
