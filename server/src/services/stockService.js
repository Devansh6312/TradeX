import prisma from "../config/prisma.js";

// Get all stocks
export const getAllStocksService = async () => {
  return await prisma.stock.findMany({
    orderBy: {
      symbol: "asc",
    },
  });
};

// Buy Stock
export const buyStockService = async (userId, symbol, quantity) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  // Find stock
  const stock = await prisma.stock.findUnique({
    where: {
      symbol,
    },
  });

  if (!stock) {
    throw new Error("Stock not found");
  }

  // Find wallet
  const wallet = await prisma.wallet.findUnique({
    where: {
      userId,
    },
  });

  const totalPrice = stock.price * quantity;

  if (wallet.balance < totalPrice) {
    throw new Error("Insufficient wallet balance");
  }

  return await prisma.$transaction(async (tx) => {

    // Deduct money
    await tx.wallet.update({
      where: {
        userId,
      },
      data: {
        balance: {
          decrement: totalPrice,
        },
      },
    });

    // Check portfolio
    const existingPortfolio = await tx.portfolio.findFirst({
      where: {
        userId,
        stockId: stock.id,
      },
    });

    if (existingPortfolio) {

      await tx.portfolio.update({
        where: {
          id: existingPortfolio.id,
        },
        data: {
          quantity: {
            increment: quantity,
          },
        },
      });

    } else {

      await tx.portfolio.create({
        data: {
          userId,
          stockId: stock.id,
          quantity,
        },
      });

    }

    return {
      message: "Stock purchased successfully",
      stock,
      totalPrice,
    };
  });
};