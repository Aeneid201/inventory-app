const { Client } = require("pg");
require('dotenv').config({path: './config/.env'})

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 )
);

INSERT INTO usernames (username) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;

async function main() {
  console.log("seeding...");
  console.log(process.env.USER, process.env.ROLE_PASSWORD, process.env.HOSTNAME);
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.ROLE_PASSWORD}@${process.env.HOSTNAME}:5432/postgres`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();