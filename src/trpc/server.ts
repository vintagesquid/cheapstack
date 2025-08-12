import "server-only";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { cache } from "react";
import SuperJSON from "superjson";
import { type AppRouter, appRouter, createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  return createTRPCContext({
    headers: new Headers({
      "x-trpc-source": "rsc",
    }),
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);

/**
 * Use it in generateStaticParams();
 */
export const trpcSSGHelper = createServerSideHelpers<AppRouter>({
  router: appRouter,
  ctx: await createTRPCContext({
    headers: new Headers({
      "x-trpc-source": "nextjs-build",
    }),
  }),
  transformer: SuperJSON,
});
