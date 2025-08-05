import type { InferSelectModel } from "drizzle-orm";
import type {
  stacks,
  technologies,
  technologyCategories,
} from "~/server/db/schema";

export type Stack = InferSelectModel<typeof stacks> & {
  technologies: Technology[];
};

export type Technology = InferSelectModel<typeof technologies> & {
  categories: InferSelectModel<typeof technologyCategories>[];
};

export type TechnologyCategory = InferSelectModel<typeof technologyCategories>;
