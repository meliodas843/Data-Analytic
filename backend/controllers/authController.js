const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

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

exports.signup = async (req, res) => {
  try {
    const {
      companyName,
      fullName,
      email,
      phone,
      password,
      industry,
    } = req.body;

    if (
      !companyName ||
      !fullName ||
      !email ||
      !password ||
      !industry
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Бүх шаардлагатай мэдээллийг бөглөнө үү.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Нууц үг хамгийн багадаа 6 тэмдэгт байна.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const [existingUsers] =
      await db.query(
        `
        SELECT
          id
        FROM users
        WHERE email = ?
        LIMIT 1
        `,
        [normalizedEmail]
      );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "Энэ имэйлээр бүртгэл үүссэн байна.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );

    const [result] =
      await db.query(
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
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
        `,
        [
          companyName.trim(),
          fullName.trim(),
          normalizedEmail,
          phone
            ? phone.trim()
            : null,
          industry,
          hashedPassword,
          "admin",
          "active",
          1,
          null,
          null,
        ]
      );

    const user = {
      id: result.insertId,

      company_id: null,

      company_name:
        companyName.trim(),

      full_name:
        fullName.trim(),

      email:
        normalizedEmail,

      phone:
        phone
          ? phone.trim()
          : null,

      industry,

      role: "admin",

      status: "active",
    };

    const token =
      createToken(user);

    return res.status(201).json({
      success: true,

      message:
        "Бүртгэл амжилттай үүслээ.",

      token,

      user,
    });
  } catch (error) {
    console.error(
      "SIGNUP ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Бүртгэл үүсгэхэд алдаа гарлаа.",

      error:
        error.message,

      code:
        error.code || null,

      errno:
        error.errno || null,

      sqlMessage:
        error.sqlMessage || null,
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
        message:
          "Email and password are required.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const [users] =
      await db.query(
        `
        SELECT
          id,
          company_id,
          company_name,
          full_name,
          email,
          phone,
          industry,
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
        message:
          "Invalid email or password.",
      });
    }

    const user =
      users[0];

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    if (
      user.status !==
      "active"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "This account is not active.",
      });
    }

    const token =
      createToken(user);

    return res.json({
      success: true,

      token,

      user: {
        id:
          user.id,

        company_id:
          user.company_id,

        company_name:
          user.company_name,

        full_name:
          user.full_name,

        email:
          user.email,

        phone:
          user.phone,

        industry:
          user.industry,

        role:
          user.role,

        status:
          user.status,
      },
    });
  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Login failed.",

      error:
        error.message,
    });
  }
};