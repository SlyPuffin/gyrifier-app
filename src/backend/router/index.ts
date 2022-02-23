import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";
import { resolve } from "path/posix";

export const appRouter = trpc
  .router()
  .query("get-user", {
    async resolve() {
      const userFromDb = await prisma.user.findFirst();
      return { user: userFromDb };
    },
  })
  .query("get-decks-for-user", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const decksFromDb = await prisma.deck.findMany({
        where: {
          userId: id,
        },
      });
      return { decks: decksFromDb };
    },
  })
  .query("get-cards-from-deck", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const cardsFromDb = await prisma.card.findMany({
        where: {
          deckId: id,
        },
      });
      return { cards: cardsFromDb };
    },
  })
  .mutation("add-card", {
    input: z.object({
      front: z.string(),
      back: z.string(),
      source: z.string(),
      xp: z.number(),
      deckId: z.string(),
    }),
    async resolve({ input }) {
      const newCard = await prisma.card.create({
        data: {
          front: input.front,
          back: input.back,
          source: input.source,
          xp: input.xp,
          deckId: input.deckId,
        },
      });
      return newCard;
    },
  })
  .mutation("add-deck", {
    input: z.object({
      name: z.string(),
      type: z.string(),
      userId: z.string(),
    }),
    async resolve({ input }) {
      const newDeck = await prisma.deck.create({
        data: {
          name: input.name,
          type: input.type,
          userId: input.userId,
        },
      });
      return newDeck;
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
