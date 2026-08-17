const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function createSuperAdmin() {
  let connection;

  try {
    const email = await ask("Super Admin email: ");
    const fullName = await ask("Super Admin name: ");
    const password = await ask("Super Admin password: ");

    if (!email || !fullName || !password) {
      console.log("❌ Email, name and password are required.");
      rl.close();
      return;
    }

    if (password.length < 8) {
      console.log("❌ Password must be at least 8 characters.");
      rl.close();
      return;
    }

    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "tuvshuu123",
      database: "data_view",
    });

    console.log("✅ Connected to MySQL");

    const [existingUsers] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      console.log("❌ A user with this email already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await connection.execute(
      `
        INSERT INTO users (
          company_name,
          full_name,
          email,
          date_of_birth,
          password,
          role,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        null,
        fullName,
        email,
        null,
        hashedPassword,
        "super_admin",
        "active",
      ]
    );

    console.log("");
    console.log("================================");
    console.log("✅ SUPER ADMIN CREATED");
    console.log("================================");
    console.log(`ID: ${result.insertId}`);
    console.log(`Name: ${fullName}`);
    console.log(`Email: ${email}`);
    console.log("Role: super_admin");
    console.log("Status: active");
    console.log("================================");
  } catch (error) {
    console.error("");
    console.error("❌ Failed to create Super Admin:");
    console.error(error.message);
  } finally {
    if (connection) {
      await connection.end();
    }

    rl.close();
  }
}

createSuperAdmin();