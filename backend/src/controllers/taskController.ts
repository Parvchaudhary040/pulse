import { Request, Response } from "express";
import * as taskService from "../services/taskService";
import * as activityService from "../services/activityService";
export const createTask = async (
  req: Request,
  res: Response
) => {
  try {
    const task = await taskService.createTask({
  ...req.body,
  user_id: req.user!.id,
});

await activityService.createActivity({
  user_id: req.user!.id,
  action: "Created Task",
  target_type: "Task",
  target_name: task.title,
  details: `Created task "${task.title}"`,
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
    const tasks = await taskService.getTasks(
      req.user!.id
    );

    res.status(200).json({
      success: true,
      tasks,
    });

  } catch (error) {
    console.error("GET TASKS ERROR:", error);

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
    if (task) {
  await activityService.createActivity({
    user_id: req.user!.id,
    action: "Deleted Task",
    target_type: "Task",
    target_name: task.title,
    details: `Deleted task "${task.title}"`,
  });
}
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
    const task = await taskService.updateTask(
      Number(req.params.id),
      req.body,
      req.user!.id
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });

  } catch (error) {

    console.error("UPDATE TASK ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: error instanceof Error ? error.message : error,
    });

  }
};