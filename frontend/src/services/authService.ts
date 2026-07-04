import api from "../api/api";

// ==============================
// Register
// ==============================

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

// ==============================
// Login
// ==============================

export const login = async (loginData: {
  email: string;
  password: string;
}) => {
  const response = await api.post(
    "/auth/login",
    loginData
  );

  return response.data;
};

// ==============================
// Current User
// ==============================

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

// ==============================
// Change Password
// ==============================

export const changePassword = async (passwordData: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.put(
    "/auth/change-password",
    passwordData
  );

  return response.data;
};

// ==============================
// Logout
// ==============================

export const logout = () => {
  localStorage.removeItem("pulse_token");
  localStorage.removeItem("pulse_user");
};