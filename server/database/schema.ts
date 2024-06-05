import { sql } from "drizzle-orm";
import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  email: text("email").notNull(),
  oauthProviderId: text("oauth_provider_id").unique(),
});

export const resumes = sqliteTable("resumes", {
  id: integer("id").primaryKey(),
  data: blob("data", { mode: "json" }).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(function getUserID() {
      return users.id;
    }),
  timestamp: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(function getUserID() {
      return users.id;
    }),
  expiresAt: integer("expires_at").notNull(),
});
