import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Temporary in-memory database
const users: User[] = [];

// Register User
export const register = async (userData: Omit<User, "id">) => {
  const existingUser = users.find(
    (user) => user.email === userData.email
  );

  if (existingUser) {
    return {
      success: false,
      message: "User already exists",
    };
  }

const hashedPassword = await bcrypt.hash(userData.password, 10);

const newUser: User = {
  id: users.length + 1,
  ...userData,
  password: hashedPassword,
};

  users.push(newUser);

  return {
  success: true,
  message: "User registered successfully",
  user: {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  },
};
};

// Login User
export const login = async (loginData: {
  email: string;
  password: string;
}) => {
  const user = users.find(
  (u) => u.email === loginData.email
);

if (!user) {
  return {
    success: false,
    message: "Invalid email or password",
  };
}

const isPasswordCorrect = await bcrypt.compare(
  loginData.password,
  user.password
);

if (!isPasswordCorrect) {
  return {
    success: false,
    message: "Invalid email or password",
  };
}
const token = generateToken(user.id);
return {
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

// Get Current User
export const getMe = () => {
  return {
    success: true,
    user: users[0] || null,
  };
};