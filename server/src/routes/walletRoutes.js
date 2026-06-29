import express from "express";

console.log("✅ Wallet routes loaded");

import { depositMoney } from "../controllers/walletController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/deposit", verifyToken, depositMoney);

export default router;