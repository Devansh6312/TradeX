import prisma from "../config/prisma.js";

export const getTransactionsService = async (userId) => {
  return await prisma.transaction.findMany({
    where: {
      userId,
    },
    include: {
      stock: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};