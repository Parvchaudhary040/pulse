import { Request, Response } from "express";
import * as taskService from "../services/taskService";

export const createTask = async (
  req: Request,
  res: Response
) => {
  try {
    const task = await taskService.createTask({
      ...req.body,
      user_id: req.user!.id,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

export const getTasks = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("Logged in user ID:", req.user?.id);

    const tasks = await taskService.getTasks(req.user!.id);

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const task =
    await taskService.deleteTask(
      Number(req.params.id),
      req.user!.id
    );
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const task =
    await taskService.updateTask(
      Number(req.params.id),
      req.body,
      req.user!.id
    );

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};