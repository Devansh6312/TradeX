import prisma from "../config/prisma.js";

export const getDashboardService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  const wallet = await prisma.wallet.findUnique({
    where: { userId },
  });

  const portfolio = await prisma.portfolio.findMany({
    where: { userId },
    include: {
      stock: true,
    },
  });

  const transactions = await prisma.transaction.findMany({
    where: { userId },
    include: {
      stock: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return {
    user,
    wallet,
    portfolio,
    transactions,
  };
};