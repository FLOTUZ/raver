export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  return Response.json({
    status: 200,
    method: request.method,
    message: "success",
    data: { id },
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  return Response.json({
    status: 201,
    method: request.method,
    message: "success",
    data: { id },
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  return Response.json({
    status: 201,
    method: request.method,
    message: "success",
    data: { id },
  });
}
