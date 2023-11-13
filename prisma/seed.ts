import { PrismaClient } from "@prisma/client";
import { cloneDeep } from "lodash";
const categories = [
  {
    "id": 1,
    "title": "The Catcher in the Rye",
    "ISBN": "9780439558435"
  },
  {
    "id": 2,
    "title": "To Kill a Mockingbird",
    "ISBN": "9780061120084"
  },
  {
    "id": 3,
    "title": "1984",
    "ISBN": "9780451524935"
  },
  {
    "id": 4,
    "title": "Pride and Prejudice",
    "ISBN": "9780141439518"
  },
  {
    "id": 5,
    "title": "The Great Gatsby",
    "ISBN": "9780743273565"
  },
  {
    "id": 6,
    "title": "One Hundred Years of Solitude",
    "ISBN": "9780061120084"
  },
  {
    "id": 7,
    "title": "Brave New World",
    "ISBN": "9780060850524"
  },
  {
    "id": 8,
    "title": "The Hobbit",
    "ISBN": "9780547928227"
  },
  {
    "id": 9,
    "title": "Fahrenheit 451",
    "ISBN": "9781451673319"
  },
  {
    "id": 10,
    "title": "The Lord of the Rings",
    "ISBN": "9780544003415"
  }
]

async function main() {
  console.log(`Start seeding categories...`);
  const prisma = new PrismaClient({
    datasources: {
      db: { url: <string>process.env.DATABASE_URL },
    },
  });
  for await (const category of categories) {
    const { id, ...create } = cloneDeep(category);
    await prisma.book.upsert({
      where: { id },
      create,
      update: create
    });
  }
}
main()
  .then(() => {
    console.log('Seeding completed categories');
    process.exit();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit();
  });