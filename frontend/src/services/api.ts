import axios from "axios";

const configuredApiUrl =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${configuredApiUrl.replace(/\/+$/, "").replace(/\/api$/, "")}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("pulse_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
