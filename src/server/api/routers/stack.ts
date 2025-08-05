import { eq } from "drizzle-orm";
import type { Stack } from "~/lib/types";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  stacks,
  technologies,
  technologyCategories,
  technologyStacks,
} from "~/server/db/schema";

export const stackRouter = createTRPCRouter({
  getStacks: publicProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({
        stackId: stacks.id,
        stackName: stacks.name,
        technologyId: technologies.id,
        technologyProvider: technologies.provider,
        technologyFreeTier: technologies.freeTier,
        technologyCategoryId: technologyCategories.id,
        technologyCategoryName: technologyCategories.name,
      })
      .from(stacks)
      .leftJoin(technologyStacks, eq(technologyStacks.stackId, stacks.id))
      .leftJoin(
        technologies,
        eq(technologies.id, technologyStacks.technologyId),
      )
      .leftJoin(
        technologyCategories,
        eq(technologyCategories.id, technologies.categoryId),
      );

    const stackMap = new Map<number, Stack>();

    for (const row of rows) {
      if (!stackMap.has(row.stackId)) {
        stackMap.set(row.stackId, {
          id: row.stackId,
          name: row.stackName,
          technologies: [],
        });
      }

      if (!row.technologyId) continue;

      const stack = stackMap.get(row.stackId);

      if (!stack) {
        throw new Error(`Stack with id ${row.stackId} not found`);
      }

      let tech = stack.technologies.find((t) => t.id === row.technologyId);

      if (!tech) {
        tech = {
          id: row.technologyId,
          provider: row.technologyProvider,
          freeTier: row.technologyFreeTier,
          categoryId: row.technologyCategoryId,
          categories: [],
        };
        stack.technologies = [...stack.technologies, tech];
      }

      if (
        row.technologyCategoryId &&
        !tech.categories.some((c) => c.id === row.technologyCategoryId)
      ) {
        tech.categories = [
          ...tech.categories,
          { id: row.technologyCategoryId, name: row.technologyCategoryName },
        ];
      }
    }

    return Array.from(stackMap.values());
  }),
});
