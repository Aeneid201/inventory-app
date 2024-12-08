const { Client } = require("pg");
require('dotenv').config({path: './config/.env'})


const SQL = `
CREATE SEQUENCE IF NOT EXISTS categories_id_seq;
CREATE SEQUENCE IF NOT EXISTS products_id_seq;

CREATE TABLE "public"."categories" (
    "id" int4 NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
    "name" varchar NOT NULL,
    "description" text,
    "image" varchar,
    "cloudinary_id" varchar,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."products" (
    "id" int4 NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    "name" varchar NOT NULL,
    "category_id" int4,
    "image" varchar,
    "description" text,
    "slug" varchar NOT NULL,
    "price" float8,
    "date_added" timestamp DEFAULT now(),
    "cloudinary_id" varchar,
    CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE SET NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."categories" ("id", "name", "description", "image", "cloudinary_id") VALUES
(2, 'dress', '', 'https://res.cloudinary.com/dstdwoljc/image/upload/v1733447671/placeholder.webp', 'placeholder');
INSERT INTO "public"."categories" ("id", "name", "description", "image", "cloudinary_id") VALUES
(1, 'hoodie', '', 'https://res.cloudinary.com/dstdwoljc/image/upload/v1733447671/placeholder.webp', 'placeholder');

INSERT INTO "public"."products" ("id", "name", "category_id", "image", "description", "slug", "price", "date_added", "cloudinary_id") VALUES
(1, 'Vintage soft hoodie', 1, 'https://res.cloudinary.com/dstdwoljc/image/upload/v1733449787/pp6smqwwns7hz7gtcobt.jpg', 'Nice hoodie for the cold Canadian winter, grab yours today!', 'vintage-soft-hoodie', 60, '2024-12-05 20:49:27.566699', 'pp6smqwwns7hz7gtcobt');
`;

// const SQL = `
// CREATE TABLE IF NOT EXISTS usernames (
//   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   username VARCHAR ( 255 )
// );

// INSERT INTO usernames (username) 
// VALUES
//   ('Bryan'),
//   ('Odin'),
//   ('Damon');
// `;

async function main() {
  console.log("seeding...");
  console.log(process.env.USER, process.env.ROLE_PASSWORD, process.env.HOSTNAME);
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.ROLE_PASSWORD}@${process.env.HOSTNAME}:5432/postgres`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("SQL was executed");
}

main();