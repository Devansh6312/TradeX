import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const stocks = [
    {
      symbol: "AAPL",
      company: "Apple Inc.",
      price: 190,
    },
    {
      symbol: "TSLA",
      company: "Tesla Inc.",
      price: 250,
    },
    {
      symbol: "NVDA",
      company: "NVIDIA Corporation",
      price: 145,
    },
    {
      symbol: "MSFT",
      company: "Microsoft Corporation",
      price: 430,
    },
    {
      symbol: "GOOGL",
      company: "Alphabet Inc.",
      price: 180,
    },
  ];

  for (const stock of stocks) {
    await prisma.stock.upsert({
      where: {
        symbol: stock.symbol,
      },
      update: {},
      create: stock,
    });
  }

  console.log("✅ Stocks seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });