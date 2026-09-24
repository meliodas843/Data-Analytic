const db = require("../config/db");

async function ensureAuthSecurityTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS auth_security (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      failed_login_attempts INT NOT NULL DEFAULT 0,
      login_locked TINYINT(1) NOT NULL DEFAULT 0,
      locked_at DATETIME NULL,
      password_reset_code VARCHAR(10) NULL,
      password_reset_expires_at DATETIME NULL,
      password_change_code VARCHAR(10) NULL,
      password_change_expires_at DATETIME NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY unique_user_id (user_id)
    )
  `);
}

async function ensureSecurityRow(userId) {
  await ensureAuthSecurityTable();

  await db.query(
    `
      INSERT INTO auth_security (
        user_id,
        failed_login_attempts,
        login_locked
      )
      VALUES (?, 0, 0)
      ON DUPLICATE KEY UPDATE
        user_id = VALUES(user_id)
    `,
    [userId]
  );
}

async function getSecurity(userId) {
  await ensureSecurityRow(userId);

  const [rows] = await db.query(
    `
      SELECT
        id,
        user_id,
        failed_login_attempts,
        login_locked,
        locked_at,
        password_reset_code,
        password_reset_expires_at,
        password_change_code,
        password_change_expires_at,
        created_at,
        updated_at
      FROM auth_security
      WHERE user_id = ?
      LIMIT 1
    `,
    [userId]
  );

  return rows[0] || null;
}

async function recordFailedLogin(userId) {
  await ensureSecurityRow(userId);

  const security = await getSecurity(userId);

  const attempts =
    Number(security?.failed_login_attempts || 0) + 1;

  const shouldLock = attempts >= 5;

  await db.query(
    `
      UPDATE auth_security
      SET
        failed_login_attempts = ?,
        login_locked = ?,
        locked_at = ?
      WHERE user_id = ?
    `,
    [
      attempts,
      shouldLock ? 1 : 0,
      shouldLock ? new Date() : null,
      userId,
    ]
  );

  return {
    attempts,
    remainingAttempts: Math.max(0, 5 - attempts),
    locked: shouldLock,
  };
}

async function resetFailedLogin(userId) {
  await ensureSecurityRow(userId);

  await db.query(
    `
      UPDATE auth_security
      SET
        failed_login_attempts = 0,
        login_locked = 0,
        locked_at = NULL
      WHERE user_id = ?
    `,
    [userId]
  );
}

async function unlockUser(userId) {
  await resetFailedLogin(userId);
}

async function isUserLocked(userId) {
  const security = await getSecurity(userId);

  return Number(security?.login_locked || 0) === 1;
}

async function setPasswordResetCode(
  userId,
  code,
  expiresAt
) {
  await ensureSecurityRow(userId);

  await db.query(
    `
      UPDATE auth_security
      SET
        password_reset_code = ?,
        password_reset_expires_at = ?
      WHERE user_id = ?
    `,
    [
      code,
      expiresAt,
      userId,
    ]
  );
}

async function verifyPasswordResetCode(
  userId,
  code
) {
  const security = await getSecurity(userId);

  if (!security) {
    return false;
  }

  if (!security.password_reset_code) {
    return false;
  }

  if (
    String(security.password_reset_code) !==
    String(code || "")
  ) {
    return false;
  }

  if (!security.password_reset_expires_at) {
    return false;
  }

  const expiresAt = new Date(
    security.password_reset_expires_at
  ).getTime();

  if (expiresAt < Date.now()) {
    return false;
  }

  return true;
}

async function clearPasswordResetCode(userId) {
  await ensureSecurityRow(userId);

  await db.query(
    `
      UPDATE auth_security
      SET
        password_reset_code = NULL,
        password_reset_expires_at = NULL
      WHERE user_id = ?
    `,
    [userId]
  );
}

async function setPasswordChangeCode(
  userId,
  code,
  expiresAt
) {
  await ensureSecurityRow(userId);

  await db.query(
    `
      UPDATE auth_security
      SET
        password_change_code = ?,
        password_change_expires_at = ?
      WHERE user_id = ?
    `,
    [
      code,
      expiresAt,
      userId,
    ]
  );
}

async function verifyPasswordChangeCode(
  userId,
  code
) {
  const security = await getSecurity(userId);

  if (!security) {
    return false;
  }

  if (!security.password_change_code) {
    return false;
  }

  if (
    String(security.password_change_code) !==
    String(code || "")
  ) {
    return false;
  }

  if (!security.password_change_expires_at) {
    return false;
  }

  const expiresAt = new Date(
    security.password_change_expires_at
  ).getTime();

  if (expiresAt < Date.now()) {
    return false;
  }

  return true;
}

async function clearPasswordChangeCode(userId) {
  await ensureSecurityRow(userId);

  await db.query(
    `
      UPDATE auth_security
      SET
        password_change_code = NULL,
        password_change_expires_at = NULL
      WHERE user_id = ?
    `,
    [userId]
  );
}

async function clearAllSecurityCodes(userId) {
  await ensureSecurityRow(userId);

  await db.query(
    `
      UPDATE auth_security
      SET
        password_reset_code = NULL,
        password_reset_expires_at = NULL,
        password_change_code = NULL,
        password_change_expires_at = NULL
      WHERE user_id = ?
    `,
    [userId]
  );
}

module.exports = {
  ensureAuthSecurityTable,
  ensureSecurityRow,
  getSecurity,
  recordFailedLogin,
  resetFailedLogin,
  unlockUser,
  isUserLocked,
  setPasswordResetCode,
  verifyPasswordResetCode,
  clearPasswordResetCode,
  setPasswordChangeCode,
  verifyPasswordChangeCode,
  clearPasswordChangeCode,
  clearAllSecurityCodes,
};