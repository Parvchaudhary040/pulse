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

const roles = ["Owner", "Admin", "Manager", "Member", "Viewer"] as const;
type Role = (typeof roles)[number];

const normalizeRole = (role: unknown): Role =>
  typeof role === "string" && roles.includes(role as Role)
    ? (role as Role)
    : "Member";

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
    (name, email, password, role)
    VALUES ($1, $2, $3, 'Member')
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
  const role = normalizeRole(user.role);

  return {
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role,
      avatar: user.avatar,
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
      email,
      role,
      avatar
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
    user: {
      ...result.rows[0],
      role: normalizeRole(result.rows[0].role),
    },
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

export const updateAvatar = async (userId: number, avatar: string) => {
  const result = await pool.query(
    `
    UPDATE users
    SET avatar = $1
    WHERE id = $2
    RETURNING id, name, email, role, avatar
    `,
    [avatar, userId]
  );

  if (result.rows.length === 0) {
    return { success: false, message: "User not found" };
  }

  return { success: true, user: result.rows[0] };
};

export const updateName = async (userId: number, name: string) => {
  const result = await pool.query(
    `
    UPDATE users
    SET name = $1
    WHERE id = $2
    RETURNING id, name, email, role, avatar
    `,
    [name, userId]
  );

  if (result.rows.length === 0) {
    return { success: false, message: "User not found" };
  }

  return { success: true, user: result.rows[0] };
};

export const deleteAccount = async (userId: number) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM projects WHERE user_id = $1", [userId]);
    const result = await client.query("DELETE FROM users WHERE id = $1", [userId]);

    if (result.rowCount === 0) {
      await client.query("ROLLBACK");
      return { success: false, message: "User not found" };
    }

    await client.query("COMMIT");
    return { success: true };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getUsers = async () => {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      CASE
        WHEN role IN ('Owner', 'Admin', 'Manager', 'Member', 'Viewer') THEN role
        ELSE 'Member'
      END AS role,
      avatar,
      created_at
    FROM users
    ORDER BY created_at ASC
    `
  );

  return result.rows;
};

export const updateUserRole = async (
  currentUserId: number,
  currentUserRole: string,
  targetUserId: number,
  newRole: string
) => {
  // Prevent changing your own role
  if (currentUserId === targetUserId) {
    return {
      success: false,
      message: "You cannot change your own role.",
    };
  }

  // Get the target user's current role
  const existingUser = await pool.query(
    `
    SELECT id, role
    FROM users
    WHERE id = $1
    `,
    [targetUserId]
  );

  if (existingUser.rows.length === 0) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const targetRole = existingUser.rows[0].role;

  // Admin cannot modify Owner
  if (
    currentUserRole === "Admin" &&
    targetRole === "Owner"
  ) {
    return {
      success: false,
      message: "Admins cannot modify the Owner.",
    };
  }
  
  // Admin cannot promote anyone to Owner
  if (
    currentUserRole === "Admin" &&
    newRole === "Owner"
  ) {
    return {
      success: false,
      message: "Only the Owner can assign the Owner role.",
    };
  }
  // Nobody can change the Owner's role
  if (targetRole === "Owner") {
    return {
      success: false,
      message: "Owner role cannot be modified.",
    };
  }

  const result = await pool.query(
    `
    UPDATE users
    SET role = $1
    WHERE id = $2
    RETURNING id, name, email, role, avatar, created_at
    `,
    [newRole, targetUserId]
  );

  return {
    success: true,
    message: "Role updated successfully.",
    user: result.rows[0],
  };
};
