const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT || 587) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function verifyMailer() {
  try {
    await transporter.verify();
    console.log("SMTP connected successfully");
    return true;
  } catch (error) {
    console.error("SMTP connection failed:", error.message);
    return false;
  }
}

function emailTemplate(title, description, code = null) {
  return `
    <!DOCTYPE html>
    <html lang="mn">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;">
                <tr>
                  <td style="padding:35px;">
                    <div style="color:#166534;font-size:18px;font-weight:700;margin-bottom:30px;">
                      DATAVIEW MONGOLIA
                    </div>

                    <h2 style="color:#17233c;margin:0 0 12px;">
                      ${title}
                    </h2>

                    <p style="color:#64748b;line-height:1.6;margin:0;">
                      ${description}
                    </p>

                    ${
                      code
                        ? `
                          <div style="margin:30px 0;padding:20px;border-radius:12px;background:#effcf4;color:#166534;font-size:32px;font-weight:800;letter-spacing:10px;text-align:center;">
                            ${code}
                          </div>

                          <p style="color:#94a3b8;font-size:12px;">
                            Код 10 минутын хугацаанд хүчинтэй.
                          </p>
                        `
                        : ""
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

async function sendMail({ email, subject, text, html }) {
  return transporter.sendMail({
    from: `"DataView Mongolia" <${
      process.env.SMTP_FROM || process.env.SMTP_USER
    }>`,
    to: email,
    subject,
    text,
    html,
  });
}

async function sendVerificationEmail({ email, code }) {
  return sendMail({
    email,
    subject: "DataView - И-мэйл баталгаажуулах код",
    text: `Таны DataView баталгаажуулах код: ${code}`,
    html: emailTemplate(
      "И-мэйл баталгаажуулах",
      "DataView бүртгэлээ баталгаажуулахын тулд доорх кодыг ашиглана уу.",
      code
    ),
  });
}

async function sendPasswordResetEmail({ email, code }) {
  return sendMail({
    email,
    subject: "DataView - Нууц үг сэргээх код",
    text: `Таны DataView нууц үг сэргээх код: ${code}`,
    html: emailTemplate(
      "Нууц үг сэргээх",
      "Нууц үгээ шинэчлэхийн тулд доорх баталгаажуулах кодыг ашиглана уу.",
      code
    ),
  });
}

async function sendPasswordChangeCodeEmail({ email, code }) {
  return sendMail({
    email,
    subject: "DataView - Нууц үг солих баталгаажуулах код",
    text: `Таны DataView нууц үг солих баталгаажуулах код: ${code}`,
    html: emailTemplate(
      "Нууц үг солих",
      "Нууц үг солих хүсэлтийг баталгаажуулахын тулд доорх кодыг ашиглана уу.",
      code
    ),
  });
}

async function sendPasswordChangedEmail({ email }) {
  return sendMail({
    email,
    subject: "DataView - Нууц үг шинэчлэгдлээ",
    text: "Таны DataView бүртгэлийн нууц үг амжилттай шинэчлэгдлээ.",
    html: emailTemplate(
      "Нууц үг шинэчлэгдлээ",
      "Таны DataView бүртгэлийн нууц үг амжилттай шинэчлэгдлээ. Хэрэв та энэ өөрчлөлтийг хийгээгүй бол нууц үгээ нэн даруй сэргээнэ үү."
    ),
  });
}

module.exports = {
  transporter,
  verifyMailer,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordChangeCodeEmail,
  sendPasswordChangedEmail,
};