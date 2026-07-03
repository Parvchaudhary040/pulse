import {
  TeamMember,
  Project,
} from "./types";
export const teamMembers: TeamMember[] = [
  {
    id: "user-1",
    name: "Current User",
    role: "AI Engineer",
    email: "current.user@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Current+User&background=4f46e5&color=ffffff",
  },
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
