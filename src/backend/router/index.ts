import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = trpc.router().query("get-random-card", {
  input: z
    .object({
      text: z.string().nullish(),
    })
    .nullish(),
  async resolve({ input }) {
    const cardFromDb = await prisma.card.findFirst();
    return { front: cardFromDb?.front };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
