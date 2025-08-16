import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from "drizzle-orm";
import { primaryKey, sqliteTableCreator } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => name);

export const technologyCategories = createTable("technology_category", (d) => ({
  id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: d.text(),
}));

export type SelectTechnologyCategory = InferSelectModel<typeof technologyCategories>;
export type InsertTechnologyCategory = InferInsertModel<typeof technologyCategories>;

export const technologyCategoryRelations = relations(
  technologyCategories,
  ({ many }) => ({
    technologies: many(technologies),
  }),
);

export const technologies = createTable("technology", (d) => ({
  id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  provider: d.text(),
  categoryId: d
    .integer({ mode: "number" })
    .references(() => technologyCategories.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
  freeTier: d.text(),
}));

export type SelectTechnology = InferSelectModel<typeof technologies>;
export type InsertTechnology = InferInsertModel<typeof technologies>;

export const technologyRelations = relations(technologies, ({ many, one }) => ({
  category: one(technologyCategories, {
    fields: [technologies.categoryId],
    references: [technologyCategories.id],
  }),
  technologyStacks: many(technologyStacks),
}));

export const stackCategories = createTable("stack_category", (d) => ({
  id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: d.text(),
}));

export type SelectStackCategory = InferSelectModel<typeof stackCategories>;
export type InsertStackCategory = InferInsertModel<typeof stackCategories>;


export const stackCategoryRelations = relations(
  stackCategories,
  ({ many }) => ({
    stacks: many(stacks),
  }),
);

export const stacks = createTable("stack", (d) => ({
  id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: d.text(),
  categoryId: d
    .integer({ mode: "number" })
    .references(() => stackCategories.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
}));

export type SelectStack = InferSelectModel<typeof stacks>;
export type InsertStack = InferInsertModel<typeof stacks>;

export const stacksRelations = relations(stacks, ({ many, one }) => ({
  technologyStacks: many(technologyStacks),
  category: one(stackCategories, {
    fields: [stacks.categoryId],
    references: [stackCategories.id],
  }),
}));

export const technologyStacks = createTable(
  "technology_stack",
  (d) => ({
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
  }),
  (table) => [
    primaryKey({
      columns: [table.stackId, table.technologyId],
    }),
  ],
);
