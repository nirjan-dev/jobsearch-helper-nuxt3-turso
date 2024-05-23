import { blob, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const resumes = sqliteTable("resumes", {
  id: integer("id").primaryKey(),
  data: blob("data", { mode: "json" }).notNull(),
  user_id: integer("user_id").notNull(),
  created_at: integer("created_at", { mode: "timestamp" }).notNull(),
  updated_at: integer("updated_at", { mode: "timestamp" }),
});
