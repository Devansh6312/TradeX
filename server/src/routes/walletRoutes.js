import express from "express";
import {
  depositMoney,
  getWallet,
} from "../controllers/walletController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get Wallet
router.get("/", verifyToken, getWallet);

// Deposit Money
router.post("/deposit", verifyToken, depositMoney);

export default router;