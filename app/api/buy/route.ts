import { pdfGenerator, sendMail } from "@/lib";
import QRCode from "qrcode";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsApp } = body;

    const qrData = `https://wa.me/${whatsApp}`;
    const qrImageDataUrl = await QRCode.toDataURL(qrData);

    const pdfBuffer = await pdfGenerator("payment", {
      name,
      qrImageDataUrl,
    });

    const { info, previewUrl } = await sendMail({
      to: email,
      subject: "RAVR - Instrucciones de pago",
      template: "payment-instructions",
      context: { name, ticketId: whatsApp, amount: 100, qrImageDataUrl },
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
      { status: 201 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        method: request.method,
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
