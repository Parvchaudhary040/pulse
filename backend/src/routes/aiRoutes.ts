import { Router } from "express";
import {
  chat,
  analyzeWorkspace,
} from "../controllers/aiController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/chat", protect, chat);

router.post("/workspace", protect, analyzeWorkspace);

export default router;