import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../database/db";

export type Role = "Owner" | "Admin" | "Manager" | "Member" | "Viewer";

interface AuthRequest extends Request {
  user?: {
    id: number;
    role: Role;
  };
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: number };

    const userResult = await pool.query(
      "SELECT role FROM users WHERE id = $1",
      [decoded.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const storedRole = userResult.rows[0].role as Role;
    const role: Role = ["Owner", "Admin", "Manager", "Member", "Viewer"].includes(storedRole)
      ? storedRole
      : "Member";

    req.user = {
      id: decoded.id,
      role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const allowRoles = (...roles: Role[]) => (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "You do not have permission for this action." });
  }

  next();
};

export const canManageTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role === "Viewer") {
    return res.status(403).json({ success: false, message: "You do not have permission for this action." });
  }

  if (["Owner", "Admin", "Manager"].includes(req.user.role)) {
    return next();
  }

  const taskResult = await pool.query(
    "SELECT user_id FROM tasks WHERE id = $1",
    [Number(req.params.id)]
  );

  if (taskResult.rows[0]?.user_id !== req.user.id) {
    return res.status(403).json({ success: false, message: "Members can only change their own tasks." });
  }

  next();
};
