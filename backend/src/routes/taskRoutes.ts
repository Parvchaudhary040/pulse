import { allowRoles, canManageTask, protect } from "../middleware/authMiddleware";
import { Router } from "express";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../controllers/taskController";

const router = Router();

router.post("/", protect, allowRoles("Owner", "Admin", "Manager", "Member"), createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, canManageTask, updateTask);
router.delete("/:id", protect, canManageTask, deleteTask);


export default router;
