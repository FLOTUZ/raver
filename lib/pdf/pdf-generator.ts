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

  // Carga puppeteer adecuado (local o serverless)
  const puppeteer = process.env.VERCEL
    ? chromium.puppeteer
    : (await import("puppeteer")).default;

  const executablePath = process.env.VERCEL
    ? await chromium.executablePath
    : (puppeteer as any).executablePath?.();

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
