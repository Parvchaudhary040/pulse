import { Router } from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import { allowRoles, protect } from "../middleware/authMiddleware";
const router = Router();
router.post("/", protect, allowRoles("Owner", "Admin", "Manager"), createProject);
router.get("/", protect, getProjects);
router.put("/:id", protect, allowRoles("Owner", "Admin", "Manager"), updateProject);
router.delete("/:id", protect, allowRoles("Owner", "Admin", "Manager"), deleteProject);
export default router;
