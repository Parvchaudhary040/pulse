import React, { useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Flame, 
  Calendar, 
  ArrowUpRight, 
  Layers, 
  MoreVertical, 
  Plus, 
  PlusCircle, 
  PlayCircle,
  Zap
} from "lucide-react";
import { Task, Project, ActivityLog, TaskStatus, Priority } from "../types";

interface DashboardViewProps {
  tasks: Task[];
  projects: Project[];
  activityLogs: ActivityLog[];

  dashboardStats: {
    totalTasks: number;
    completedTasks: number;
    activeProjects: number;
    completionRate: number;
  };

  onToggleTaskStatus: (id: string) => void;
  onOpenTaskModal: () => void;
}

export default function DashboardView({
  tasks,
  projects,
  activityLogs,
  dashboardStats,
  onToggleTaskStatus,
  onOpenTaskModal
}: DashboardViewProps) {
  const [selectedVelocityDay, setSelectedVelocityDay] = useState<string>("Fri");
  const [newLogText, setNewLogText] = useState("");
console.log("Dashboard Tasks:", tasks);
console.log("Dashboard Projects:", projects);
console.log("Dashboard Stats:", dashboardStats);
  // Statistics calculations
  // const activeTasks = tasks.filter(t => t.status !== TaskStatus.DONE);
  // const myTasks = tasks.filter(t => t.assigneeId === "user-1");
  // const compTasksCount = tasks.filter(t => t.status === TaskStatus.DONE).length;
  // const overallVelocityPercent = Math.round((compTasksCount / (tasks.length || 1)) * 100);

  // Velocity values dictionary
  const velocityData: Record<string, { done: number, label: string }> = {
    "Mon": { done: 3, label: "Monday" },
    "Tue": { done: 5, label: "Tuesday" },
    "Wed": { done: 4, label: "Wednesday" },
    "Thu": { done: 8, label: "Thursday" },
    "Fri": { done: 6, label: "Friday" },
    "Sat": { done: 2, label: "Saturday" },
    "Sun": { done: 1, label: "Sunday" }
  };
  const myTasks = tasks.filter(
  task => task.status !== TaskStatus.DONE);

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case Priority.URGENT: return "text-red-400 bg-red-950/25 border border-red-900/35";
      case Priority.HIGH: return "text-amber-400 bg-amber-955/25 border border-amber-900/35";
      case Priority.MEDIUM: return "text-indigo-400 bg-indigo-950/25 border border-indigo-900/35";
      default: return "text-gray-400 bg-gray-900 border border-gray-800/80";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-[#0b0c10] text-[#f4f6fe] min-h-full">
      
      {/* Greetings Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
  Good morning, {JSON.parse(localStorage.getItem("pulse_user") || "{}").name || "Alex"}.
</h2>
          <p className="text-xs text-gray-450 text-gray-400 font-light mt-1">
            Here is a summary of your workspace speed. You have <span className="text-[#10b981] font-semibold">{myTasks.filter(t => t.status !== TaskStatus.DONE).length} pending coordinates</span> assigned to you.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono bg-gray-900 border border-gray-800/85 px-3 py-1.5 rounded-xl text-gray-400 select-none">
            📍 LAST DEPLOY: <strong>JUNE 21, 2026</strong>
          </span>
          <button 
            onClick={onOpenTaskModal}
            className="p-1 px-3 bg-[#12131a] hover:bg-[#181a25] text-[#10b981] border border-gray-800 hover:border-gray-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all text-center h-9"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Formulate Task</span>
          </button>
        </div>
      </div>

      {/* Numerical Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5.5 rounded-2xl bg-[#12131a]/95 border border-gray-800/85 flex items-center justify-between shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Unfinished Tasks</span>
            <span id="metric-unfinished-count" className="text-2xl font-black text-white leading-none block">{dashboardStats.totalTasks}</span>
            <span className="text-[10px] text-gray-405 text-gray-400 block font-light">Sprint 2 active workload</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5.5 rounded-2xl bg-[#12131a]/95 border border-gray-800/85 flex items-center justify-between shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">My Assignments</span>
            <span id="metric-my-tasks-count" className="text-2xl font-black text-white leading-none block">
              {dashboardStats.totalTasks}
            </span>
            <span className="text-[10px] text-[#10b981] block font-semibold">
  {JSON.parse(localStorage.getItem("pulse_user") || "{}").name || "Alex"} assigned
</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-505 bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Layers className="w-5 h-5 text-indigo-400" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5.5 rounded-2xl bg-[#12131a]/95 border border-gray-800/85 flex items-center justify-between shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Task Completion</span>
            <div className="flex items-baseline gap-2">
              <span id="metric-completion-ratio" className="text-2xl font-black text-white leading-none block">{dashboardStats.completionRate}%</span>
              <span className="text-[10px] font-mono text-indigo-400 font-bold">overall</span>
            </div>
            <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden mt-1 bg-gray-800/60 border border-gray-800">
              <div className="h-full bg-gradient-to-r from-indigo-550 to-indigo-500 bg-indigo-600 rounded-full" style={{ width: `${dashboardStats.completionRate}%` }} />
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-[#6366f1]/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5.5 rounded-2xl bg-[#12131a]/95 border border-gray-800/85 flex items-center justify-between shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Active Projects</span>
            <span className="text-2xl font-black text-white leading-none block">{dashboardStats.activeProjects}</span>
            <span className="text-[10px] text-gray-400 block font-light">3 client sandbox targets</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-[#10b981]/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Row 1: Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Card 1: Velocity Graph */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#12131a]/95 border border-gray-800/85 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Sprinting Task Completion Velocity</h3>
              </div>
              <span className="text-[10px] font-mono text-gray-550 text-gray-500">7-Day Analysis Logs</span>
            </div>
            
            {/* Custom SVG line Chart */}
            <div className="h-44 w-full relative pt-4 flex items-end">
              <svg className="absolute inset-0 w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                {/* Grid Horiz lines */}
                <line x1="0" y1="40" x2="100%" y2="40" stroke="#1f2937" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="85" x2="100%" y2="85" stroke="#1f2937" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="130" x2="100%" y2="130" stroke="#1f2937" strokeWidth="1" strokeDasharray="3 3" />
                
                {/* SVG path mapping the velocity entries */}
                <path
                  d="M 20 130 Q 80 85, 140 105 T 260 45 T 380 75 T 500 125 T 620 145"
                  fill="none"
                  stroke="url(#gradient-indigo)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                <defs>
                  <linearGradient id="gradient-indigo" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Dynamic Overlay labels for interactive SVG feel */}
              <div className="absolute top-2 right-2 p-2 bg-[#0c0d12] border border-gray-800 rounded-lg text-[10px]">
                <strong className="text-gray-300 font-mono">{velocityData[selectedVelocityDay].label}:</strong>{" "}
                <span className="text-[#10b981] font-extrabold">{velocityData[selectedVelocityDay].done} Tasks Closed</span>
              </div>

              {/* Interactive bottom bar points selector */}
              <div className="w-full flex justify-between px-3 z-10 relative">
                {Object.keys(velocityData).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedVelocityDay(day)}
                    className={`flex flex-col items-center gap-1 group transition-all`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedVelocityDay === day 
                        ? "bg-[#10b981] border-[#10b981] scale-110 shadow" 
                        : "bg-gray-950 border-gray-800 hover:border-gray-600"
                    }`}>
                      <div className="w-1 h-1 bg-white rounded-full" />
                    </div>
                    <span className={`text-[10px] font-mono ${
                      selectedVelocityDay === day ? "text-white font-bold" : "text-gray-500"
                    }`}>{day}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800/60 pt-4 mt-4 flex items-center justify-between text-xs text-gray-400 font-light">
            <span className="flex items-center gap-1">
              🚀 Week-over-week completion rate is up <strong className="text-[#10b981] font-bold">+18.2%</strong>
            </span>
            <span className="font-mono text-[9px] text-gray-550">SAMPLE SIGNAL telemetry</span>
          </div>
        </div>

        {/* Chart Card 2: Pie distribution */}
        <div className="p-6 rounded-2xl bg-[#12131a]/95 border border-gray-800/85 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">Project Distribution</h3>
              <MoreVertical className="w-4 h-4 text-gray-550 cursor-pointer" />
            </div>

            {/* Simulated Donut Chart using responsive SVG circle */}
            <div className="h-40 flex items-center justify-center relative">
              <svg className="w-32 h-32" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#222533" strokeWidth="2.8" />
                {/* Segment 1: Mobile App Revamp (50% - indigo) */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="50 100" strokeDashoffset="25" strokeLinecap="round" />
                {/* Segment 2: Web Platform (35% - emrald) */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="35 100" strokeDashoffset="-25" strokeLinecap="round" />
                {/* Segment 3: Brand refresh (15% - amber) */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="15 100" strokeDashoffset="-60" strokeLinecap="round" />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-black block text-gray-100">3</span>
                <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Active nodes</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1.5 rounded-full bg-[#6366f1]" />
                  <span className="text-gray-300 font-light text-[11px]">Mobile App Revamp</span>
                </div>
                <span className="font-mono text-gray-500 text-[10px]">50%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1.5 rounded-full bg-[#10b981]" />
                  <span className="text-gray-300 font-light text-[11px]">Web Platform Redesign</span>
                </div>
                <span className="font-mono text-gray-500 text-[10px]">35%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1.5 rounded-full bg-[#f59e0b]" />
                  <span className="text-gray-300 font-light text-[11px]">Brand & Visual Identity</span>
                </div>
                <span className="font-mono text-gray-500 text-[10px]">15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Bottom layout (My Tasks list vs Deadlines / Activities) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: My Assigned Tasks */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#12131a]/95 border border-gray-800/85 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-tight">Assigned to Me</h3>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-900/60 px-2.5 py-0.5 rounded-full">
              {dashboardStats.totalTasks} Pending
            </span>
          </div>

          <div className="space-y-2 flex-1">
            {myTasks.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-500 font-light select-none">
                🎉 Excellent work! No pending cards assigned directly to your node.
              </div>
            ) : (
              myTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 bg-gray-900/40 hover:bg-[#161824] rounded-xl border border-gray-800/80 flex items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-3.5 truncate">
                    <button
                      onClick={() => onToggleTaskStatus(task.id)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                        task.status === TaskStatus.DONE 
                          ? "bg-[#10b981] border-[#10b981] text-white" 
                          : "border-gray-700 hover:border-gray-550 hover:bg-gray-800"
                      }`}
                    >
                      {task.status === TaskStatus.DONE && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                    <div className="truncate">
                      <span className={`text-xs font-semibold block truncate ${
                        task.status === TaskStatus.DONE ? "line-through text-gray-550 text-gray-500" : "text-gray-150 text-gray-200"
                      }`}>{task.title}</span>
                      <span className="text-[9px] font-mono text-gray-500 block mt-0.5 uppercase tracking-wide">
                        Due: {task.dueDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2shrink-0">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Col: Timeline/Activity & Deadlines */}
        <div className="p-6 rounded-2xl bg-[#12131a]/95 border border-gray-800/85 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">Recent Activity Feed</h3>
              <Clock className="w-4 h-4 text-gray-500" />
            </div>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
              {activityLogs.slice(0, 3).map((log) => (
                <div key={log.id} className="flex gap-3 text-xs">
                  <img
                    src={log.userAvatar}
                    alt={log.userName}
                    className="w-7 h-7 rounded-full object-cover mt-0.5 border border-gray-800"
                  />
                  <div>
                    <p className="text-gray-300">
                      <strong className="text-white">{log.userName}</strong> {log.action}{" "}
                      <span className="text-indigo-400 font-medium">{log.targetName}</span>
                    </p>
                    {log.details && (
                      <p className="text-[10px] text-gray-500 font-light mt-1 pl-2 border-l border-gray-800">
                        "{log.details}"
                      </p>
                    )}
                    <span className="text-[9px] font-mono text-gray-600 mt-1 block">{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
