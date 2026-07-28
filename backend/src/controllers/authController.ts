import { Request, Response } from "express";
import * as authService from "../services/authService";

interface AuthRequest extends Request {
  user?: {
    id: number;
  };
}

// ==============================
// Register
// ==============================

export const registerUser = async (
  req: Request,
  res: Response
) => {

  const result = await authService.register(
    req.body
  );

  if (!result.success) {
    return res.status(400).json(result);
  }

  return res.status(201).json(result);

};

// ==============================
// Login
// ==============================

export const loginUser = async (
  req: Request,
  res: Response
) => {

  const result = await authService.login(
    req.body
  );

  if (!result.success) {
    return res.status(401).json(result);
  }

  return res.status(200).json(result);

};

// ==============================
// Current User
// ==============================

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response
) => {

  const result = await authService.getMe(
    req.user!.id
  );

  if (!result.success) {
    return res.status(404).json(result);
  }

  return res.status(200).json(result);

};

// ==============================
// Change Password
// ==============================

export const changePassword = async (
  req: AuthRequest,
  res: Response
) => {

  const result =
    await authService.changePassword({

      userId: req.user!.id,

      currentPassword:
        req.body.currentPassword,

      newPassword:
        req.body.newPassword,

    });

  if (!result.success) {
    return res.status(400).json(result);
  }

  return res.status(200).json(result);

};

export const updateAvatar = async (req: AuthRequest, res: Response) => {
  const { avatar } = req.body;

  if (typeof avatar !== "string" || !avatar.startsWith("data:image/")) {
    return res.status(400).json({
      success: false,
      message: "Please upload a valid image file.",
    });
  }

  const result = await authService.updateAvatar(req.user!.id, avatar);
  return res.status(result.success ? 200 : 404).json(result);
};

export const updateName = async (req: AuthRequest, res: Response) => {
  const { name } = req.body;
  const trimmedName = typeof name === "string" ? name.trim() : "";

  if (!trimmedName || trimmedName.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Name must be between 1 and 100 characters.",
    });
  }

  const result = await authService.updateName(req.user!.id, trimmedName);
  return res.status(result.success ? 200 : 404).json(result);
};

export const deleteAccount = async (req: AuthRequest, res: Response) => {
  const result = await authService.deleteAccount(req.user!.id);
  return res.status(result.success ? 200 : 404).json(result);
};

const validRoles = ["Owner", "Admin", "Manager", "Member", "Viewer"];

export const getUsers = async (_req: Request, res: Response) => {
  const users = await authService.getUsers();
  return res.status(200).json({ success: true, users });
};

import { Request, Response } from "express";

// keep your other imports...

export const updateUserRole = async (req: Request, res: Response) => {
  const { role } = req.body;
  const targetUserId = Number(req.params.id);

  if (!validRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Select a valid role.",
    });
  }

  // authenticated user from protect middleware
  const currentUser = (req as Request & {
    user?: { id: number; role: string };
  }).user;

  if (!currentUser) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const result = await authService.updateUserRole(
    currentUser.id,
    currentUser.role,
    targetUserId,
    role
  );

  return res.status(result.success ? 200 : 400).json(result);
};
