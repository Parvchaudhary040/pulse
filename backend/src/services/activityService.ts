import { pool } from "../database/db";

export const createActivity = async (
  activityData: {
    user_name: string;
    action: string;
    target_type: string;
    target_name: string;
    details: string;
  }
) => {
  const result = await pool.query(
    `
    INSERT INTO activity_logs
    (
      user_name,
      action,
      target_type,
      target_name,
      details
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      activityData.user_name,
      activityData.action,
      activityData.target_type,
      activityData.target_name,
      activityData.details,
    ]
  );

  return result.rows[0];
};

export const getActivities = async () => {
  const result = await pool.query(`
    SELECT *
    FROM activity_logs
    ORDER BY created_at DESC
    LIMIT 20
  `);

  return result.rows;
};