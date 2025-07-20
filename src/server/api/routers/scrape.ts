import FirecrawlApp from "@mendable/firecrawl-js";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env";
import { technologySchema } from "~/lib/crawling-schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const firecrawlApp = new FirecrawlApp({
  apiKey: env.FIRECRAWL_API_KEY,
});

export const scrapeRouter = createTRPCRouter({
  scrape: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input }) => {
      const scrapeResult = await firecrawlApp.scrapeUrl(input.url, {
        formats: ["json"],
        jsonOptions: {
          schema: technologySchema,
          prompt: "Extract all quotas in details.",
        },
      });

      if (!scrapeResult.success) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Scraping error: ${scrapeResult.error}`,
        });
      }

      console.log("Scrape result:", scrapeResult.json);

      return scrapeResult.json || "No data found";
    }),
});
