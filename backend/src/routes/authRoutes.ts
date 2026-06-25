import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/authController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get Current Logged-in User
router.get("/me", protect, getCurrentUser);

export default router;