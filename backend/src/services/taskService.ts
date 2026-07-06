import { pool } from "../database/db";

interface TaskData {
  title: string;
  description: string;
  status?: string;
  priority?: string;

  project_id?: number | null;
  due_date?: string | null;

  user_id: number;
}

interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;

  project_id?: number | null;
  due_date?: string | null;
}

// =======================
// Create Task
// =======================
export const createTask = async (
  taskData: TaskData
) => {
  const result = await pool.query(
    `
    INSERT INTO tasks
    (
    title,
    description,
    status,
    priority,
    project_id,
    due_date,
    user_id
    )

    VALUES
    ($1,$2,$3,$4,$5,$6,$7)

    RETURNING *;
    `,
    [
    taskData.title,
    taskData.description,
    taskData.status ?? "todo",
    taskData.priority ?? "medium",

    taskData.project_id ?? null,
    taskData.due_date ?? null,

    taskData.user_id,
    ]
  );

  return result.rows[0];
};

// =======================
// Get Tasks
// =======================
export const getTasks = async (
  userId: number
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM tasks
    WHERE user_id = $1
    ORDER BY created_at DESC;
    `,
    [userId]
  );

  return result.rows;
};

// =======================
// Delete Task
// =======================
export const deleteTask = async (
  id: number,
  userId: number
) => {
  const result = await pool.query(
    `
    DELETE FROM tasks
    WHERE id = $1
      AND user_id = $2
    RETURNING *;
    `,
    [id, userId]
  );

  return result.rows[0];
};

// =======================
// Update Task
// =======================
export const updateTask = async (
  id: number,
  taskData: UpdateTaskData,
  userId: number
) => {
  const result = await pool.query(
    `
    UPDATE tasks
    SET

    title = COALESCE($1,title),

    description = COALESCE($2,description),

    status = COALESCE($3,status),

    priority = COALESCE($4,priority),

    project_id = COALESCE($5,project_id),

    due_date = COALESCE($6,due_date),

    updated_at = CURRENT_TIMESTAMP
    WHERE id = $7
      AND user_id = $8
    RETURNING *;
    `,
    [
    taskData.title ?? null,
    taskData.description ?? null,
    taskData.status ?? null,
    taskData.priority ?? null,

    taskData.project_id ?? null,
    taskData.due_date ?? null,

    id,
    userId,
    ]
  );

  return result.rows[0];
};