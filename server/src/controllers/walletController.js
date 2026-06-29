import { depositService } from "../services/walletService.js";

export const depositMoney = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;

    const wallet = await depositService(userId, amount);

    res.status(200).json({
      success: true,
      message: "Money deposited successfully",
      wallet,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};