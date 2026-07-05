import { Router } from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  changePassword,
} from "../controllers/authController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.get(
  "/me",
  protect,
  getCurrentUser
);

router.put(
  "/change-password",
  protect,
  changePassword
);

export default router;