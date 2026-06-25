import { Router } from "express";

import {
  createNotification,
  getNotifications,
  markNotificationRead,
} from "../controllers/notificationController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createNotification);
router.get("/", protect, getNotifications);
router.put("/:id/read", protect, markNotificationRead);

export default router;