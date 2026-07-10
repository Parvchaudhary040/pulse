import { Task, Project, ActivityLog } from "../types";

interface ContextData {
  userName: string;
  tasks: Task[];
  projects: Project[];
  activities: ActivityLog[];
  dashboard: any;
}

export function useWorkspaceContext({
  userName,
  tasks,
  projects,
  activities,
  dashboard,
}: ContextData) {

  return {

    user: userName,

    dashboard,

    projects: projects.map(project => ({
      id: project.id,
      name: project.name,
      progress: project.progress,
      completed_tasks: project.completed_tasks,
      total_tasks: project.total_tasks,
      status: project.status,
    })),

    tasks: tasks.map(task => ({
      title: task.title,
      status: task.status,
      priority: task.priority,
      due_date: task.due_date,
      project_id: task.project_id,
    })),

    recentActivity: activities.slice(0,10)

  };

}