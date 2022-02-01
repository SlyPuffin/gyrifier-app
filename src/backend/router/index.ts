import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = trpc.router().query("get-deck", {
  input: z
    .object({
      text: z.string().nullish(),
    })
    .nullish(),
  async resolve({ input }) {
    const cardsFromDb = await prisma.dxCard.findMany();
    return { cards: cardsFromDb };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
