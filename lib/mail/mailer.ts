import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { join } from "path";

interface MailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

export async function sendMail({
  to,
  subject,
  template,
  context,
}: MailOptions) {
  let transporter;

  if (process.env.NODE_ENV === "production") {
    // SMTP real para producción
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
    // Ethereal para pruebas
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

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
    to,
    subject,
    template,
    context,
  };

  const info = await transporter.sendMail(mailOptions);

  // URL de previsualización solo para Ethereal
  const previewUrl =
    process.env.NODE_ENV !== "production"
      ? nodemailer.getTestMessageUrl(info)
      : null;

  return { info, previewUrl };
}
