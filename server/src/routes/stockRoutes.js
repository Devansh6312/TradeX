import express from "express";
import {
  getAllStocks,
  buyStock,
} from "../controllers/stockController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllStocks);

router.post("/buy", verifyToken, buyStock);

export default router;