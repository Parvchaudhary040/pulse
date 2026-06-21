import { Priority, TaskStatus, User, TeamMember, Task, Project, ActivityLog, ProjectFile, Notification } from "./types";

export const currentUser: User = {
  id: "user-1",
  name: "Alex Rivera",
  email: "alex.rivera@pulse.io",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
  role: "Lead Product Manager",
  bio: "Lead Product Manager focused on crafting high-impact tools for modern builders. Previously lead PM at Stripe & Notion. Passionate about developer workflows, modular design systems, and fast software.",
  skills: ["Product Strategy", "Figma", "React/TypeScript", "Agile Roadmap", "Data Analytics"],
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200&h=400"
};

export const teamMembers: TeamMember[] = [
  {
    id: "user-1",
    name: "Alex Rivera",
    role: "Lead Product Manager",
    email: "alex.rivera@pulse.io",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"
  },
  {
    id: "user-2",
    name: "Sarah Chen",
    role: "Lead Systems Engineer",
    email: "sarah.chen@pulse.io",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256&h=256"
  },
  {
    id: "user-3",
    name: "James Wilson",
    role: "Senior UI/UX Designer",
    email: "james.wilson@pulse.io",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256&h=256"
  },
  {
    id: "user-4",
    name: "Elena Rostova",
    role: "Lead Quality Engineer",
    email: "elena.rostova@pulse.io",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256&h=256"
  },
  {
    id: "user-5",
    name: "Marcus Vance",
    role: "Platform Engineer",
    email: "marcus.vance@pulse.io",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256"
  }
];

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Mobile App Revamp",
    description: "Re-engineering our core iOS & Android application to improve workspace load parameters and gesture navigation rules.",
    status: "active",
    progress: 65,
    dueDate: "2026-07-15",
    teamIds: ["user-1", "user-2", "user-3", "user-4"],
    category: "Mobile App",
    color: "#6366f1" // indigo
  },
  {
    id: "proj-2",
    name: "Web Platform Redesign",
    description: "Converting legacy React modules to Vite/Tailwind stack and building standard serverless content routes.",
    status: "active",
    progress: 88,
    dueDate: "2026-06-30",
    teamIds: ["user-2", "user-4", "user-5"],
    category: "Web Frontend",
    color: "#10b981" // emerald
  },
  {
    id: "proj-3",
    name: "Brand & Visual Identity",
    description: "Refreshing global styling assets, creating 3D vector illustration elements, and generating core landing page copies.",
    status: "planning",
    progress: 25,
    dueDate: "2026-08-01",
    teamIds: ["user-1", "user-3"],
    category: "Marketing",
    color: "#f59e0b" // amber
  }
];

export const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Design core navigation layout assets",
    description: "Create premium, responsive navigation sidebar mocks in Dark/Light themes supporting collapsible modules.",
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.HIGH,
    assigneeId: "user-3", // James
    projectId: "proj-1",
    dueDate: "2026-06-25",
    labels: ["Design", "UI"],
    createdAt: "2026-06-15"
  },
  {
    id: "task-2",
    title: "Implement Auth Token proxy flow",
    description: "Establish safe server-side token handlers to ensure secrets like client signatures remain hidden from browser client logs.",
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.URGENT,
    assigneeId: "user-2", // Sarah
    projectId: "proj-1",
    dueDate: "2026-06-23",
    labels: ["Security", "Backend"],
    createdAt: "2026-06-16"
  },
  {
    id: "task-3",
    title: "Configure unit tests for gesture handlers",
    description: "Write automated tests validating swift horizontal swipe card layouts which triggers fast navigation swaps.",
    status: TaskStatus.TODO,
    priority: Priority.MEDIUM,
    assigneeId: "user-4", // Elena
    projectId: "proj-1",
    dueDate: "2026-06-28",
    labels: ["Testing", "Mobile"],
    createdAt: "2026-06-18"
  },
  {
    id: "task-4",
    title: "Launch marketing landing copies check",
    description: "Perform copy alignment audits on core feature rows. Coordinate messaging rules directly with design partners.",
    status: TaskStatus.BACKLOG,
    priority: Priority.LOW,
    assigneeId: "user-1", // Alex
    projectId: "proj-1",
    dueDate: "2026-07-05",
    labels: ["Copywriting", "Marketing"],
    createdAt: "2026-06-19"
  },
  {
    id: "task-5",
    title: "Address feedback on profile setting buttons",
    description: "Review button alignment settings. Ensure toggle actions trigger micro-animations with 150ms spring transitions.",
    status: TaskStatus.DONE,
    priority: Priority.LOW,
    assigneeId: "user-3", // James
    projectId: "proj-1",
    dueDate: "2026-06-20",
    labels: ["Feedback", "UI-Tweaks"],
    createdAt: "2026-06-12"
  },
  {
    id: "task-6",
    title: "Establish real-time sync listeners",
    description: "Configure local storage caching strategies coupled with React state layers to provide seamless offline views.",
    status: TaskStatus.TODO,
    priority: Priority.HIGH,
    assigneeId: "user-2", // Sarah
    projectId: "proj-1",
    dueDate: "2026-06-26",
    labels: ["State", "Sync"],
    createdAt: "2026-06-14"
  }
];

export const initialActivityLogs: ActivityLog[] = [
  {
    id: "log-1",
    userId: "user-1",
    userName: "Alex Rivera",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
    action: "updated state of",
    targetType: "task",
    targetName: "Address feedback on profile setting buttons",
    timestamp: "10 minutes ago",
    details: "Marked task as Done based on feedback thread from Design channel."
  },
  {
    id: "log-2",
    userId: "user-2",
    userName: "Sarah Chen",
    userAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256&h=256",
    action: "commented on",
    targetType: "task",
    targetName: "Implement Auth Token proxy flow",
    timestamp: "2 hours ago",
    details: "Proxy server endpoints are set up in sandbox. Needs review for SSL header parsing."
  },
  {
    id: "log-3",
    userId: "user-3",
    userName: "James Wilson",
    userAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256&h=256",
    action: "attached design file to",
    targetType: "project",
    targetName: "Mobile App Revamp",
    timestamp: "Yesterday",
    details: "Uploaded 'Navigation_Sidebar_v2_LightDark.fig' directly to workspace assets."
  },
  {
    id: "log-4",
    userId: "user-4",
    userName: "Elena Rostova",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256&h=256",
    action: "created task in",
    targetType: "project",
    targetName: "Mobile App Revamp",
    timestamp: "3 days ago",
    details: "Created task: 'Configure unit tests for gesture handlers'. Assigned to Elena."
  }
];

export const initialProjectFiles: ProjectFile[] = [
  {
    id: "file-1",
    name: "Mobile_App_v2.0_Spec.xlsx",
    size: "2.4 MB",
    uploadedBy: "Alex Rivera",
    uploadedAt: "June 18, 2026",
    type: "spreadsheet"
  },
  {
    id: "file-2",
    name: "Navigation_Sidebar_v2_LightDark.fig",
    size: "42.8 MB",
    uploadedBy: "James Wilson",
    uploadedAt: "June 20, 2026",
    type: "design"
  },
  {
    id: "file-3",
    name: "API_Endpoints_Signature.json",
    size: "41.5 KB",
    uploadedBy: "Sarah Chen",
    uploadedAt: "June 21, 2026",
    type: "code"
  },
  {
    id: "file-4",
    name: "AppIcon_Release_Exports.zip",
    size: "18.5 MB",
    uploadedBy: "James Wilson",
    uploadedAt: "June 19, 2026",
    type: "archive"
  }
];

export const initialMockNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "New feedback on gesture spec",
    message: "Elena tagged you in a specification review thread regarding vertical swipe actions.",
    type: "info",
    read: false,
    createdAt: "5m ago"
  },
  {
    id: "notif-2",
    title: "Build Succeeded (Sandbox)",
    message: "Integration tests passed successfully on commit e1a24bf.",
    type: "success",
    read: false,
    createdAt: "1h ago"
  },
  {
    id: "notif-3",
    title: "Upcoming Project Milestone",
    message: "'Mobile App Revamp' beta launch is scheduled in 2 days.",
    type: "alert",
    read: true,
    createdAt: "1d ago"
  }
];
