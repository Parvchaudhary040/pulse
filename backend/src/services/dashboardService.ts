import { pool } from "../database/db";

export const getDashboardStats = async () => {
  const totalTasksResult = await pool.query(`
    SELECT COUNT(*) AS count
    FROM tasks
  `);

  const completedTasksResult = await pool.query(`
    SELECT COUNT(*) AS count
    FROM tasks
    WHERE status = 'done'
  `);

  const activeProjectsResult = await pool.query(`
    SELECT COUNT(*) AS count
    FROM projects
    WHERE status = 'active'
  `);

  const totalTasks = Number(
    totalTasksResult.rows[0].count
  );

  const completedTasks = Number(
    completedTasksResult.rows[0].count
  );

  const activeProjects = Number(
    activeProjectsResult.rows[0].count
  );

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return {
    totalTasks,
    completedTasks,
    activeProjects,
    completionRate,
  };
};