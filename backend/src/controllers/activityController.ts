import { Request, Response } from "express";
import * as activityService from "../services/activityService";

export const createActivity = async (
  req: Request,
  res: Response
) => {
  try {
    const activity =
      await activityService.createActivity({
        ...req.body,
        user_id: req.user!.id,
      });

    res.status(201).json({
      success: true,
      activity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create activity",
    });
  }
};

export const getActivities = async (
  req: Request,
  res: Response
) => {
  try {
    const activities =
      await activityService.getActivities(
        req.user!.id
      );

    res.status(200).json({
      success: true,
      activities,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
    });
  }
};