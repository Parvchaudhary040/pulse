import { pool } from "../database/db";

export const createProject = async (
  projectData: {
    name: string;
    description: string;
  }
) => {
  const result = await pool.query(
    `
    INSERT INTO projects
    (name, description)
    VALUES ($1, $2)
    RETURNING *
    `,
    [
      projectData.name,
      projectData.description,
    ]
  );

  return result.rows[0];
};

export const getProjects = async () => {
  const result = await pool.query(`
    SELECT *
    FROM projects
    ORDER BY created_at DESC
  `);

  return result.rows;
};

export const updateProject = async (
  id: number,
  projectData: {
    name: string;
    description: string;
    status?: string;
  }
) => {
  const result = await pool.query(
    `
    UPDATE projects
    SET
      name = $1,
      description = $2,
      status = $3
    WHERE id = $4
    RETURNING *
    `,
    [
      projectData.name,
      projectData.description,
      projectData.status || "active",
      id,
    ]
  );

  return result.rows[0];
};

export const deleteProject = async (
  id: number
) => {
  const result = await pool.query(
    `
    DELETE FROM projects
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};