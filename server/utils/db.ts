import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const config = useRuntimeConfig();

const url = import.meta.dev ? "file:./.data/db.sqlite3" : config.dbUrl;
export const database = createClient({
  url,
  authToken: config.dbAuthToken,
});

export const orm = drizzle(database);
