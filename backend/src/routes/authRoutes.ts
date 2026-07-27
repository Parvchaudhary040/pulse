import { Router } from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  changePassword,
  updateAvatar,
  updateName,
  deleteAccount,
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

router.put("/avatar", protect, updateAvatar);

router.put("/profile", protect, updateName);

router.delete("/account", protect, deleteAccount);

export default router;
