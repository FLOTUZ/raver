import { sendMail } from "@/lib";
import { Buffer } from "buffer";
import { join } from "path";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";

// Función para generar PDF con QR como Buffer
export async function generatePdf(
  qrDataUrl: string,
  name: string
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    const chunks: Uint8Array[] = [];

    doc.on("data", (chunk: Buffer) => {
      chunks.push(Uint8Array.from(chunk)); // convertimos a Uint8Array
    });

    doc.on("end", () => {
      // concatenamos todos los Uint8Array en un solo Uint8Array
      const totalLength = chunks.reduce((sum, arr) => sum + arr.length, 0);
      const merged = new Uint8Array(totalLength);
      let offset = 0;
      for (const arr of chunks) {
        merged.set(arr, offset);
        offset += arr.length;
      }
      // convertimos a Buffer antes de devolver
      resolve(Buffer.from(merged));
    });

    doc.on("error", (err) => reject(err));

    const fontPath = join(process.cwd(), "lib/fonts/Helvetica.ttf");
    doc.font(fontPath);

    doc.text(`Hola ${name}, este es tu QR:`);
    doc.image(Buffer.from(qrDataUrl.split(",")[1], "base64"), {
      fit: [200, 200],
      align: "center",
      valign: "center",
    });

    doc.end();
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsApp } = body;

    // Generar QR como DataURL
    const qrData = `https://wa.me/${whatsApp}`;
    const qrImageDataUrl = await QRCode.toDataURL(qrData);

    // Generar PDF con QR
    let pdfBuffer = Buffer.from("");
    try {
      pdfBuffer = await generatePdf(qrImageDataUrl, name); // ✅ ahora es Buffer
    } catch (error) {
      return new Response(
        JSON.stringify({
          method: request.method,
          error,
        }),
        { status: 500 }
      );
    }

    // Enviar correo con QR incrustado y PDF adjunto
    const { info, previewUrl } = await sendMail({
      to: email,
      subject: "¡Bienvenido a RAVR!",
      template: "welcome",
      context: { name, qrImageDataUrl },
      attachments: [
        {
          filename: "qr.pdf",
          content: pdfBuffer, // ✅ Buffer compatible con Nodemailer
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
