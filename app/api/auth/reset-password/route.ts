import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { SessionPayload } from "@/interfaces";
import { protectedRoute } from "@/lib";
import { prisma } from "@/prisma";

async function resetPassword(req: Request, _: any, payload: SessionPayload) {
  const { new_password, confirm_password, ott, user_id } = await req.json();

  if (!ott) {
    return NextResponse.json(
      { error: "El token no es válido" },
      { status: 400 }
    );
  }

  const is_ott_valid = await prisma.oneTimeToken.findUnique({
    where: { token: ott },
  });

  if (is_ott_valid !== null && is_ott_valid.expires_at < new Date()) {
    return NextResponse.json(
      { error: "El token no es válido" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: user_id },
  });

  if (!user) {
    return NextResponse.json(
      { error: "El usuario no existe" },
      { status: 404 }
    );
  }

  if (new_password !== confirm_password) {
    return NextResponse.json(
      { error: "Las contraseñas no coinciden" },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: { id: user_id },
    data: {
      password: await bcrypt.hash(new_password, 10),
    },
  });

  await prisma.oneTimeToken.delete({
    where: { token: ott },
  });

  return NextResponse.json({ message: "Contraseña restablecida" });
}

export const { POST } = protectedRoute({
  POST: resetPassword,
});
