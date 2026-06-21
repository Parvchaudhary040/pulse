export enum Priority {
  URGENT = "Urgent",
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low"
}

export enum TaskStatus {
  BACKLOG = "Backlog",
  TODO = "Todo",
  IN_PROGRESS = "In Progress",
  DONE = "Done"
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
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "planning" | "completed";
  progress: number; // 0 to 100
  dueDate: string;
  teamIds: string[];
  category: string;
  color: string;
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
