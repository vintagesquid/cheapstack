import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import type { InferInsertModel } from "drizzle-orm";
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
  // desctructure junction table to seed manually later (issue: https://github.com/drizzle-team/drizzle-orm/issues/4354)
  const { technologyStacks, ...mainTables } = schema;

  await seed(db, mainTables);

  const stacks = await db.select().from(mainTables.stacks).limit(3);
  const technologies = await db.select().from(mainTables.technologies).limit(3);

  if (stacks.length === 0 || technologies.length === 0) {
    throw new Error("Insufficient data for junction tables");
  }

  type TechnologyStackInsert = InferInsertModel<typeof technologyStacks>;
  type TechnologyStackData = Record<
    keyof TechnologyStackInsert,
    TechnologyStackInsert[keyof TechnologyStackInsert]
  >[];

  const technologyStackData: TechnologyStackData = [
    {
      stackId: stacks[0]?.id,
      technologyId: technologies[0]?.id,
    },
    {
      stackId: stacks[0]?.id,
      technologyId: technologies[1]?.id,
    },
    {
      stackId: stacks[1]?.id,
      technologyId: technologies[0]?.id,
    },

    {
      stackId: stacks[2]?.id,
      technologyId: technologies[0]?.id,
    },
    {
      stackId: stacks[2]?.id,
      technologyId: technologies[1]?.id,
    },
    {
      stackId: stacks[2]?.id,
      technologyId: technologies[2]?.id,
    },
  ];

  await db
    .insert(technologyStacks)
    .values(technologyStackData)
    .onConflictDoNothing();

  console.log("Database seeded successfully.");
}

main();
