import { Router } from "express";

import {
  registerUser,
  loginUser,
  loginDemoUser,
  getCurrentUser,
  changePassword,
  updateAvatar,
  updateName,
  deleteAccount,
  getUsers,
  updateUserRole,
} from "../controllers/authController";

import { allowRoles, protect } from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.post("/demo", loginDemoUser);

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

router.get("/users", protect, allowRoles("Owner", "Admin"), getUsers);
router.put("/users/:id/role", protect, allowRoles("Owner", "Admin"), updateUserRole);

export default router;
