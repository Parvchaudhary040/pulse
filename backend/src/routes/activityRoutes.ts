import { Router } from "express";

import {
  createActivity,
  getActivities,
} from "../controllers/activityController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createActivity);
router.get("/", protect, getActivities);

export default router;