import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 TradeX Backend Running");
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Wallet Routes
app.use("/api/wallet", walletRoutes);

// Stock Routes
app.use("/api/stocks", stockRoutes);

// Portfolio Routes
app.use("/api/portfolio", portfolioRoutes);

app.use("/api/transactions", transactionRoutes);


export default app;