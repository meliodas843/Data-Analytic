const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const DEMO_USER_ID = 10;
const DEMO_EMAIL = "demo@company.mn";
const FULL_ACCESS_EMAIL = "it@gmail.com";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
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
      expiresIn: "7d",
    }
  );
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
  const [subscriptions] = await db.query(
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

  if (subscriptions.length === 0) {
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

  const subscription = subscriptions[0];
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

function formatUser(user) {
  return {
    id: user.id,
    company_id: user.company_id,
    company_name: user.company_name,
    full_name: user.full_name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    email_verified: user.email_verified,
  };
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

    if (
      !companyName ||
      !fullName ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Бүх шаардлагатай мэдээллийг бөглөнө үү.",
      });
    }

    const normalizedEmail = normalizeEmail(email);
    const normalizedPhone = phone.trim();

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Нууц үг хамгийн багадаа 8 тэмдэгт байна.",
      });
    }

    if (!/[A-Za-zА-Яа-яӨөҮүЁё]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Нууц үг дор хаяж нэг үсэг агуулсан байна.",
      });
    }

    if (!/\d/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Нууц үг дор хаяж нэг тоо агуулсан байна.",
      });
    }

    const [existingUsers] = await db.query(
      `
      SELECT id
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [normalizedEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Энэ и-мэйл хаягаар бүртгэл үүссэн байна.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

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
      VALUES (
        ?,
        ?,
        ?,
        ?,
        NULL,
        ?,
        ?,
        ?,
        ?,
        NULL,
        NULL
      )
      `,
      [
        companyName.trim(),
        fullName.trim(),
        normalizedEmail,
        normalizedPhone,
        hashedPassword,
        "admin",
        "active",
        1,
      ]
    );

    const user = {
      id: result.insertId,
      company_id: null,
      company_name: companyName.trim(),
      full_name: fullName.trim(),
      email: normalizedEmail,
      phone: normalizedPhone,
      role: "admin",
      status: "active",
      email_verified: 1,
    };

    const token = createToken(user);
    const subscription = await getUserSubscription(user);

    return res.status(201).json({
      success: true,
      message: "Бүртгэл амжилттай үүслээ.",
      token,
      user: formatUser(user),
      subscription,
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

exports.login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Имэйл болон нууц үгээ оруулна уу.",
      });
    }

    const normalizedEmail = normalizeEmail(email);

    const [users] = await db.query(
      `
      SELECT
        id,
        company_id,
        company_name,
        full_name,
        email,
        phone,
        password,
        role,
        status,
        email_verified
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [normalizedEmail]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Имэйл хаяг эсвэл нууц үг буруу байна.",
      });
    }

    const user = users[0];

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Имэйл хаяг эсвэл нууц үг буруу байна.",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Таны бүртгэл идэвхгүй байна.",
      });
    }

    const subscription = await getUserSubscription(user);
    const token = createToken(user);

    return res.json({
      success: true,
      token,
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

exports.demoLogin = async (req, res) => {
  try {
    const [users] = await db.query(
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
        email_verified
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [DEMO_USER_ID]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Демо хэрэглэгч олдсонгүй.",
      });
    }

    const user = users[0];

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Демо хэрэглэгч идэвхгүй байна.",
      });
    }

    const token = createToken(user);
    const subscription = lockedSubscription();

    return res.status(200).json({
      success: true,
      message: "Демо хэрэглэгчээр амжилттай нэвтэрлээ.",
      token,
      user: formatUser(user),
      subscription,
    });
  } catch (error) {
    console.error("DEMO LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Демо хэрэглэгчээр нэвтрэх үед алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      full_name,
      phone,
    } = req.body;

    if (!full_name || !full_name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Нэрээ оруулна уу.",
      });
    }

    await db.query(
      `
      UPDATE users
      SET
        full_name = ?,
        phone = ?
      WHERE id = ?
      `,
      [
        full_name.trim(),
        phone?.trim() || null,
        req.user.id,
      ]
    );

    const [users] = await db.query(
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
        email_verified
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй.",
      });
    }

    const user = users[0];
    const subscription = await getUserSubscription(user);

    return res.json({
      success: true,
      user: formatUser(user),
      subscription,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Профайл шинэчлэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Нууц үгээ бүрэн оруулна уу.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Шинэ нууц үг хамгийн багадаа 8 тэмдэгт байна.",
      });
    }

    if (!/[A-Za-zА-Яа-яӨөҮүЁё]/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "Шинэ нууц үг дор хаяж нэг үсэг агуулсан байна.",
      });
    }

    if (!/\d/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "Шинэ нууц үг дор хаяж нэг тоо агуулсан байна.",
      });
    }

    const [users] = await db.query(
      `
      SELECT
        id,
        password
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй.",
      });
    }

    const matches = await bcrypt.compare(
      currentPassword,
      users[0].password
    );

    if (!matches) {
      return res.status(400).json({
        success: false,
        message: "Одоогийн нууц үг буруу байна.",
      });
    }

    const hash = await bcrypt.hash(
      newPassword,
      12
    );

    await db.query(
      `
      UPDATE users
      SET password = ?
      WHERE id = ?
      `,
      [
        hash,
        req.user.id,
      ]
    );

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
    const [users] = await db.query(
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
        email_verified
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй.",
      });
    }

    const user = users[0];

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
    console.error("AUTH ME ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Хэрэглэгчийн мэдээлэл авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};