import { Router } from "express";
import { chat } from "../controllers/aiController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/chat",
  protect,
  chat
);

export default router;