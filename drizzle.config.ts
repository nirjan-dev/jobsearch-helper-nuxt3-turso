import type { Config } from "drizzle-kit";

const isProduction = process.env.NODE_ENV === "production";

// eslint-disable-next-line no-console
console.log(
  "Running migrations on: ",
  isProduction ? "production" : "development",
);

const dbCredentials = {
  url: isProduction ? process.env.NUXT_DB_URL ?? "" : "file:.data/db.sqlite3",
  authToken: process.env.NUXT_DB_AUTH_TOKEN,
};

export default {
  dialect: "sqlite",
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  dbCredentials,
  driver: "turso",
} satisfies Config;
