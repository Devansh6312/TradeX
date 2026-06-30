import {
  depositService,
  getWalletService,
} from "../services/walletService.js";

// Deposit Money
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

// Get Wallet
export const getWallet = async (req, res) => {
  try {
    const wallet = await getWalletService(req.user.id);

    res.status(200).json({
      success: true,
      wallet,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};