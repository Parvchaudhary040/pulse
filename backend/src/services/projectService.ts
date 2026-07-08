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
    SELECT
        p.*,

        COUNT(t.id) AS total_tasks,

        COUNT(
            CASE
                WHEN t.status='done'
                THEN 1
            END
        ) AS completed_tasks

    FROM projects p

    LEFT JOIN tasks t
    ON p.id=t.project_id

    WHERE p.user_id=$1

    GROUP BY p.id

    ORDER BY p.created_at DESC;
    `,
    [userId]
  );

  return result.rows.map(project => ({

    ...project,

    total_tasks: Number(project.total_tasks),

    completed_tasks: Number(project.completed_tasks),

    progress:
      project.total_tasks == 0
        ? 0
        : Math.round(
            project.completed_tasks *
            100 /
            project.total_tasks
          )

  }));
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