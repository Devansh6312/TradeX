import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
});

export default router;