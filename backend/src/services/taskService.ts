import { pool } from "../database/db";

export const createTask = async (taskData: {
  title: string;
  description: string;
  status?: string;
  priority?: string;
  user_id: number;
}) => {
  const result = await pool.query(
    `
    INSERT INTO tasks
    (title, description, status, priority, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      taskData.title,
      taskData.description,
      taskData.status || "todo",
      taskData.priority || "medium",
      taskData.user_id,
    ]
  );

  return result.rows[0];
};

export const getTasks = async () => {
  const result = await pool.query(`
    SELECT *
    FROM tasks
    ORDER BY created_at DESC
  `);

  return result.rows;
};

export const deleteTask = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

export const updateTask = async (
  id: number,
  taskData: {
    title: string;
    description: string;
    status?: string;
    priority?: string;
  }
) => {
  const result = await pool.query(
    `
    UPDATE tasks
    SET
      title = $1,
      description = $2,
      status = $3,
      priority = $4
    WHERE id = $5
    RETURNING *
    `,
    [
      taskData.title,
      taskData.description,
      taskData.status || "todo",
      taskData.priority || "medium",
      id,
    ]
  );

  return result.rows[0];
};