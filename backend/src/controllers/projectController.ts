import { Request, Response } from "express";
import * as projectService from "../services/projectService";
import * as activityService from "../services/activityService";

export const createProject = async (
  req: Request,
  res: Response
) => {
  try {
    const project =
      await projectService.createProject({
        ...req.body,
        user_id: req.user!.id,
      });

    await activityService.createActivity({
      user_id: req.user!.id,
      action: "Created Project",
      target_type: "Project",
      target_name: project.name,
      details: `Created project "${project.name}"`,
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

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
      await projectService.getProjects(
        req.user!.id
      );

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(error);

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
    const project =
      await projectService.updateProject(
        Number(req.params.id),
        req.body,
        req.user!.id
      );

    if (project) {
      await activityService.createActivity({
        user_id: req.user!.id,
        action: "Updated Project",
        target_type: "Project",
        target_name: project.name,
        details: `Updated project "${project.name}"`,
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

export const deleteProject = async (
  req: Request,
  res: Response
) => {
  try {
    const project =
      await projectService.deleteProject(
        Number(req.params.id),
        req.user!.id
      );

    if (project) {
      await activityService.createActivity({
        user_id: req.user!.id,
        action: "Deleted Project",
        target_type: "Project",
        target_name: project.name,
        details: `Deleted project "${project.name}"`,
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};