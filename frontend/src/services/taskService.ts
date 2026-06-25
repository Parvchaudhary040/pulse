import api from "./api";

const API_URL = "http://localhost:5000/api/tasks";

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const createTask = async (taskData: any) => {
  await api.post("/tasks", taskData);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await api.delete(`/tasks/${id}`);

  return response.data;
};

export const updateTask = async (
  id: number,
  taskData: any
) => {
  await api.put(`/tasks/${id}`, taskData);

  return response.data;
};