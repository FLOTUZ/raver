import nodemailer, { SendMailOptions } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { join } from "path";

interface ExtendedMailOptions extends SendMailOptions {
  template?: string; // nombre del template .hbs
  context?: Record<string, any>; // contexto para Handlebars
}

export async function sendMail({
  to,
  subject,
  template,
  context,
  attachments,
}: ExtendedMailOptions) {
  let transporter;

  if (process.env.NODE_ENV === "production") {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // Configuración de Handlebars
  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: ".hbs",
        partialsDir: join(process.cwd(), "lib/mail/templates"),
        defaultLayout: "",
      },
      viewPath: join(process.cwd(), "lib/mail/templates"),
      extName: ".hbs",
    })
  );

  const mailOptions: ExtendedMailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
    to,
    subject,
    template,
    context,
    attachments,
  };

  const info = await transporter.sendMail(mailOptions);

  const previewUrl =
    process.env.NODE_ENV !== "production"
      ? nodemailer.getTestMessageUrl(info)
      : null;

  return { info, previewUrl };
}
