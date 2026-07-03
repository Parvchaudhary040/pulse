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
export const getCurrentUser = async (
  req: Request,
  res: Response
) => {
  try {

    const result = await authService.getMe(
      req.user!.id
    );

    return res.status(200).json(result);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });

  }
};