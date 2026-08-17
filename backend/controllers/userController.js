const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        company_name,
        full_name,
        email,
        role,
        status,
        created_at,
        updated_at
      FROM users
      ORDER BY created_at DESC
    `);

    const users = rows.map((user) => ({
      id: user.id,
      name: user.full_name,
      full_name: user.full_name,
      email: user.email,
      company_name: user.company_name,
      role: user.role,
      status: user.status,
      company_id: null,
      last_login: null,
      is_locked: user.status === "inactive",
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(
      "GET USERS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Хэрэглэгчдийг авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      full_name,
      email,
      password,
      role,
      company_name,
    } = req.body;

    const finalName =
      full_name || name;

    if (
      !finalName ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Нэр, имэйл, нууц үг шаардлагатай.",
      });
    }

    const normalizedEmail =
      email
        .trim()
        .toLowerCase();

    const [existing] =
      await db.query(
        `
        SELECT id
        FROM users
        WHERE email = ?
        LIMIT 1
        `,
        [normalizedEmail]
      );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "Энэ имэйл бүртгэлтэй байна.",
      });
    }

    const allowedRoles = [
      "super_admin",
      "admin",
    ];

    const finalRole =
      allowedRoles.includes(role)
        ? role
        : "admin";

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const [result] =
      await db.query(
        `
        INSERT INTO users (
          company_name,
          full_name,
          email,
          password,
          role,
          status
        )
        VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
        `,
        [
          company_name || null,
          finalName.trim(),
          normalizedEmail,
          hashedPassword,
          finalRole,
          "active",
        ]
      );

    res.status(201).json({
      success: true,
      message:
        "Хэрэглэгч амжилттай үүсгэгдлээ.",
      user: {
        id: result.insertId,
        full_name:
          finalName.trim(),
        name:
          finalName.trim(),
        email:
          normalizedEmail,
        company_name:
          company_name || null,
        role:
          finalRole,
        status:
          "active",
        company_id:
          null,
        last_login:
          null,
        is_locked:
          false,
      },
    });
  } catch (error) {
    console.error(
      "CREATE USER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Хэрэглэгч үүсгэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } =
      req.params;

    const {
      name,
      full_name,
      email,
      password,
      role,
      company_name,
      status,
    } = req.body;

    const [rows] =
      await db.query(
        `
        SELECT *
        FROM users
        WHERE id = ?
        LIMIT 1
        `,
        [id]
      );

    if (
      rows.length === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Хэрэглэгч олдсонгүй.",
      });
    }

    const current =
      rows[0];

    const finalName =
      full_name ||
      name ||
      current.full_name;

    const finalEmail =
      (
        email ||
        current.email
      )
        .trim()
        .toLowerCase();

    const finalCompany =
      company_name ??
      current.company_name;

    const allowedRoles = [
      "super_admin",
      "admin",
    ];

    const finalRole =
      role &&
      allowedRoles.includes(role)
        ? role
        : current.role;

    const allowedStatuses = [
      "pending",
      "active",
      "inactive",
    ];

    const finalStatus =
      status &&
      allowedStatuses.includes(status)
        ? status
        : current.status;

    const [duplicateEmail] =
      await db.query(
        `
        SELECT id
        FROM users
        WHERE email = ?
          AND id <> ?
        LIMIT 1
        `,
        [
          finalEmail,
          id,
        ]
      );

    if (
      duplicateEmail.length >
      0
    ) {
      return res.status(409).json({
        success: false,
        message:
          "Энэ имэйл өөр хэрэглэгч дээр бүртгэлтэй байна.",
      });
    }

    let finalPassword =
      current.password;

    if (
      password &&
      password.trim()
    ) {
      finalPassword =
        await bcrypt.hash(
          password,
          10
        );
    }

    await db.query(
      `
      UPDATE users
      SET
        company_name = ?,
        full_name = ?,
        email = ?,
        password = ?,
        role = ?,
        status = ?
      WHERE id = ?
      `,
      [
        finalCompany,
        finalName.trim(),
        finalEmail,
        finalPassword,
        finalRole,
        finalStatus,
        id,
      ]
    );

    res.json({
      success: true,
      message:
        "Хэрэглэгч шинэчлэгдлээ.",
      user: {
        id: Number(id),
        company_name:
          finalCompany,
        full_name:
          finalName.trim(),
        name:
          finalName.trim(),
        email:
          finalEmail,
        role:
          finalRole,
        status:
          finalStatus,
        is_locked:
          finalStatus ===
          "inactive",
      },
    });
  } catch (error) {
    console.error(
      "UPDATE USER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Хэрэглэгч шинэчлэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.toggleUserLock = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    const {
      is_locked,
    } = req.body;

    const newStatus =
      is_locked
        ? "inactive"
        : "active";

    const [result] =
      await db.query(
        `
        UPDATE users
        SET status = ?
        WHERE id = ?
        `,
        [
          newStatus,
          id,
        ]
      );

    if (
      result.affectedRows === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Хэрэглэгч олдсонгүй.",
      });
    }

    res.json({
      success: true,
      message:
        is_locked
          ? "Хэрэглэгч түгжигдлээ."
          : "Хэрэглэгчийн түгжээ тайлагдлаа.",
      is_locked,
      status:
        newStatus,
    });
  } catch (error) {
    console.error(
      "LOCK USER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Хэрэглэгчийн төлөв өөрчлөхөд алдаа гарлаа.",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } =
      req.params;

    const [rows] =
      await db.query(
        `
        SELECT
          id,
          role
        FROM users
        WHERE id = ?
        LIMIT 1
        `,
        [id]
      );

    if (
      rows.length === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Хэрэглэгч олдсонгүй.",
      });
    }

    if (
      rows[0].role ===
      "super_admin"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Super Admin хэрэглэгчийг устгах боломжгүй.",
      });
    }

    await db.query(
      `
      DELETE FROM users
      WHERE id = ?
      `,
      [id]
    );

    res.json({
      success: true,
      message:
        "Хэрэглэгч устгагдлаа.",
    });
  } catch (error) {
    console.error(
      "DELETE USER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Хэрэглэгч устгахад алдаа гарлаа.",
      error: error.message,
    });
  }
};