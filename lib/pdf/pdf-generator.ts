import type { PaperFormat } from "puppeteer";

import fs from "fs";
import { join } from "path";

import chromium from "chrome-aws-lambda";

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

  // 🔹 Decide qué Puppeteer usar
  const isLocal = !process.env.AWS_LAMBDA_FUNCTION_NAME;
  let puppeteer: any;
  let executablePath: string | undefined;

  if (isLocal) {
    // 🚀 Local dev: usa Puppeteer completo
    const localPuppeteer = await import("puppeteer");

    puppeteer = localPuppeteer.default;
    executablePath = puppeteer.executablePath();
  } else {
    // 🖥️ Producción (Vercel serverless): usa chrome-aws-lambda
    puppeteer = chromium.puppeteer;
    executablePath = await chromium.executablePath;
  }

  // 🔹 Lanza el navegador
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: true,
  });

  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  const contentHeight =
    height ||
    (await page.evaluate(() => document.documentElement.scrollHeight));

  const pdfBuffer = await page.pdf({
    format,
    width,
    height: contentHeight,
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  return pdfBuffer;
}
