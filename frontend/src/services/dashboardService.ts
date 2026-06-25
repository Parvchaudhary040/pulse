import api from "./api";

const API_URL =
  "http://localhost:5000/api/dashboard";

export const getStats = async () => {
  const response = await api.get("/dashboard/stats");

  return response.data;
};