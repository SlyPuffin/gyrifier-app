import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = trpc
  .router()
  .query("say-hi", {
  async resolve() {
    return {hi: "Hello There"}
  }
})
  .query("get-decks", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    async resolve({ input }) {
      const decksFromDb = await prisma.dxDeck.findMany();
      return { decks: decksFromDb };
    },
  })
  .query("get-cards-from-deck",
   {input: z.object({id: z.string(),}),
    async resolve({ input }) {
      const { id } = input;
      const cardsFromDb = await prisma.dxCard.findMany({
        where: {
          deckId: id,
        },
      });
      return { cards: cardsFromDb };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
