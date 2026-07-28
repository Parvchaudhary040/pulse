import api from "./api";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Manager" | "Member" | "Viewer";
  avatar?: string;
  created_at?: string;
}

class UserService {
  async getUsers(): Promise<User[]> {
    const response = await api.get("/auth/users");

    return response.data.users;
  }

  async updateRole(userId: number, role: User["role"]) {
    const response = await api.put(`/auth/users/${userId}/role`, {
      role,
    });

    return response.data;
  }
}

export default new UserService();