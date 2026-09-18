const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const db =
  require("../config/db");

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      company_id:
        user.company_id || null,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

async function getSubscription(
  userId
) {
  const [subscriptions] =
    await db.query(
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

  if (
    subscriptions.length === 0
  ) {
    return {
      subscribed: false,
      plan: null,
      status: "none",
      started_at: null,
      expires_at: null,
    };
  }

  const subscription =
    subscriptions[0];

  let status =
    subscription.status;

  if (
    status === "active" &&
    subscription.expires_at &&
    new Date(
      subscription.expires_at
    ).getTime() <= Date.now()
  ) {
    status = "expired";

    await db.query(
      `
      UPDATE subscriptions
      SET status = 'expired'
      WHERE id = ?
      `,
      [
        subscription.id,
      ]
    );
  }

  return {
    id:
      subscription.id,

    subscribed:
      status === "active",

    plan:
      subscription.plan,

    status,

    started_at:
      subscription.started_at,

    expires_at:
      subscription.expires_at,
  };
}

exports.signup = async (
  req,
  res
) => {
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
      return res
        .status(400)
        .json({
          success: false,

          message:
            "Бүх шаардлагатай мэдээллийг бөглөнө үү.",
        });
    }

    const normalizedEmail =
      email
        .trim()
        .toLowerCase();

    const normalizedPhone =
      phone
        .trim();

    if (
      password.length < 8
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            "Нууц үг хамгийн багадаа 8 тэмдэгт байна.",
        });
    }

    if (
      !/[A-Za-zА-Яа-яӨөҮүЁё]/.test(
        password
      )
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            "Нууц үг дор хаяж нэг үсэг агуулсан байна.",
        });
    }

    if (
      !/\d/.test(password)
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            "Нууц үг дор хаяж нэг тоо агуулсан байна.",
        });
    }

    const [
      existingUsers,
    ] =
      await db.query(
        `
        SELECT id
        FROM users
        WHERE email = ?
        LIMIT 1
        `,
        [
          normalizedEmail,
        ]
      );

    if (
      existingUsers.length > 0
    ) {
      return res
        .status(409)
        .json({
          success: false,

          message:
            "Энэ и-мэйл хаягаар бүртгэл үүссэн байна.",
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
      id:
        result.insertId,

      company_id:
        null,

      company_name:
        companyName.trim(),

      full_name:
        fullName.trim(),

      email:
        normalizedEmail,

      phone:
        normalizedPhone,

      role:
        "admin",

      status:
        "active",

      email_verified:
        1,
    };

    const token =
      createToken(user);

    const subscription = {
      subscribed: false,
      plan: null,
      status: "none",
      started_at: null,
      expires_at: null,
    };

    return res
      .status(201)
      .json({
        success: true,

        message:
          "Бүртгэл амжилттай үүслээ.",

        token,

        user,

        subscription,
      });
  } catch (error) {
    console.error(
      "SIGNUP ERROR:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,

        message:
          "Бүртгэл үүсгэхэд алдаа гарлаа.",

        error:
          error.message,
      });
  }
};

exports.login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (
      !email ||
      !password
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            "Имэйл болон нууц үгээ оруулна уу.",
        });
    }

    const normalizedEmail =
      email
        .trim()
        .toLowerCase();

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
          password,
          role,
          status,
          email_verified
        FROM users
        WHERE email = ?
        LIMIT 1
        `,
        [
          normalizedEmail,
        ]
      );

    if (
      users.length === 0
    ) {
      return res
        .status(401)
        .json({
          success: false,

          message:
            "Имэйл хаяг эсвэл нууц үг буруу байна.",
        });
    }

    const user =
      users[0];

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password
      );

    if (
      !passwordMatches
    ) {
      return res
        .status(401)
        .json({
          success: false,

          message:
            "Имэйл хаяг эсвэл нууц үг буруу байна.",
        });
    }

    if (
      user.status !== "active"
    ) {
      return res
        .status(403)
        .json({
          success: false,

          message:
            "Таны бүртгэл идэвхгүй байна.",
        });
    }

    const subscription =
      await getSubscription(
        user.id
      );

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

        role:
          user.role,

        status:
          user.status,

        email_verified:
          user.email_verified,
      },

      subscription,
    });
  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,

        message:
          "Нэвтрэх үед алдаа гарлаа.",

        error:
          error.message,
      });
  }
};

exports.me = async (
  req,
  res
) => {
  try {
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
          role,
          status,
          email_verified
        FROM users
        WHERE id = ?
        LIMIT 1
        `,
        [
          req.user.id,
        ]
      );

    if (
      users.length === 0
    ) {
      return res
        .status(404)
        .json({
          success: false,

          message:
            "Хэрэглэгч олдсонгүй.",
        });
    }

    const user =
      users[0];

    if (
      user.status !== "active"
    ) {
      return res
        .status(403)
        .json({
          success: false,

          message:
            "Таны бүртгэл идэвхгүй байна.",
        });
    }

    const subscription =
      await getSubscription(
        user.id
      );

    return res.json({
      success: true,
      user,
      subscription,
    });
  } catch (error) {
    console.error(
      "AUTH ME ERROR:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,

        message:
          "Хэрэглэгчийн мэдээлэл авахад алдаа гарлаа.",

        error:
          error.message,
      });
  }
};