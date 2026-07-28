import api from "./api";
import { Priority, Task, TaskStatus } from "../types";

type ApiTask = {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: string;
  project_id: number | null;
  due_date: string | null;
  user_id: number;
  created_at: string;
};

const toTask = (task: ApiTask): Task => ({
  id: String(task.id),
  title: task.title,
  description: task.description ?? "",
  status: task.status,
  priority: (task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()) as Priority,
  assigneeId: String(task.user_id),
  projectId: task.project_id === null ? "" : String(task.project_id),
  dueDate: task.due_date ?? "",
  labels: [],
  project_id: task.project_id,
  due_date: task.due_date,
  createdAt: task.created_at,
});

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return {
    ...response.data,
    tasks: (response.data.tasks as ApiTask[]).map(toTask),
  };
};

export const createTask = async (taskData: any) => {
  const response = await api.post("/tasks", taskData);
  return {
    ...response.data,
    task: toTask(response.data.task as ApiTask),
  };
};

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const updateTask = async (
  id: number,
  taskData: any
) => {
  const response = await api.put(
    `/tasks/${id}`,
    taskData
  );

  return {
    ...response.data,
    task: toTask(response.data.task as ApiTask),
  };
};
