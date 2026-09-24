const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const {
  ensureSecurityRow,
  getSecurityRow,
  recordFailedLogin,
  clearLoginAttempts,
  setPasswordResetCode,
  verifyPasswordResetCode,
  isPasswordResetVerified,
  clearPasswordReset,
  setPasswordChangeCode,
  verifyPasswordChangeCode,
  isPasswordChangeVerified,
  clearPasswordChange,
} = require("../utils/authSecurity");

const {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordChangeCodeEmail,
  sendPasswordChangedEmail,
} = require("../utils/mailer");

const DEMO_USER_ID = 10;
const DEMO_EMAIL = "demo@company.mn";
const FULL_ACCESS_EMAIL = "it@gmail.com";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function expiresAt(minutes = 10) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

function validatePassword(password) {
  const value = String(password || "");

  if (value.length < 10) {
    return "Нууц үг хамгийн багадаа 10 тэмдэгт байна.";
  }

  if (!/[A-ZА-ЯӨҮЁ]/.test(value)) {
    return "Нууц үг дор хаяж нэг том үсэг агуулсан байна.";
  }

  if (!/[a-zа-яөүё]/.test(value)) {
    return "Нууц үг дор хаяж нэг жижиг үсэг агуулсан байна.";
  }

  if (!/\d/.test(value)) {
    return "Нууц үг дор хаяж нэг тоо агуулсан байна.";
  }

  if (!/[^A-Za-zА-Яа-яӨөҮүЁё0-9\s]/.test(value)) {
    return "Нууц үг дор хаяж нэг тусгай тэмдэг агуулсан байна.";
  }

  return null;
}

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      company_id: user.company_id || null,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "20m",
    }
  );
}

function formatUser(user) {
  return {
    id: user.id,
    company_id: user.company_id || null,
    company_name: user.company_name || null,
    full_name: user.full_name,
    email: user.email,
    phone: user.phone || null,
    role: user.role,
    status: user.status,
    email_verified: Number(user.email_verified || 0),
  };
}

async function findUserByEmail(email, includePassword = false) {
  const passwordField = includePassword ? ", password" : "";

  const [rows] = await db.query(
    `
      SELECT
        id,
        company_id,
        company_name,
        full_name,
        email,
        phone,
        role,
        status,
        email_verified,
        verification_code,
        verification_expires_at
        ${passwordField}
      FROM users
      WHERE LOWER(email) = ?
      LIMIT 1
    `,
    [normalizeEmail(email)]
  );

  return rows[0] || null;
}

async function findUserById(id, includePassword = false) {
  const passwordField = includePassword ? ", password" : "";

  const [rows] = await db.query(
    `
      SELECT
        id,
        company_id,
        company_name,
        full_name,
        email,
        phone,
        role,
        status,
        email_verified,
        verification_code,
        verification_expires_at
        ${passwordField}
      FROM users
      WHERE id = ?
      LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
}

function lockedSubscription() {
  return {
    subscribed: false,
    plan: null,
    status: "none",
    started_at: null,
    expires_at: null,
    demo: true,
    full_access: false,
  };
}

function fullAccessSubscription() {
  return {
    subscribed: true,
    plan: "full",
    status: "active",
    started_at: null,
    expires_at: null,
    demo: false,
    full_access: true,
  };
}

async function getSubscription(userId) {
  const [rows] = await db.query(
    `
      SELECT
        id,
        user_id,
        plan,
        status,
        started_at,
        expires_at,
        created_at,
        updated_at
      FROM subscriptions
      WHERE user_id = ?
      ORDER BY id DESC
      LIMIT 1
    `,
    [userId]
  );

  if (!rows.length) {
    return {
      subscribed: false,
      plan: null,
      status: "none",
      started_at: null,
      expires_at: null,
      demo: false,
      full_access: false,
    };
  }

  const subscription = rows[0];
  let status = subscription.status;

  if (
    status === "active" &&
    subscription.expires_at &&
    new Date(subscription.expires_at).getTime() <= Date.now()
  ) {
    status = "expired";

    await db.query(
      `
        UPDATE subscriptions
        SET status = 'expired'
        WHERE id = ?
      `,
      [subscription.id]
    );
  }

  return {
    id: subscription.id,
    subscribed: status === "active",
    plan: subscription.plan,
    status,
    started_at: subscription.started_at,
    expires_at: subscription.expires_at,
    demo: false,
    full_access: status === "active",
  };
}

async function getUserSubscription(user) {
  const email = normalizeEmail(user.email);

  if (email === FULL_ACCESS_EMAIL) {
    return fullAccessSubscription();
  }

  if (
    Number(user.id) === DEMO_USER_ID ||
    email === DEMO_EMAIL
  ) {
    return lockedSubscription();
  }

  return getSubscription(user.id);
}

exports.signup = async (req, res) => {
  try {
    const {
      companyName,
      fullName,
      email,
      phone,
      password,
    } = req.body;

    if (!companyName || !fullName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Бүх шаардлагатай мэдээллийг бөглөнө үү.",
      });
    }

    const passwordError = validatePassword(password);

    if (passwordError) {
      return res.status(400).json({
        success: false,
        message: passwordError,
      });
    }

    const normalizedEmail = normalizeEmail(email);

    const [existing] = await db.query(
      `
        SELECT id
        FROM users
        WHERE LOWER(email) = ?
        LIMIT 1
      `,
      [normalizedEmail]
    );

    if (existing.length) {
      return res.status(409).json({
        success: false,
        message: "Энэ и-мэйл хаягаар бүртгэл үүссэн байна.",
      });
    }

    const code = generateCode();
    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await db.query(
      `
        INSERT INTO users (
          company_name,
          full_name,
          email,
          phone,
          industry,
          password,
          role,
          status,
          email_verified,
          verification_code,
          verification_expires_at
        )
        VALUES (?, ?, ?, ?, NULL, ?, 'admin', 'active', 0, ?, ?)
      `,
      [
        companyName.trim(),
        fullName.trim(),
        normalizedEmail,
        phone.trim(),
        hashedPassword,
        code,
        expiresAt(),
      ]
    );

    await ensureSecurityRow(result.insertId);

    try {
      await sendVerificationEmail({
        email: normalizedEmail,
        code,
      });
    } catch (mailError) {
      await db.query(
        `
          DELETE FROM auth_security
          WHERE user_id = ?
        `,
        [result.insertId]
      );

      await db.query(
        `
          DELETE FROM users
          WHERE id = ?
        `,
        [result.insertId]
      );

      throw mailError;
    }

    return res.status(201).json({
      success: true,
      requires_verification: true,
      email: normalizedEmail,
      message: "Баталгаажуулах код таны и-мэйл рүү илгээгдлээ.",
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Бүртгэл үүсгэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "И-мэйл болон баталгаажуулах код шаардлагатай.",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй.",
      });
    }

    if (Number(user.email_verified) === 1) {
      return res.status(400).json({
        success: false,
        message: "И-мэйл аль хэдийн баталгаажсан байна.",
      });
    }

    if (
      !user.verification_code ||
      String(user.verification_code) !== String(code) ||
      !user.verification_expires_at ||
      new Date(user.verification_expires_at).getTime() < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Баталгаажуулах код буруу эсвэл хугацаа дууссан байна.",
      });
    }

    await db.query(
      `
        UPDATE users
        SET
          email_verified = 1,
          verification_code = NULL,
          verification_expires_at = NULL
        WHERE id = ?
      `,
      [user.id]
    );

    user.email_verified = 1;

    const subscription = await getUserSubscription(user);

    return res.json({
      success: true,
      token: createToken(user),
      user: formatUser(user),
      subscription,
      message: "И-мэйл амжилттай баталгаажлаа.",
    });
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "И-мэйл баталгаажуулахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "И-мэйл хаяг шаардлагатай.",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй.",
      });
    }

    if (Number(user.email_verified) === 1) {
      return res.status(400).json({
        success: false,
        message: "И-мэйл аль хэдийн баталгаажсан байна.",
      });
    }

    const code = generateCode();

    await db.query(
      `
        UPDATE users
        SET
          verification_code = ?,
          verification_expires_at = ?
        WHERE id = ?
      `,
      [code, expiresAt(), user.id]
    );

    await sendVerificationEmail({
      email: user.email,
      code,
    });

    return res.json({
      success: true,
      message: "Шинэ баталгаажуулах код и-мэйл рүү илгээгдлээ.",
    });
  } catch (error) {
    console.error("RESEND VERIFICATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Код дахин илгээхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Имэйл болон нууц үгээ оруулна уу.",
      });
    }

    const user = await findUserByEmail(email, true);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Имэйл хаяг эсвэл нууц үг буруу байна.",
      });
    }

    await ensureSecurityRow(user.id);

    const security = await getSecurityRow(user.id);

    if (Number(security.login_locked) === 1) {
      return res.status(423).json({
        success: false,
        locked: true,
        message:
          "5 удаа амжилтгүй нэвтрэх оролдлого хийсэн тул бүртгэл блоклогдсон. Нууц үг сэргээх хэсгээр блокоо тайлна уу.",
      });
    }

    const matches = await bcrypt.compare(password, user.password);

    if (!matches) {
      const result = await recordFailedLogin(user.id);

      if (result.locked) {
        return res.status(423).json({
          success: false,
          locked: true,
          attempts: result.attempts,
          remaining_attempts: 0,
          message:
            "5 удаа амжилтгүй нэвтрэх оролдлого хийсэн тул бүртгэл блоклогдлоо. Нууц үг сэргээх хэсгээр блокоо тайлна уу.",
        });
      }

      return res.status(401).json({
        success: false,
        attempts: result.attempts,
        remaining_attempts: result.remainingAttempts,
        message: `Имэйл хаяг эсвэл нууц үг буруу байна. Үлдсэн оролдлого: ${result.remainingAttempts}.`,
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Таны бүртгэл идэвхгүй байна.",
      });
    }

    if (Number(user.email_verified) !== 1) {
      return res.status(403).json({
        success: false,
        requires_verification: true,
        email: user.email,
        message: "И-мэйл хаягаа баталгаажуулна уу.",
      });
    }

    await clearLoginAttempts(user.id);

    const subscription = await getUserSubscription(user);

    return res.json({
      success: true,
      token: createToken(user),
      user: formatUser(user),
      subscription,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Нэвтрэх үед алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "И-мэйл хаягаа оруулна уу.",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй.",
      });
    }

    const code = generateCode();

    await setPasswordResetCode(
      user.id,
      code,
      expiresAt()
    );

    await sendPasswordResetEmail({
      email: user.email,
      code,
    });

    return res.json({
      success: true,
      email: user.email,
      message: "Нууц үг сэргээх код таны и-мэйл рүү илгээгдлээ.",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Нууц үг сэргээх код илгээхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "И-мэйл болон код шаардлагатай.",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй.",
      });
    }

    const valid = await verifyPasswordResetCode(
      user.id,
      code
    );

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Код буруу эсвэл хугацаа дууссан байна.",
      });
    }

    return res.json({
      success: true,
      message: "Код амжилттай баталгаажлаа.",
    });
  } catch (error) {
    console.error("VERIFY RESET CODE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Код баталгаажуулахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const {
      email,
      code,
      password,
      newPassword,
    } = req.body;

    const finalPassword = newPassword || password;

    if (!email || !finalPassword) {
      return res.status(400).json({
        success: false,
        message: "И-мэйл болон шинэ нууц үг шаардлагатай.",
      });
    }

    const passwordError = validatePassword(finalPassword);

    if (passwordError) {
      return res.status(400).json({
        success: false,
        message: passwordError,
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй.",
      });
    }

    let verified = await isPasswordResetVerified(user.id);

    if (!verified && code) {
      verified = await verifyPasswordResetCode(
        user.id,
        code
      );
    }

    if (!verified) {
      return res.status(403).json({
        success: false,
        message: "Нууц үг сэргээх кодоо эхлээд баталгаажуулна уу.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      finalPassword,
      12
    );

    await db.query(
      `
        UPDATE users
        SET password = ?
        WHERE id = ?
      `,
      [hashedPassword, user.id]
    );

    await clearPasswordReset(user.id);

    try {
      await sendPasswordChangedEmail({
        email: user.email,
      });
    } catch (mailError) {
      console.error(
        "PASSWORD CHANGED EMAIL ERROR:",
        mailError.message
      );
    }

    return res.json({
      success: true,
      unlocked: true,
      message:
        "Нууц үг амжилттай шинэчлэгдэж, нэвтрэх блок тайлагдлаа.",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Нууц үг шинэчлэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.requestPasswordChange = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй.",
      });
    }

    const code = generateCode();

    await setPasswordChangeCode(
      user.id,
      code,
      expiresAt()
    );

    await sendPasswordChangeCodeEmail({
      email: user.email,
      code,
    });

    return res.json({
      success: true,
      email: user.email,
      message: "Баталгаажуулах код таны и-мэйл рүү илгээгдлээ.",
    });
  } catch (error) {
    console.error("REQUEST PASSWORD CHANGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Баталгаажуулах код илгээхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.verifyPasswordChange = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Баталгаажуулах код шаардлагатай.",
      });
    }

    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй.",
      });
    }

    const valid = await verifyPasswordChangeCode(
      user.id,
      code
    );

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Код буруу эсвэл хугацаа дууссан байна.",
      });
    }

    return res.json({
      success: true,
      message: "Код амжилттай баталгаажлаа.",
    });
  } catch (error) {
    console.error("VERIFY PASSWORD CHANGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Код баталгаажуулахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      password,
      newPassword,
    } = req.body;

    const finalPassword = newPassword || password;

    if (!currentPassword || !finalPassword) {
      return res.status(400).json({
        success: false,
        message: "Одоогийн болон шинэ нууц үг шаардлагатай.",
      });
    }

    const passwordError = validatePassword(finalPassword);

    if (passwordError) {
      return res.status(400).json({
        success: false,
        message: passwordError,
      });
    }

    const user = await findUserById(req.user.id, true);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй.",
      });
    }

    const verified = await isPasswordChangeVerified(
      user.id
    );

    if (!verified) {
      return res.status(403).json({
        success: false,
        message: "И-мэйл баталгаажуулах кодоо эхлээд баталгаажуулна уу.",
      });
    }

    const currentMatches = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!currentMatches) {
      return res.status(400).json({
        success: false,
        message: "Одоогийн нууц үг буруу байна.",
      });
    }

    const samePassword = await bcrypt.compare(
      finalPassword,
      user.password
    );

    if (samePassword) {
      return res.status(400).json({
        success: false,
        message: "Шинэ нууц үг хуучин нууц үгээс өөр байна.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      finalPassword,
      12
    );

    await db.query(
      `
        UPDATE users
        SET password = ?
        WHERE id = ?
      `,
      [hashedPassword, user.id]
    );

    await clearPasswordChange(user.id);

    try {
      await sendPasswordChangedEmail({
        email: user.email,
      });
    } catch (mailError) {
      console.error(
        "PASSWORD CHANGED EMAIL ERROR:",
        mailError.message
      );
    }

    return res.json({
      success: true,
      message: "Нууц үг амжилттай солигдлоо.",
    });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Нууц үг солиход алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй.",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Таны бүртгэл идэвхгүй байна.",
      });
    }

    const subscription = await getUserSubscription(user);

    return res.json({
      success: true,
      user: formatUser(user),
      subscription,
    });
  } catch (error) {
    console.error("ME ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Хэрэглэгчийн мэдээлэл авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  return res.json({
    success: true,
    message: "Амжилттай гарлаа.",
  });
};