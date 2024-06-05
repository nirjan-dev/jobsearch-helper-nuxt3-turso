import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { sessions, users } from "~/server/database/schema";
import { orm } from "~/server/database/db";

export { orm as db } from "~/server/database/db";
export { users as usersTable } from "~/server/database/schema";

export const nkAuthDBAdapter = new DrizzleSQLiteAdapter(orm, sessions, users);
