import { z } from "zod";

export const technologySchema = z.object({
  feeTierLimitations: z.string().optional(),
  plans: z.array(
    z.object({
      name: z.string(),
      price: z.object({
        amount: z.number(),
        currency: z.string(),
        interval: z.string().optional(),
      }),
      features: z.array(z.string()),
      quotas: z.array(
        z.object({
          name: z.string(),
          limit: z.string(),
        }),
      ),
    }),
  ),
});
