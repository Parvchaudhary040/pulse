import { Router } from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController";

const router = Router();

router.post("/", createProject);
router.get("/", getProjects);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;