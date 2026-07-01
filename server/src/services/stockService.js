import prisma from "../config/prisma.js";

// =========================
// Get All Stocks
// =========================
export const getAllStocksService = async () => {
  return await prisma.stock.findMany({
    orderBy: {
      symbol: "asc",
    },
  });
};

// =========================
// Buy Stock
// =========================
export const buyStockService = async (userId, symbol, quantity) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  // Find Stock
  const stock = await prisma.stock.findUnique({
    where: {
      symbol,
    },
  });

  if (!stock) {
    throw new Error("Stock not found");
  }

  // Find Wallet
  const wallet = await prisma.wallet.findUnique({
    where: {
      userId,
    },
  });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  const totalPrice = stock.price * quantity;

  if (wallet.balance < totalPrice) {
    throw new Error("Insufficient wallet balance");
  }

  return await prisma.$transaction(async (tx) => {
    // Deduct wallet balance
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

    // Check existing portfolio
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

// Create Transaction
await tx.transaction.create({
  data: {
    type: "BUY",
    quantity,
    amount: totalPrice,
    userId,
    stockId: stock.id,
  },
});

return {
  message: "Stock purchased successfully",
  stock,
  totalPrice,
};
  });
};

// =========================
// Sell Stock
// =========================
export const sellStockService = async (userId, symbol, quantity) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  // Find Stock
  const stock = await prisma.stock.findUnique({
    where: {
      symbol,
    },
  });

  if (!stock) {
    throw new Error("Stock not found");
  }

  // Find Portfolio
  const portfolio = await prisma.portfolio.findFirst({
    where: {
      userId,
      stockId: stock.id,
    },
  });

  if (!portfolio) {
    throw new Error("You don't own this stock");
  }

  if (portfolio.quantity < quantity) {
    throw new Error("Not enough shares to sell");
  }

  const totalAmount = stock.price * quantity;

  return await prisma.$transaction(async (tx) => {
    // Add money back to wallet
    await tx.wallet.update({
      where: {
        userId,
      },
      data: {
        balance: {
          increment: totalAmount,
        },
      },
    });

    // Remove portfolio if all shares sold
   if (portfolio.quantity === quantity) {
  await tx.portfolio.delete({
    where: {
      id: portfolio.id,
    },
  });
} else {
  await tx.portfolio.update({
    where: {
      id: portfolio.id,
    },
    data: {
      quantity: {
        decrement: quantity,
      },
    },
  });
}

// Create Transaction
await tx.transaction.create({
  data: {
    type: "SELL",
    quantity,
    amount: totalAmount,
    userId,
    stockId: stock.id,
  },
});

return {
  message: "Stock sold successfully",
  stock,
  totalAmount,
};
  });
};