import { useState } from "react";
import * as taskService from "../services/taskService";
import { Task } from "../types";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const response = await taskService.getTasks();
      setTasks(response.tasks || []);
    } catch (error) {
      console.error("Failed to load tasks", error);
      setTasks([]);
    }
  };

  return {
    tasks,
    setTasks,
    loadTasks,
  };
};