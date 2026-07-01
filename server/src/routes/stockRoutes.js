import express from "express";
import {
  getAllStocks,
  buyStock,
  sellStock,
} from "../controllers/stockController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Route
router.get("/", getAllStocks);

// Protected Routes
router.post("/buy", verifyToken, buyStock);
router.post("/sell", verifyToken, sellStock);

export default router;