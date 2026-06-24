interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Temporary in-memory database
const users: User[] = [];

// Register User
export const register = (userData: Omit<User, "id">) => {
  const existingUser = users.find(
    (user) => user.email === userData.email
  );

  if (existingUser) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  const newUser: User = {
    id: users.length + 1,
    ...userData,
  };

  users.push(newUser);

  return {
    success: true,
    message: "User registered successfully",
    user: newUser,
  };
};

// Login User
export const login = (loginData: {
  email: string;
  password: string;
}) => {
  const user = users.find(
    (u) =>
      u.email === loginData.email &&
      u.password === loginData.password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  return {
    success: true,
    message: "Login successful",
    user,
  };
};

// Get Current User
export const getMe = () => {
  return {
    success: true,
    user: users[0] || null,
  };
};