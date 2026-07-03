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
} from "lucide-react";
import { Project } from "../types";
import { PulseIcon } from "./PulseLogo";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  projects: Project[];
  activeTasksCount: number;
  onLogout: () => void;
}

export default function Sidebar({
  currentTab,
  setCurrentTab,
  projects,
  activeTasksCount,
  onLogout
}: SidebarProps) {
  const { user } = useAuth();
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "board", label: "Board", icon: Kanban, badge: activeTasksCount },
    { id: "timeline", label: "Timeline", icon: Activity },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "mobile", label: "Mobile", icon: Smartphone },
  ];

  return (
    <aside className="w-64 bg-[#0e1017] border-r border-gray-800/80 flex flex-col h-screen shrink-0 text-gray-300 select-none">
      
      {/* Workspace Selector */}
      <div className="border-b border-gray-800 p-5">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center">

            <PulseIcon size="sm" />

          </div>

          <div>

            <h2 className="text-lg font-black text-white">
              Pulse
            </h2>

            <p className="text-xs text-gray-500">
              Project Management
            </p>

          </div>

        </div>

      </div>
      {/* Main Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <span className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase px-3 mb-2">Navigation</span>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3 h-10 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isActive 
                  ? "bg-indigo-650/15 border border-indigo-500/25 text-white bg-indigo-600/10" 
                  : "hover:bg-gray-850/60 hover:text-white hover:bg-gray-900 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <IconComponent className={`w-4 h-4 ${isActive ? "text-[#10b981]" : "text-gray-400"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${isActive ? "bg-indigo-650 text-white" : "bg-gray-800 text-gray-400"}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Dynamic Project Quicklinks */}
        <div className="pt-6">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase">Projects</span>
            <FolderOpen className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <div className="space-y-1">
            {projects.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setCurrentTab("board")} // Redirects beautifully to boards tab
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-light text-gray-400 hover:text-white hover:bg-gray-900/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: proj.color }} />
                  <span className="truncate max-w-[130px]">{proj.name}</span>
                </div>
                <span className="text-[9px] font-mono text-gray-500 bg-gray-800/40 px-1 py-0.5 rounded">
                  {proj.progress}%
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* User Footer Profile & Sign Out option */}
      <div className="border-t border-gray-800 p-5">

        <div className="flex items-center gap-3">

          <img
            alt={user?.name || "User"}
            className="w-10 h-10 rounded-full"
          />

          <div className="flex-1">

            <p className="text-sm font-semibold text-white">
              {user?.name || "Guest"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || "Not signed in"}
            </p>
            
          </div>

          <button
            onClick={onLogout}
            className="text-gray-400 hover:text-red-500"
          >
            <LogOut size={18} />
          </button>

        </div>

      </div>
    </aside>
  );
}
