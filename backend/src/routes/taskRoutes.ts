import { protect } from "../middleware/authMiddleware";
import { Router } from "express";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../controllers/taskController";

const router = Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);


export default router;