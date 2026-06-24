import { Request, Response } from "express";
import * as authService from "../services/authService";

// Register User
export const registerUser = async (req: Request, res: Response) => {
  const result = await authService.register(req.body);

  return res.status(201).json(result);
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  return res.status(200).json(result);
};

// Get Current User
export const getCurrentUser = (req: Request, res: Response) => {
  const result = authService.getMe();

  return res.status(200).json(result);
};