import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Seeded User",
      decks: {
        create: [
          {
            type: "concept",
            name: "Seeded Deck",
            cards: {
              create: [
                {
                  front: "Front 1",
                  back: "Back 1",
                  source: "Source 1",
                  xp: 0.0,
                },
                {
                  front: "Front 2",
                  back: "Back 2",
                  source: "Source 2",
                  xp: 1.0,
                },
                {
                  front: "Front 3",
                  back: "Back 3",
                  source: "Source 3",
                  xp: 2.0,
                },
                {
                  front: "Front 4",
                  back: "Back 4",
                  source: "Source 4",
                  xp: 4.0,
                },
                {
                  front: "Front 5",
                  back: "Back 5",
                  source: "Source 5",
                  xp: 6.0,
                },
                {
                  front: "Front 6",
                  back: "Back 6",
                  source: "Source 6",
                  xp: 7.0,
                },
                {
                  front: "Front 7",
                  back: "Back 7",
                  source: "Source 7",
                  xp: 8.0,
                },
                {
                  front: "Front 8",
                  back: "Back 8",
                  source: "Source 8",
                  xp: 9.0,
                },
                {
                  front: "Front 9",
                  back: "Back 9",
                  source: "Source 9",
                  xp: 11.0,
                },
                {
                  front: "Front 10",
                  back: "Back 10",
                  source: "Source 10",
                  xp: 15.0,
                },
              ],
            },
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
