import {
  getAllStocksService,
  buyStockService,
  sellStockService,
} from "../services/stockService.js";

// Get Stocks
export const getAllStocks = async (req, res) => {
  try {
    const stocks = await getAllStocksService();

    res.status(200).json({
      success: true,
      stocks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
  
};

// Buy Stock
export const buyStock = async (req, res) => {
  try {

    const userId = req.user.id;
    const { symbol, quantity } = req.body;

    const result = await buyStockService(
      userId,
      symbol,
      quantity
    );

    res.status(200).json({
      success: true,
      ...result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

// Sell Stock
export const sellStock = async (req, res) => {
  try {

    const userId = req.user.id;
    const { symbol, quantity } = req.body;

    const result = await sellStockService(
      userId,
      symbol,
      quantity
    );

    res.status(200).json({
      success: true,
      ...result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};