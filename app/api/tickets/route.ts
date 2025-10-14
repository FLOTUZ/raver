import { NextResponse } from "next/server";
import QRCode from "qrcode";

import { SessionPayload } from "@/interfaces";
import { pdfGenerator, protectedRoute, sendMail } from "@/lib";
import { prisma } from "@/prisma";

const createTicket = async function resetPassword(
  req: Request,
  _: { params: Promise<{}> },
  payload: SessionPayload
) {
  const { event_id, pre_register_id } = await req.json();

  const event = await prisma.event.findUnique({
    where: { id: event_id },
    include: { host: true },
  });

  const checker = await prisma.checker.findUnique({
    where: { user_id: payload.userId },
  });

  const preregister = await prisma.preRegister.findUnique({
    where: { id: pre_register_id },
    include: { ticket: true },
  });

  if (event == null)
    return NextResponse.json({ error: "Event not found" }, { status: 404 });

  if (checker == null)
    return NextResponse.json({ error: "Checker not found" }, { status: 404 });

  if (preregister == null)
    return NextResponse.json(
      { error: "Preregister not found" },
      { status: 404 }
    );

  if (event.price == null)
    return NextResponse.json(
      { error: "Event price not found" },
      { status: 404 }
    );

  if (preregister.ticket != null) {
    return NextResponse.json(
      { error: "El ticket ya fue cobrado al invitado" },
      { status: 400 }
    );
  }

  const ticket = await prisma.ticket.create({
    data: {
      is_paid: true,
      is_sended: true,
      price: event.price!,
      event: {
        connect: {
          id: event.id,
        },
      },
      checked_by: {
        connect: {
          id: checker.id,
        },
      },
    },
  });

  await prisma.preRegister.update({
    where: {
      id: pre_register_id,
    },
    data: {
      ticket: {
        connect: {
          id: ticket.id,
        },
      },
    },
  });

  await prisma.checker.update({
    where: {
      id: checker.id,
    },
    data: {
      checked_tickets: {
        connect: {
          id: ticket.id,
        },
      },
      amount: {
        increment: event.price!,
      },
    },
  });

  const qrImageDataUrl = await QRCode.toDataURL(ticket.id);

  const pdfBuffer = await pdfGenerator({
    templateName: "ticket",
    width: "120mm",
    context: {
      guest: preregister.name,
      ticket_id: ticket.id,
      event_banner: event.banner || event.image,
      event_name: event.name,
      event_date: event.start_time,
      event_location: event.location,
      host: event.host,
      qrImageDataUrl,
    },
  });

  await sendMail({
    to: preregister.email,
    subject: `Tus accesos a ${event.name}`,
    template: "ticket-confirmation",
    context: {
      guest: preregister.name,
      ticket_id: ticket.id,
      event_banner: event.banner || event.image,
      event_name: event.name,
      event_date: event.start_time,
      event_location: event.location,
      host: event.host,
    },
    attachments: [
      {
        filename: `tickets ${event.name}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  return NextResponse.json(ticket);
};

export const { POST } = protectedRoute({
  POST: createTicket,
});
