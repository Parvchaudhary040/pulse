export enum Priority {
  URGENT = "Urgent",
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low"
}
export enum TaskStatus {
  BACKLOG = "backlog",
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  skills?: string[];
  bio?: string;
  coverImage?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assigneeId: string;
  projectId: string;
  dueDate: string;
  labels: string[];
  project_id?: number | null;
  due_date?: string | null;
  createdAt: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: "active" | "planning" | "completed";
  user_id: number;
  created_at: string;
  // Optional UI-only fields
  color?: string;
  progress?: number;
}
export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  targetType: "task" | "project" | "comment" | "system";
  targetName: string;
  timestamp: string;
  details?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  type: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "alert" | "success";
  read: boolean;
  createdAt: string;
}
