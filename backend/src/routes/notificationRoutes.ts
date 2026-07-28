import { Router } from "express";

import {
  createNotification,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../controllers/notificationController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createNotification);
router.get("/", protect, getNotifications);
router.put("/read-all", protect, markAllNotificationsRead);
router.put("/:id/read", protect, markNotificationRead);

export default router;
