import React, { useState } from "react";
import { 
  Menu, 
  ChevronDown, 
  LayoutDashboard, 
  Kanban, 
  Activity, 
  User, 
  Settings, 
  Smartphone, 
  Circle, 
  LogOut,
  FolderOpen
} from "lucide-react";
import { Project } from "../types";
import { PulseIcon } from "./PulseLogo";

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  projects: Project[];
  activeTasksCount: number;
  myTasksCount: number;
  onLogout: () => void;
}

export default function Sidebar({
  currentTab,
  setCurrentTab,
  projects,
  activeTasksCount,
  myTasksCount,
  onLogout
}: SidebarProps) {
  const [workspace, setWorkspace] = useState("Pulse Workspace");
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "board", label: "Project Board", icon: Kanban, badge: activeTasksCount },
    { id: "timeline", label: "Timeline & Activity", icon: Activity },
    { id: "profile", label: "User Profile", icon: User },
    { id: "settings", label: "Account Settings", icon: Settings },
    { id: "mobile", label: "Mobile View", icon: Smartphone },
  ];

  return (
    <aside className="w-64 bg-[#0e1017] border-r border-gray-800/80 flex flex-col h-screen shrink-0 text-gray-300 select-none">
      
      {/* Workspace Selector */}
      <div className="relative border-b border-gray-800/60 p-4">
        <button
          onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}
          className="w-full flex items-center justify-between p-2 rounded-xl bg-gray-900/50 hover:bg-gray-900 border border-gray-800/60 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/15 flex items-center justify-center border border-indigo-500/20">
              <PulseIcon size="sm" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white leading-tight font-sans tracking-wide">Pulse Corp</div>
              <div className="text-[10px] text-gray-500 font-mono">alex.rivera</div>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>

        {showWorkspaceDropdown && (
          <div className="absolute left-4 right-4 top-16 bg-[#161824] border border-gray-800 rounded-xl shadow-2xl z-50 p-1 space-y-1">
            <button
              onClick={() => { setWorkspace("Pulse Workspace"); setShowWorkspaceDropdown(false); }}
              className="w-full text-left p-2.5 rounded-lg text-xs hover:bg-[#20222f] hover:text-white flex items-center justify-between"
            >
              <span>💼 Pulse Workspace</span>
              <Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500" />
            </button>
            <button
              onClick={() => { setWorkspace("Alex Personal Lab"); setShowWorkspaceDropdown(false); }}
              className="w-full text-left p-2.5 rounded-lg text-xs hover:bg-[#20222f] hover:text-white flex items-center justify-between"
            >
              <span>🔬 Alex Personal Lab</span>
            </button>
            <button
              onClick={() => { setWorkspace("System Testing Node"); setShowWorkspaceDropdown(false); }}
              className="w-full text-left p-2.5 rounded-lg text-xs hover:bg-[#20222f] hover:text-white flex items-center justify-between"
            >
              <span>🖥️ System Testing Node</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <span className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase px-3 mb-2">Workspace Nodes</span>
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
            <span className="block text-[10px] font-mono tracking-widest text-gray-500 uppercase">Active Streams</span>
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
      <div className="p-4 border-t border-gray-800/60 bg-[#0c0d12]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"
                alt="Alex Avatar"
                className="w-8 h-8 rounded-full object-cover border border-indigo-500/30"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0c0d12]" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white truncate max-w-[110px]">Alex Rivera</p>
              <p className="text-[9px] font-mono text-gray-500 truncate max-w-[110px]">Lead PM</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            title="Sign Out"
            className="p-2 ml-1 rounded-lg hover:bg-red-950/20 hover:text-red-400 text-gray-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
