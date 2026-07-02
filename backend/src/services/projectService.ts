import { pool } from "../database/db";

export const createProject = async (
  projectData: {
    name: string;
    description: string;
    status?: string;
    user_id: number;
  }
) => {
  const result = await pool.query(
    `
    INSERT INTO projects
    (name, description, status, user_id)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      projectData.name,
      projectData.description,
      projectData.status || "active",
      projectData.user_id,
    ]
  );

  return result.rows[0];
};

export const getProjects = async (
  userId: number
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM projects
    WHERE user_id=$1
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

export const updateProject = async (
  id: number,
  projectData: {
    name: string;
    description: string;
    status?: string;
  },
  userId: number
) => {
  const result = await pool.query(
    `
    UPDATE projects
    SET
      name=$1,
      description=$2,
      status=$3
    WHERE id=$4
    AND user_id=$5
    RETURNING *
    `,
    [
      projectData.name,
      projectData.description,
      projectData.status || "active",
      id,
      userId,
    ]
  );

  return result.rows[0];
};

export const deleteProject = async (
  id: number,
  userId: number
) => {
  const result = await pool.query(
    `
    DELETE FROM projects
    WHERE id=$1
    AND user_id=$2
    RETURNING *
    `,
    [
      id,
      userId,
    ]
  );

  return result.rows[0];
};