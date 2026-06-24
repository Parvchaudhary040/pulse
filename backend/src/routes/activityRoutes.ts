import { Router } from "express";

import {
  createActivity,
  getActivities,
} from "../controllers/activityController";

const router = Router();

router.post("/", createActivity);
router.get("/", getActivities);

export default router;