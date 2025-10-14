import type { PaperFormat } from "puppeteer";

import fs from "fs";
import { join } from "path";

import chromium from "chrome-aws-lambda";

/**
 * Genera un PDF a partir de un template Handlebars y devuelve un Buffer.
 * Compatible tanto con entornos locales como serverless (Vercel).
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

  // Detecta si estamos en entorno local o en Vercel
  const isLocal = !process.env.AWS_LAMBDA_FUNCTION_NAME;

  // Carga puppeteer adecuado (local o serverless)
  const puppeteer = isLocal
    ? (await import("puppeteer")).default // local con Chrome instalado
    : chromium.puppeteer; // Vercel (usa chromium headless)

  // 🧩 Ejecutable de Chrome (según entorno)
  const executablePath = isLocal
    ? (puppeteer as any).executablePath?.() // fuerza compatibilidad tipada
    : await chromium.executablePath;

  // 🚀 Lanza navegador
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

  const pdfBuffer: Buffer = await page.pdf({
    format,
    width,
    height: contentHeight,
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  return pdfBuffer;
}
