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