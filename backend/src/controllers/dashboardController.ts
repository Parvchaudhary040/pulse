import { Request, Response } from "express";
import * as dashboardService from "../services/dashboardService";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const stats =
      await dashboardService.getDashboardStats(
        req.user!.id
      );

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch dashboard stats",
    });
  }
};