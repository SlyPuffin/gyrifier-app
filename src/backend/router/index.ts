import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = trpc.router()
  .query("create-random-card", {
    input: z
    .object({
      front: z.string().nullish(),
    })
    .nullish(),
    async resolve({ input }) {
    const cardFromDb = await prisma.card.create({data: 
      {front: "this is front", 
      back: "back",
      source: "the source",
      xp: 2}});
    return { front: cardFromDb?.front }
  }
  })
.mutation("add-card", {
  input: z.object({
    front: z.string(),
    deckId: z.number()
  }),
  async resolve({ input }) {
    const newCard = await prisma.card.create({data: 
      {front: input.front, 
      back: "back",
      source: "the source",
      deckId: input.deckId,
      xp: 2}
    });
    return newCard;
  }
})
.mutation("add-deck", {
  input: z.object({
    title: z.string(),
    description: z.string()
  }),
  async resolve({ input }) {
    const newDeck = await prisma.deck.create({data: 
      {title: input.title,
       description: input.description}
    });
    return newDeck;
  }
})
.query("get-random-card", {
  input: z
    .object({
      text: z.string().nullish(),
    })
    .nullish(),
  async resolve({ input }) {
    const cardsFromDb = await prisma.card.findMany({include: {Deck: true}});
    const index = Math.ceil(Math.random() * (cardsFromDb.length-1));

    return { card : cardsFromDb[index] };
  },
})
.query("get-decks", {
  async resolve({ }) {
    const decksFromDb = await prisma.deck.findMany();
    console.log("number of decks");
    console.log(decksFromDb.length)

    return { decks: decksFromDb };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
