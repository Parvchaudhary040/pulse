import { pool } from "../database/db";

export const createNotification = async (
  notificationData: {
    title: string;
    message: string;
    type?: string;
  }
) => {
  const result = await pool.query(
    `
    INSERT INTO notifications
    (title, message, type)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [
      notificationData.title,
      notificationData.message,
      notificationData.type || "info",
    ]
  );

  return result.rows[0];
};

export const getNotifications = async () => {
  const result = await pool.query(`
    SELECT *
    FROM notifications
    ORDER BY created_at DESC
    LIMIT 20
  `);

  return result.rows;
};

export const markAsRead = async (id: number) => {
  const result = await pool.query(
    `
    UPDATE notifications
    SET is_read = TRUE
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};