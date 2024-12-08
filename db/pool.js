const { Pool } = require("pg");
require('dotenv').config({path: './config/.env'})

// const pool = new Pool({
//   host: process.env.HOSTNAME,
//   user: process.env.USER,
//   database: "postgres",
//   password: process.env.ROLE_PASSWORD,
//   port: 5432
// });

// production
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});


module.exports = pool;