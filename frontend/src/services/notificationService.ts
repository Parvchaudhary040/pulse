import { toast } from "react-toastify";
import { Notification } from "../types";
import api from "./api";

type ApiNotification = {
  id: number;
  title: string;
  message: string;
  type: Notification["type"];
  is_read: boolean;
  created_at: string;
};

const toNotification = (notification: ApiNotification): Notification => ({
  id: String(notification.id),
  title: notification.title,
  message: notification.message,
  type: notification.type,
  read: notification.is_read,
  createdAt: new Date(notification.created_at).toLocaleString(),
});

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await api.get("/notifications");

  return (response.data.notifications as ApiNotification[]).map(toNotification);
};

export const markNotificationRead = async (id: string) => {
  const response = await api.put(`/notifications/${id}/read`);

  return toNotification(response.data.notification as ApiNotification);
};

export const markAllNotificationsRead = async () => {
  await api.put("/notifications/read-all");
};

export const notifySuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2500,
    theme: "dark",
  });
};

export const notifyError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });
};

export const notifyInfo = (message: string) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 2500,
    theme: "dark",
  });
};
