import { sendMail } from "@/lib";
import fs from "fs";
import Handlebars from "handlebars";
import { join } from "path";
import puppeteer from "puppeteer";
import QRCode from "qrcode";

// Genera PDF a partir de un template Handlebars y devuelve un Buffer
async function generatePdfFromTemplate(
  name: string,
  qrImageDataUrl: string
): Promise<Buffer> {
  const templatePath = join(process.cwd(), "lib/mail/templates/welcome.hbs");
  const templateContent = fs.readFileSync(templatePath, "utf-8");
  const template = Handlebars.compile(templateContent);
  const html = template({ name, qrImageDataUrl });

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // útil en servidores
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();

  return Buffer.from(pdfBuffer); // ✅ convertimos a Buffer de Node.js
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsApp } = body;

    // Generar QR como DataURL
    const qrData = `https://wa.me/${whatsApp}`;
    const qrImageDataUrl = await QRCode.toDataURL(qrData);

    // Generar PDF con QR
    const pdfBuffer = await generatePdfFromTemplate(name, qrImageDataUrl);

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
