import nodemailer from "nodemailer";

export const isDev = () => {
  return process.env.NODE_ENV === "development";
};

export const userDTO = (user: any) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

export const sendMail = async ({
  subject,
  body,
  to,
  from,
}: {
  subject: string;
  body: string;
  to: string;
  from?: string;
}) => {
  console.log(process.env.SMTP_MAIL, "smtp mail");

  if (!process.env.SMTP_MAIL || !process.env.SMTP_PASS) {
    console.error("SMTP credentials are not set");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.io",
      port: 587,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: from || process.env.SMTP_MAIL,
      to: to,
      subject: subject,
      text: body,
    };

    const mail = await transporter.sendMail(mailOptions);
    return !!mail;
  } catch (error) {
    console.error("Error in sendMail:", error);
  }
};
