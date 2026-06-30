import prisma from "../config/prisma.js";

// Deposit Money
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

// Get Wallet
export const getWalletService = async (userId) => {
  const wallet = await prisma.wallet.findUnique({
    where: {
      userId,
    },
  });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  return wallet;
};