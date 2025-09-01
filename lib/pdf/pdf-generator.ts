import fs from "fs";
import { join } from "path";

import puppeteer, { PaperFormat } from "puppeteer";

/**
 * Genera un PDF a partir de un template Handlebars y devuelve un Buffer
 * @param templateName Nombre del template (.hbs) dentro de lib/mail/templates
 * @param format Formato del PDF
 * @param width Ancho del PDF
 * @param height Alto del PDF
 * @param context Datos para renderizar el template
 * @returns Buffer del PDF generado
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
  const handlebars = (await import("handlebars")).default;
  const templatePath = join(
    process.cwd(),
    `lib/pdf/templates/${templateName}.hbs`
  );
  const templateContent = fs.readFileSync(templatePath, "utf-8");
  const template = handlebars.compile(templateContent);
  const html = template(context);

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  const contentHeight =
    height ||
    (await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    }));

  const pdfBuffer = await page.pdf({
    format,
    width,
    height: contentHeight,
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  return Buffer.from(pdfBuffer);
}
