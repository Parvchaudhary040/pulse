import api from "./api";

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const createTask = async (taskData: any) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
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

  return response.data;
};