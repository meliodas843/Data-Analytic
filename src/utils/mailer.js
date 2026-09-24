const nodemailer = require("nodemailer");

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure:
      String(process.env.SMTP_SECURE || "false") ===
      "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function getFrom() {
  return (
    process.env.SMTP_FROM ||
    process.env.SMTP_USER
  );
}

async function sendMail({
  to,
  subject,
  text,
  html,
}) {
  if (!process.env.SMTP_USER) {
    throw new Error(
      "SMTP_USER тохируулагдаагүй байна."
    );
  }

  if (!process.env.SMTP_PASS) {
    throw new Error(
      "SMTP_PASS тохируулагдаагүй байна."
    );
  }

  const transporter = createTransporter();

  return transporter.sendMail({
    from: `"DataView" <${getFrom()}>`,
    to,
    subject,
    text,
    html,
  });
}

async function sendVerificationEmail({
  email,
  code,
}) {
  return sendMail({
    to: email,
    subject: "DataView - И-мэйл баталгаажуулах код",
    text: `Таны DataView и-мэйл баталгаажуулах код: ${code}. Код 10 минут хүчинтэй.`,
    html: `
      <!DOCTYPE html>
      <html lang="mn">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>DataView</title>
        </head>

        <body
          style="
            margin:0;
            padding:0;
            background:#f5f7fb;
            font-family:Arial,Helvetica,sans-serif;
            color:#111827;
          "
        >
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="background:#f5f7fb;padding:40px 15px;"
          >
            <tr>
              <td align="center">
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    max-width:560px;
                    background:#ffffff;
                    border-radius:16px;
                    overflow:hidden;
                  "
                >
                  <tr>
                    <td
                      style="
                        padding:32px;
                        text-align:center;
                      "
                    >
                      <h1
                        style="
                          margin:0 0 10px;
                          font-size:26px;
                          color:#111827;
                        "
                      >
                        DataView
                      </h1>

                      <h2
                        style="
                          margin:0 0 16px;
                          font-size:20px;
                          font-weight:600;
                        "
                      >
                        И-мэйл баталгаажуулах
                      </h2>

                      <p
                        style="
                          margin:0 0 24px;
                          font-size:15px;
                          line-height:1.6;
                          color:#6b7280;
                        "
                      >
                        Бүртгэлээ баталгаажуулахын тулд
                        доорх кодыг оруулна уу.
                      </p>

                      <div
                        style="
                          display:inline-block;
                          padding:16px 28px;
                          background:#f3f4f6;
                          border-radius:10px;
                          font-size:30px;
                          font-weight:700;
                          letter-spacing:8px;
                          color:#111827;
                        "
                      >
                        ${code}
                      </div>

                      <p
                        style="
                          margin:24px 0 0;
                          font-size:13px;
                          color:#9ca3af;
                        "
                      >
                        Код 10 минут хүчинтэй.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
}

async function sendPasswordResetEmail({
  email,
  code,
}) {
  return sendMail({
    to: email,
    subject: "DataView - Нууц үг сэргээх код",
    text: `Таны DataView нууц үг сэргээх код: ${code}. Код 10 минут хүчинтэй.`,
    html: `
      <!DOCTYPE html>
      <html lang="mn">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>DataView</title>
        </head>

        <body
          style="
            margin:0;
            padding:0;
            background:#f5f7fb;
            font-family:Arial,Helvetica,sans-serif;
            color:#111827;
          "
        >
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="background:#f5f7fb;padding:40px 15px;"
          >
            <tr>
              <td align="center">
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    max-width:560px;
                    background:#ffffff;
                    border-radius:16px;
                    overflow:hidden;
                  "
                >
                  <tr>
                    <td
                      style="
                        padding:32px;
                        text-align:center;
                      "
                    >
                      <h1
                        style="
                          margin:0 0 10px;
                          font-size:26px;
                        "
                      >
                        DataView
                      </h1>

                      <h2
                        style="
                          margin:0 0 16px;
                          font-size:20px;
                          font-weight:600;
                        "
                      >
                        Нууц үг сэргээх
                      </h2>

                      <p
                        style="
                          margin:0 0 24px;
                          color:#6b7280;
                          line-height:1.6;
                        "
                      >
                        Нууц үгээ шинэчлэхийн тулд
                        доорх кодыг ашиглана уу.
                      </p>

                      <div
                        style="
                          display:inline-block;
                          padding:16px 28px;
                          background:#f3f4f6;
                          border-radius:10px;
                          font-size:30px;
                          font-weight:700;
                          letter-spacing:8px;
                        "
                      >
                        ${code}
                      </div>

                      <p
                        style="
                          margin:24px 0 0;
                          font-size:13px;
                          color:#9ca3af;
                        "
                      >
                        Код 10 минут хүчинтэй.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
}

async function sendPasswordChangeCodeEmail({
  email,
  code,
}) {
  return sendMail({
    to: email,
    subject:
      "DataView - Нууц үг солих баталгаажуулах код",
    text: `Таны DataView нууц үг солих баталгаажуулах код: ${code}. Код 10 минут хүчинтэй.`,
    html: `
      <!DOCTYPE html>
      <html lang="mn">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>DataView</title>
        </head>

        <body
          style="
            margin:0;
            padding:0;
            background:#f5f7fb;
            font-family:Arial,Helvetica,sans-serif;
            color:#111827;
          "
        >
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="background:#f5f7fb;padding:40px 15px;"
          >
            <tr>
              <td align="center">
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    max-width:560px;
                    background:#ffffff;
                    border-radius:16px;
                  "
                >
                  <tr>
                    <td
                      style="
                        padding:32px;
                        text-align:center;
                      "
                    >
                      <h1
                        style="
                          margin:0 0 10px;
                          font-size:26px;
                        "
                      >
                        DataView
                      </h1>

                      <h2
                        style="
                          margin:0 0 16px;
                          font-size:20px;
                        "
                      >
                        Нууц үг солих
                      </h2>

                      <p
                        style="
                          margin:0 0 24px;
                          color:#6b7280;
                          line-height:1.6;
                        "
                      >
                        Нууц үг солих хүсэлтийг
                        баталгаажуулахын тулд доорх
                        кодыг оруулна уу.
                      </p>

                      <div
                        style="
                          display:inline-block;
                          padding:16px 28px;
                          background:#f3f4f6;
                          border-radius:10px;
                          font-size:30px;
                          font-weight:700;
                          letter-spacing:8px;
                        "
                      >
                        ${code}
                      </div>

                      <p
                        style="
                          margin:24px 0 0;
                          font-size:13px;
                          color:#9ca3af;
                        "
                      >
                        Код 10 минут хүчинтэй.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
}

async function sendPasswordChangedEmail({
  email,
}) {
  return sendMail({
    to: email,
    subject: "DataView - Нууц үг шинэчлэгдлээ",
    text: "Таны DataView бүртгэлийн нууц үг амжилттай шинэчлэгдлээ.",
    html: `
      <!DOCTYPE html>
      <html lang="mn">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>DataView</title>
        </head>

        <body
          style="
            margin:0;
            padding:0;
            background:#f5f7fb;
            font-family:Arial,Helvetica,sans-serif;
            color:#111827;
          "
        >
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="background:#f5f7fb;padding:40px 15px;"
          >
            <tr>
              <td align="center">
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    max-width:560px;
                    background:#ffffff;
                    border-radius:16px;
                  "
                >
                  <tr>
                    <td style="padding:32px;">
                      <h1
                        style="
                          margin:0 0 10px;
                          font-size:26px;
                          text-align:center;
                        "
                      >
                        DataView
                      </h1>

                      <h2
                        style="
                          margin:0 0 18px;
                          font-size:20px;
                          text-align:center;
                        "
                      >
                        Нууц үг шинэчлэгдлээ
                      </h2>

                      <p
                        style="
                          margin:0;
                          color:#6b7280;
                          line-height:1.7;
                          font-size:15px;
                        "
                      >
                        Таны DataView бүртгэлийн нууц үг
                        амжилттай шинэчлэгдлээ.
                      </p>

                      <p
                        style="
                          margin:16px 0 0;
                          color:#6b7280;
                          line-height:1.7;
                          font-size:15px;
                        "
                      >
                        Хэрэв та энэ өөрчлөлтийг
                        хийгээгүй бол нууц үгээ нэн даруй
                        сэргээнэ үү.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
}

module.exports = {
  sendMail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordChangeCodeEmail,
  sendPasswordChangedEmail,
};