import { pool } from "../database/db";

export const createNotification = async (
  notificationData: {
    user_id: number;
    title: string;
    message: string;
    type?: string;
  }
) => {
  const result = await pool.query(
    `
    INSERT INTO notifications
    (user_id, title, message, type)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [
      notificationData.user_id,
      notificationData.title,
      notificationData.message,
      notificationData.type || "info",
    ]
  );

  return result.rows[0];
};

export const getNotifications = async (userId: number) => {
  const result = await pool.query(`
    SELECT *
    FROM notifications
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT 20
  `, [userId]);

  return result.rows;
};

export const markAsRead = async (id: number, userId: number) => {
  const result = await pool.query(
    `
    UPDATE notifications
    SET is_read = TRUE
    WHERE id = $1 AND user_id = $2
    RETURNING *
    `,
    [id, userId]
  );

  return result.rows[0];
};

export const markAllAsRead = async (userId: number) => {
  const result = await pool.query(`
    UPDATE notifications
    SET is_read = TRUE
    WHERE is_read = FALSE AND user_id = $1
    RETURNING *
  `, [userId]);

  return result.rows;
};
