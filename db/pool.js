const { Pool } = require("pg");
const parse = require('pg-connection-string').parse;
require('dotenv').config({path: './config/.env'})
const config = parse(process.env.DATABASE_URL)


// const pool = new Pool({
//   host: process.env.HOSTNAME,
//   user: process.env.USER,
//   database: "postgres",
//   password: process.env.ROLE_PASSWORD,
//   port: 5432
// });

// production
const pool = new Pool({
  host: config.host,
  user: config.user,
  database: config.database,
  password: config.password,
  port: config.port,
  //ssl: { rejectUnauthorized: false },
  ssl: true
});


module.exports = pool;