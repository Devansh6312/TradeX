import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";

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

export default app;