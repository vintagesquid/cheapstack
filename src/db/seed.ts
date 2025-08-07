import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { seed } from "drizzle-seed";

import * as schema from "../server/db/schema";

dotenv.config();

async function main() {
  if (!process.env.TURSO_DATABASE_URL) {
    throw new Error("TURSO_DATABASE_URL is not defined.");
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const db = drizzle(client, { casing: "snake_case" });

  await seed(db, schema);

  console.log("Database seeded successfully.");
}

main();
