import jwt, { SignOptions } from "jsonwebtoken";

import { SessionPayload } from "@/interfaces";

const SECRET: string = process.env.JWT_SECRET || "supersecret";

export function signJwt({ payload }: { payload: SessionPayload }): string {
  const options: SignOptions = { expiresIn: "1h" };

  return jwt.sign(payload, SECRET, options);
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return "INVALID_TOKEN";
  }
}
