const nodemailer = require("nodemailer");

const transporter =
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,

    port: Number(
      process.env.SMTP_PORT || 587
    ),

    secure:
      Number(process.env.SMTP_PORT) === 465,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

async function verifyMailer() {
  try {
    await transporter.verify();

    console.log(
      "✅ SMTP connected successfully"
    );

    return true;
  } catch (error) {
    console.error(
      "❌ SMTP connection failed:"
    );

    console.error(
      error.message
    );

    return false;
  }
}

async function sendVerificationEmail({
  email,
  code,
}) {
  const result =
    await transporter.sendMail({
      from:
        `"DataView Mongolia" <${process.env.SMTP_FROM}>`,

      to: email,

      subject:
        "DataView - И-мэйл баталгаажуулах код",

      text:
        `Таны DataView баталгаажуулах код: ${code}`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 520px;
            margin: auto;
            padding: 35px;
            background: #ffffff;
          "
        >
          <div
            style="
              color: #166534;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 30px;
            "
          >
            DATAVIEW MONGOLIA
          </div>

          <h2
            style="
              color: #17233c;
              margin-bottom: 10px;
            "
          >
            И-мэйл баталгаажуулах
          </h2>

          <p
            style="
              color: #64748b;
              line-height: 1.6;
            "
          >
            DataView бүртгэлээ баталгаажуулахын тулд
            доорх кодыг ашиглана уу.
          </p>

          <div
            style="
              margin: 30px 0;
              padding: 20px;
              border-radius: 12px;
              background: #effcf4;
              color: #166534;
              font-size: 32px;
              font-weight: 800;
              letter-spacing: 10px;
              text-align: center;
            "
          >
            ${code}
          </div>

          <p
            style="
              color: #94a3b8;
              font-size: 12px;
            "
          >
            Код 10 минутын хугацаанд хүчинтэй.
          </p>
        </div>
      `,
    });

  console.log(
    `✅ Verification email sent to ${email}`
  );

  console.log(
    `✅ Message ID: ${result.messageId}`
  );

  return result;
}

module.exports = {
  transporter,
  verifyMailer,
  sendVerificationEmail,
};