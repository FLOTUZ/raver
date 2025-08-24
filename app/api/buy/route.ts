export async function GET(request: Request) {
  return Response.json({
    status: 200,
    method: request.method,
    message: "Hello, Next.js!",
  });
}

export async function POST(request: Request) {
  return Response.json({
    status: 201,
    method: request.method,
    message: "Hello, Next.js!",
  });
}
