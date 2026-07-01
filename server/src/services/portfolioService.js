import prisma from "../config/prisma.js";

export const getPortfolioService = async (userId) => {
  const portfolio = await prisma.portfolio.findMany({
    where: {
      userId,
    },
    include: {
      stock: true,
    },
  });

  return portfolio;
};