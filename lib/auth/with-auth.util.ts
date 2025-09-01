import { NextResponse } from "next/server";

import { verifyJwt } from "./jwt.util";

type Handler = (req: Request, payload: any) => Promise<NextResponse>;

export function withAuth(handler: Handler) {
  return async function (req: Request) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyJwt(token);

    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Llama al handler pasando el payload decodificado
    return handler(req, payload);
  };
}
