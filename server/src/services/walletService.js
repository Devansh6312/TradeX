import prisma from "../config/prisma.js";

export const depositService = async (userId, amount) => {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  const wallet = await prisma.wallet.update({
    where: {
      userId,
    },
    data: {
      balance: {
        increment: amount,
      },
    },
  });

  return wallet;
};