import { pool } from "../database/db";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface ChangePasswordData {
  userId: number;
  currentPassword: string;
  newPassword: string;
}

// ==============================
// Register User
// ==============================

export const register = async (
  userData: Omit<User, "id">
) => {
  const existingUser = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [userData.email]
  );

  if (existingUser.rows.length > 0) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(
    userData.password,
    10
  );

  const newUser = await pool.query(
    `
    INSERT INTO users
    (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email
    `,
    [
      userData.name,
      userData.email,
      hashedPassword,
    ]
  );

  return {
    success: true,
    message: "User registered successfully",
    user: newUser.rows[0],
  };
};

// ==============================
// Login User
// ==============================

export const login = async (loginData: {
  email: string;
  password: string;
}) => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [loginData.email]
  );

  const user = result.rows[0];

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const isPasswordCorrect =
    await bcrypt.compare(
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

// ==============================
// Get Current User
// ==============================

export const getMe = async (
  userId: number
) => {

  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email
    FROM users
    WHERE id = $1
    `,
    [userId]
  );

  if (result.rows.length === 0) {
    return {
      success: false,
      message: "User not found",
    };
  }

  return {
    success: true,
    user: result.rows[0],
  };

};

// ==============================
// Change Password
// ==============================

export const changePassword = async ({
  userId,
  currentPassword,
  newPassword,
}: ChangePasswordData) => {

  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE id = $1
    `,
    [userId]
  );

  const user = result.rows[0];

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const isPasswordCorrect =
    await bcrypt.compare(
      currentPassword,
      user.password
    );

  if (!isPasswordCorrect) {
    return {
      success: false,
      message: "Current password is incorrect",
    };
  }

  if (newPassword.length < 8) {
    return {
      success: false,
      message:
        "Password must be at least 8 characters long",
    };
  }

  if (currentPassword === newPassword) {
    return {
      success: false,
      message:
        "New password must be different from the current password",
    };
  }

  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      10
    );

  await pool.query(
    `
    UPDATE users
    SET password = $1
    WHERE id = $2
    `,
    [
      hashedPassword,
      userId,
    ]
  );

  return {
    success: true,
    message:
      "Password updated successfully",
  };

};