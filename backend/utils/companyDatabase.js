const mysql = require("mysql2/promise");

function createCompanyConnection(config) {
  return mysql.createConnection({
    host: config.db_host,
    port: Number(config.db_port || 3306),
    user: config.db_username,
    password: config.db_password,
    database: config.db_name,
    connectTimeout: 10000,
    multipleStatements: false,
  });
}

module.exports = {
  createCompanyConnection,
};