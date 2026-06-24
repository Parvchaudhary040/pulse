import api from "../api/api";

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/register", userData);

  return response.data;
};

export const login = async (loginData: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", loginData);

  return response.data;
};