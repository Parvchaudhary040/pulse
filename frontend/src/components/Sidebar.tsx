import React from "react";
import {
  LayoutDashboard,
  Kanban,
  Activity,
  User,
  Settings,
  Smartphone,
  LogOut,
  FolderOpen,
  MoreVertical,
} from "lucide-react";

import { Project } from "../types";
import { PulseIcon } from "./PulseLogo";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;

  projects: Project[];

  selectedProjectId: number | null;
  onSelectProject: (id: number | null) => void;

  activeTasksCount: number;
  onLogout: () => void;

  onLogout: () => void;
  onOpenProjectModal: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

export default function Sidebar({
  currentTab,
  setCurrentTab,

  projects,

  selectedProjectId,
  onSelectProject,

  activeTasksCount,
  onLogout,

  onOpenProjectModal,

  onEditProject,

  onDeleteProject,
}: SidebarProps) {
  const { user } = useAuth();
  const [openMenu, setOpenMenu] =
  React.useState<number | null>(null);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "board",
      label: "Board",
      icon: Kanban,
      badge: activeTasksCount,
    },
    {
      id: "timeline",
      label: "Timeline",
      icon: Activity,
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
    {
      id: "mobile",
      label: "Mobile Preview",
      icon: Smartphone,
    },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-default flex flex-col h-screen shrink-0 text-primary transition-colors duration-300">

      {/* Logo */}

      <div className="border-b border-default p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600">

            <PulseIcon size="sm" />

          </div>

          <div>

            <h2 className="text-lg font-black text-primary">

              Pulse

            </h2>

            <p className="text-xs text-secondary">

              Project Management

            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-3 py-4">

        <span className="mb-3 block px-3 text-[10px] font-mono uppercase tracking-widest text-secondary">

          Navigation

        </span>

        <div className="space-y-1">

          {menuItems.map((item) => {

            const Icon = item.icon;

            const active = currentTab === item.id;

            return (

              <button
                key={item.id}
                onClick={() => {
                  console.log("Clicked menu:", item.id);
                  setCurrentTab(item.id);
                }}
                className={`flex h-10 w-full items-center justify-between rounded-xl border px-3 text-xs font-semibold transition-all ${
                  active
                    ? "border-indigo-500 bg-indigo-600/15 text-primary"
                    : "border-transparent hover:bg-surface-2"
                }`}
              >

                <div className="flex items-center gap-3">

                  <Icon
                    size={16}
                    className={
                      active
                        ? "text-indigo-500"
                        : "text-secondary"
                    }
                  />

                  <span>{item.label}</span>

                </div>

                {item.badge !== undefined &&
                  item.badge > 0 && (

                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        active
                          ? "bg-indigo-600 text-primary"
                          : "bg-surface-2 text-secondary"
                      }`}
                    >

                      {item.badge}

                    </span>

                  )}

              </button>

            );

          })}

        </div>

        {/* Projects */}

        <div className="mt-8">

          <div className="mb-3 flex items-center justify-between px-3">

            <span className="text-[10px] font-mono uppercase tracking-widest text-secondary">
              Projects
            </span>

            <button
              onClick={onOpenProjectModal}
              className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700"
            >
              +
            </button>

          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                onSelectProject(null);
                setCurrentTab("board");
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition ${
                selectedProjectId === null
                  ? "bg-indigo-600/20 text-indigo-400"
                  : "hover:bg-surface-2"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-indigo-500" />

              <span className="font-medium">
                All Projects
              </span>
            </button>

            {projects.map((project) => (

              <button
                key={project.id}
                onClick={() => {
                  onSelectProject(Number(project.id));
                  setCurrentTab("board");
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${
                  selectedProjectId === Number(project.id)
                    ? "bg-indigo-600/20"
                    : "hover:bg-surface-2"
                }`}
              >

                <div className="flex items-center gap-2 overflow-hidden">

                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: project.color,
                    }}
                  />

                  <span className="truncate text-primary">

                    {project.name}

                  </span>

                </div>

                <div className="relative">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      setOpenMenu(
                        openMenu === Number(project.id)
                          ? null
                          : Number(project.id)
                      );
                    }}
                    className="rounded p-1 hover:bg-surface-2"
                  >
                    <MoreVertical size={14} />
                  </button>

                  {openMenu === Number(project.id) && (

                    <div className="absolute right-0 top-7 z-50 w-40 rounded-xl border border-default bg-surface shadow-xl">

                      <button
                        onClick={() => {
                          onSelectProject(Number(project.id));
                          setCurrentTab("board");
                          setOpenMenu(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-surface-2"
                      >
                        Open Board
                      </button>

                      <button
                        onClick={() => {
                          onEditProject(project);
                          setOpenMenu(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-surface-2"
                      >
                        Edit Project
                      </button>

                      <button
                        onClick={() => {
                          onDeleteProject(project);
                          setOpenMenu(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-surface-2"
                      >
                        Delete Project
                      </button>

                    </div>

                  )}

                </div>

              </button>

            ))}

          </div>

        </div>

      </nav>

      {/* Footer */}

      <div className="border-t border-default p-5">

        <div className="flex items-center gap-3">

          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.name || "Guest"
            )}&background=4f46e5&color=ffffff`}
            alt={user?.name || "Guest"}
            className="h-10 w-10 rounded-full"
          />

          <div className="flex-1 overflow-hidden">

            <p className="truncate text-sm font-semibold text-primary">

              {user?.name || "Guest"}

            </p>

            <p className="truncate text-xs text-secondary">

              {user?.email || "Not signed in"}

            </p>

          </div>

          <button
            onClick={onLogout}
            className="text-secondary transition hover:text-red-500"
          >

            <LogOut size={18} />

          </button>

        </div>

      </div>

    </aside>
  );
}