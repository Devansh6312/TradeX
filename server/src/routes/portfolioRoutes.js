import express from "express";
import { getPortfolio } from "../controllers/portfolioController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getPortfolio);

export default router;