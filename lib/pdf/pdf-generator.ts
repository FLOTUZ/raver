import type { PaperFormat } from "puppeteer-core";

import fs from "fs";
import { join } from "path";

/**
 * Genera un PDF a partir de un template Handlebars y devuelve un Buffer.
 * Compatible con Vercel (serverless) y desarrollo local.
 */
export async function pdfGenerator({
  templateName,
  format,
  width,
  height,
  context,
}: {
  templateName: string;
  format?: PaperFormat;
  width?: string | number;
  height?: string | number;
  context: Record<string, any>;
}): Promise<Buffer> {
  // 🔹 Compila template Handlebars
  const handlebars = (await import("handlebars")).default;
  const templatePath = join(
    process.cwd(),
    `lib/pdf/templates/${templateName}.hbs`
  );
  const templateContent = fs.readFileSync(templatePath, "utf-8");
  const template = handlebars.compile(templateContent);
  const html = template(context);

  // 🔹 Detecta entorno
  const isProduction =
    process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

  let browser;

  if (isProduction) {
    // 🖥️ Producción (Vercel serverless)
    const chromium = await import("@sparticuz/chromium");
    const puppeteerCore = await import("puppeteer-core");

    browser = await puppeteerCore.default.launch({
      args: chromium.default.args,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      executablePath: await chromium.default.executablePath(),
      headless: true,
    });
  } else {
    // 🚀 Local: Puppeteer completo
    const puppeteer = await import("puppeteer");

    browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }

  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  // Configuración del PDF
  const pdfOptions: any = {
    format,
    printBackground: true,
    preferCSSPageSize: true,
  };

  // Solo agregar width y height si están definidos
  if (width) {
    pdfOptions.width = width;
  }

  if (height) {
    pdfOptions.height = height;
  }

  const pdf = await page.pdf(pdfOptions);

  await browser.close();

  // Convertir Uint8Array a Buffer si es necesario
  const pdfBuffer = Buffer.from(pdf);

  return pdfBuffer;
}
