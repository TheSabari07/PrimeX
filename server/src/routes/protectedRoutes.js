import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Hello, user ${req.user.username}` });
});

export default router;
