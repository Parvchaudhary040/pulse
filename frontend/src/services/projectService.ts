import api from "./api";

const API_URL =
  "http://localhost:5000/api/projects";

export const getProjects = async () => {
  const response = await api.get("/projects");

  return response.data;
};

export const createProject = async (
  projectData: any
) => {
  await api.post("/tasks", taskData);

  return response.data;
};