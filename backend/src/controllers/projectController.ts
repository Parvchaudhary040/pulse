import { Request, Response } from "express";
import * as projectService from "../services/projectService";

export const createProject = async (
  req: Request,
  res: Response
) => {
  try {
    const project =
      await projectService.createProject(
        req.body
      );

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

export const getProjects = async (
  req: Request,
  res: Response
) => {
  try {
    const projects =
      await projectService.getProjects();

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

export const updateProject = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const project =
      await projectService.updateProject(
        id,
        req.body
      );

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
  console.error("UPDATE PROJECT ERROR:", error);

  res.status(500).json({
    success: false,
    message: "Failed to update project",
    error,
  });
}
};

export const deleteProject = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const project =
      await projectService.deleteProject(id);

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};