import { pool } from "../database/db";

export const createActivity = async (
  activityData: {
    user_id: number;
    action: string;
    target_type: string;
    target_name: string;
    details: string;
  }
) => {
  const result = await pool.query(
    `
    INSERT INTO activities
    (
      user_id,
      action,
      target_type,
      target_name,
      details
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [
      activityData.user_id,
      activityData.action,
      activityData.target_type,
      activityData.target_name,
      activityData.details,
    ]
  );

  return result.rows[0];
};

export const getActivities = async (
  userId: number
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM activities
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT 20
    `,
    [userId]
  );

  return result.rows;
};