import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (taskData: any) => {
  const response = await axios.post(
    API_URL,
    taskData
  );

  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await axios.delete(
    `http://localhost:5000/api/tasks/${id}`
  );

  return response.data;
};

export const updateTask = async (
  id: number,
  taskData: any
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    taskData
  );

  return response.data;
};