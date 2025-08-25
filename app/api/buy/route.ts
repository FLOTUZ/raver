import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsApp } = body;

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
          partialsDir: join(process.cwd(), "email-templates"),
          defaultLayout: "",
        },
        viewPath: join(process.cwd(), "email-templates"),
        extName: ".hbs",
      })
    );

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: email,
      subject: "¡Bienvenido a RAVR!",
      template: "welcome",
      context: {
        name,
      },
    };

    const info = await transporter.sendMail(mailOptions);

    // Solo Ethereal devuelve URL de previsualización
    const previewUrl =
      process.env.NODE_ENV !== "production"
        ? nodemailer.getTestMessageUrl(info)
        : null;

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
