import type {
  SelectStack,
  SelectTechnology,
  SelectTechnologyCategory,
} from "~/server/db/schema";

export type Stack = SelectStack & {
  technologies: Technology[];
};

export type Technology = SelectTechnology & {
  category: SelectTechnologyCategory;
};
