import axios from "axios";

const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getGoogleOAuthUrl = () =>
  `${API.replace(/\/$/, "")}/oauth/google`;

export const getGithubOAuthUrl = () =>
  `${API.replace(/\/$/, "")}/oauth/github`;

// =====================
// Register
// =====================
export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API}/auth/register`, data);
  return response.data;
};

// =====================
// Login
// =====================
export const login = async (data: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API}/auth/login`, data);
  return response.data;
};

// =====================
// Current User
// =====================
export const getCurrentUser = async () => {
  const token = localStorage.getItem("pulse_token");

  const response = await axios.get(`${API}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =====================
// Change Password
// =====================
export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const token = localStorage.getItem("pulse_token");

  const response = await axios.put(
    `${API}/auth/change-password`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const authorizedHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("pulse_token")}`,
});

export const updateAvatar = async (avatar: string) => {
  const response = await axios.put(
    `${API}/auth/avatar`,
    { avatar },
    { headers: authorizedHeaders() }
  );

  return response.data;
};

export const updateName = async (name: string) => {
  const response = await axios.put(
    `${API}/auth/profile`,
    { name },
    { headers: authorizedHeaders() }
  );

  return response.data;
};

export const deleteAccount = async () => {
  const response = await axios.delete(`${API}/auth/account`, {
    headers: authorizedHeaders(),
  });

  return response.data;
};
export const __TEST__ = "Auth Service Loaded";
