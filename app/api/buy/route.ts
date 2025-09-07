import QRCode from "qrcode";

import { pdfGenerator, sendMail } from "@/lib";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, email, telephone } = body;

    const ticketId = Math.floor(Math.random() * 100000).toString();
    const qrImageDataUrl = await QRCode.toDataURL(ticketId);

    const whatsApp = "521123456789";

    const pdfBuffer = await pdfGenerator({
      templateName: "payment",
      width: "120mm",
      context: {
        name,
        ticketId: ticketId,
        amount: 100,
        qrImageDataUrl,
        whatsApp: `${whatsApp}?text=Hola%20RAVR%20-%20Instrucciones%20de%20pago%20-%20${ticketId}`,
      },
    });

    const { info, previewUrl } = await sendMail({
      to: email,
      subject: "RAVR - Instrucciones de pago",
      template: "payment-instructions",
      context: {
        name,
        ticketId: ticketId,
        amount: 100,
        qrImageDataUrl,
        whatsApp: `${whatsApp}?text=Hola%20RAVR%20-%20Instrucciones%20de%20pago%20-%20${ticketId}`,
      },
      attachments: [
        {
          filename: "payment-instructions.pdf",
          content: pdfBuffer,
        },
      ],
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
      { status: 201 },
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        method: request.method,
        error: error.message,
      }),
      { status: 500 },
    );
  }
}
