import axios from "axios";

const API_URL =
  "http://localhost:5000/api/projects";

export const getProjects = async () => {
  const response =
    await axios.get(API_URL);

  return response.data;
};

export const createProject = async (
  projectData: any
) => {
  const response =
    await axios.post(
      API_URL,
      projectData
    );

  return response.data;
};