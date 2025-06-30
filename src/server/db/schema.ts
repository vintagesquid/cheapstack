import { sqliteTableCreator } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => name);

export const technologyCategories = createTable("technology_category", (d) => ({
  id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: d.text({ length: 256 }),
}));

export const technologies = createTable("technology", (d) => ({
  id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  provider: d.text({ length: 256 }),
  hasFreeTier: d.integer({ mode: "boolean" }),
  categoryId: d
    .integer({ mode: "number" })
    .references(() => technologyCategories.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
}));

export const stacks = createTable("stack", (d) => ({
  id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: d.text({ length: 256 }),
}));

export const technologyStacks = createTable("technology_stack", (d) => ({
  id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  technologyId: d
    .integer({ mode: "number" })
    .references(() => technologies.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  stackId: d.integer({ mode: "number" }).references(() => stacks.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
}));
