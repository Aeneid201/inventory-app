const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.HOSTNAME,
  user: process.env.USER,
  database: "postgres",
  password: process.env.ROLE_PASSWORD,
  port: 5432
});