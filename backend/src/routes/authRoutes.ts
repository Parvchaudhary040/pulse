import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/authController";

const router = Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get Logged In User
router.get("/me", getCurrentUser);

export default router;