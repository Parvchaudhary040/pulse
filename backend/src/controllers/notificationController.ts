import { Request, Response } from "express";
import * as notificationService from "../services/notificationService";

export const createNotification = async (
  req: Request,
  res: Response
) => {
  try {
    const notification =
      await notificationService.createNotification({
        ...req.body,
        user_id: req.user!.id,
      });

    res.status(201).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create notification",
    });
  }
};

export const getNotifications = async (
  req: Request,
  res: Response
) => {
  try {
    const notifications =
      await notificationService.getNotifications(req.user!.id);

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

export const markNotificationRead = async (
  req: Request,
  res: Response
) => {
  try {
    const notification =
      await notificationService.markAsRead(
        Number(req.params.id),
        req.user!.id
      );

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};

export const markAllNotificationsRead = async (
  _req: Request,
  res: Response
) => {
  try {
    const notifications = await notificationService.markAllAsRead(req.user!.id);

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update notifications",
    });
  }
};
