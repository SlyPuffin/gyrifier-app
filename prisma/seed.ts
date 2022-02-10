import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const deck = await prisma.dxDeck.create({
    data: {
      type: "concept",
      name: "Seeded Deck 1",
      cards: {
        create: [
          {
            front: "front 1",
            back: "back 1",
            source: "source 1",
            xp: 0.0,
          },
          {
            front: "front 2",
            back: "back 2",
            source: "source 2",
            xp: 1.0,
          },
          {
            front: "front 3",
            back: "back 3",
            source: "source 3",
            xp: 2.0,
          },
          {
            front: "front 4",
            back: "back 4",
            source: "source 4",
            xp: 4.0,
          },
          {
            front: "front 5",
            back: "back 5",
            source: "source 5",
            xp: 6.0,
          },
          {
            front: "front 6",
            back: "back 6",
            source: "source 6",
            xp: 7.0,
          },
          {
            front: "front 7",
            back: "back 7",
            source: "source 7",
            xp: 8.0,
          },
          {
            front: "front 8",
            back: "back 8",
            source: "source 8",
            xp: 9.0,
          },
          {
            front: "front 9",
            back: "back 9",
            source: "source 9",
            xp: 11.0,
          },
          {
            front: "front 10",
            back: "back 10",
            source: "source 10",
            xp: 15.0,
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.log("Error! " + e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
