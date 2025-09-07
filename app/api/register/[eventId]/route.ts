import { sendMail } from "@/lib";
import { prisma } from "@/prisma";

export async function POST(
  request: Request,
  context: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await context.params;

  try {
    const body = await request.json();
    const { name, email, telephone } = body;

    const event = await prisma.event.findFirstOrThrow({
      where: { id: eventId },
    });

    const { id: preRegisterId } = await prisma.preRegister.create({
      data: {
        name,
        email,
        telephone: telephone,
        event_id: event.id,
      },
    });

    const { info, previewUrl } = await sendMail({
      to: email,
      subject: "RAVR- Registro de invitación",
      template: "register-confirmation",
      context: {
        userData: {
          name,
          email,
          telephone,
        },
        eventData: event,
      },
    });

    await prisma.preRegister.update({
      where: { id: preRegisterId },
      data: { is_sended: true },
    });

    return new Response(
      JSON.stringify({
        method: request.method,
        message:
          process.env.NODE_ENV === "production"
            ? "Correo enviado (producción)"
            : "Correo enviado (pruebas Ethereal)",
        info,
        previewUrl,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);

    return new Response(
      JSON.stringify({
        method: request.method,
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
