import { getTransactionsService } from "../services/transactionService.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await getTransactionsService(req.user.id);

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};