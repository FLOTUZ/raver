import { NextResponse } from "next/server";

import { withAuth } from "./with-auth.util";

type Handlers = {
  GET?: (req: Request, payload: any) => Promise<NextResponse>;
  POST?: (req: Request, context: any, payload: any) => Promise<NextResponse>;
  PUT?: (req: Request, payload: any) => Promise<NextResponse>;
  PATCH?: (req: Request, payload: any) => Promise<NextResponse>;
  DELETE?: (req: Request, payload: any) => Promise<NextResponse>;
};

export function protectedRoute(handlers: Handlers) {
  return {
    GET: handlers.GET ? withAuth(handlers.GET) : undefined,
    POST: handlers.POST ? withAuth(handlers.POST) : undefined,
    PUT: handlers.PUT ? withAuth(handlers.PUT) : undefined,
    PATCH: handlers.PATCH ? withAuth(handlers.PATCH) : undefined,
    DELETE: handlers.DELETE ? withAuth(handlers.DELETE) : undefined,
  };
}
