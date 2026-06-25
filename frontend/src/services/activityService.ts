import api from "./api";

const API_URL =
  "http://localhost:5000/api/activities";

export const getActivities = async () => {
  const response = await api.get("/activities");

  return response.data;
};

export const createActivity = async (
  activityData: any
) => {
  await api.post("/tasks", taskData);

  return response.data;
};