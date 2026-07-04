import React, { useState } from "react";
import { 
  Smartphone, 
  Wifi, 
  Battery, 
  Bell, 
  ChevronRight, 
  LayoutDashboard, 
  Kanban, 
  User, 
  Plus, 
  Zap, 
  TrendingUp, 
  FolderSync, 
  CheckCircle2,
  Calendar
} from "lucide-react";
import { Task, TaskStatus, Priority } from "../types";

interface MobileSimulatorProps {
  tasks: Task[];
  onToggleTaskStatus: (id: string) => void;
}

export default function MobileSimulator({ tasks, onToggleTaskStatus }: MobileSimulatorProps) {
  const [selectedMobileTab, setSelectedMobileTab] = useState("home");
  const [filterPriority, setFilterPriority] = useState<string>("All");

  const alexTasks = tasks.filter(t => t.assigneeId === "user-1");
  const activeAlexTasks = alexTasks.filter(t => t.status !== TaskStatus.DONE);
  const completedAlexCount = alexTasks.filter(t => t.status === TaskStatus.DONE).length;

  const getPriorityMarker = (p: Priority) => {
    switch (p) {
      case Priority.URGENT: return "bg-red-500";
      case Priority.HIGH: return "bg-amber-500";
      case Priority.MEDIUM: return "bg-indigo-505 bg-indigo-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="p-6 bg-app text-[#f4f6fe] min-h-full flex flex-col items-center justify-center selection:bg-[#4f46e5]">
      
      {/* Intro info heading */}
      <div className="text-center max-w-md mb-8">
        <h2 className="text-xl font-black text-primary uppercase tracking-tight">Interactive Mobile Sandbox</h2>
        <p className="text-xs text-secondary font-light mt-1">
          Monitor exactly how the custom "Pulse Dashboard" responsive rules operate on compact viewport view models. Complete operations below inside our mock hardware wrapper.
        </p>
      </div>

      {/* Tactile Smartphone Hardware bezel container */}
      <div className="w-[340px] h-[700px] bg-surface border-[10px] bg-surface-2
hover:bg-indigo-100
border border-default rounded-[44px] shadow-2xl relative overflow-hidden flex flex-col justify-between ring-4 ring-indigo-950/40">
        
        {/* Notch / Speaker bar & StatusBar indicators */}
        <div className="bg-surface h-9 pt-1 px-5 flex justify-between items-center text-[10px] font-mono text-secondary select-none z-30">
          <span>09:41</span>
          {/* Dynamic Mock physical notch */}
          <div className="w-24 h-4 bg-surface-2 absolute left-1/2 -translate-x-1/2 rounded-full top-2 border border-default/20" />
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3 text-gray-505 text-secondary" />
            <Battery className="w-3.5 h-3.5 text-gray-450 text-[#10b981]" />
          </div>
        </div>

        {/* Emulated screen canvas */}
        <div className="flex-1 overflow-y-auto px-4.5 pt-2 pb-6 flex flex-col">
          
          {/* Dashboard View */}
          {selectedMobileTab === "home" && (
            <div className="space-y-5 flex-1">
              
              {/* Header section with notification bubble */}
              <div className="flex items-center justify-between pb-2">
                <div className="text-left leading-tight">
                  <span className="text-[9px] font-mono text-secondary uppercase tracking-widest block font-bold">Good Morning 👋 Alex Rivera 2 Tasks due today</span>
                  <h3 className="text-base font-black text-primary uppercase tracking-tight">Active Node</h3>
                </div>
                <button className="p-1 px-1.5 rounded-lg bg-surface-2 border border-gray-805 text-secondary relative">
                  <Bell className="w-3.5 h-3.5" />
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                </button>
              </div>

              {/* Horizontal scroll statistic badges */}
              <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-none snap-x -mx-4.5 px-4.5">
                {/* Badge 1 */}
                <div className="p-3 bg-surface-2 border border-default/80 rounded-xl min-w-[120px] shrink-0 snap-center text-left space-y-1">
                  <span className="text-[8px] font-mono text-secondary uppercase tracking-wider block leading-none font-bold">My PENDING</span>
                  <span className="text-lg font-black text-primary leading-none block">{activeAlexTasks.length} Cards</span>
                  <span className="text-[8px] text-[#10b981] block">Synchronized core</span>
                </div>
                {/* Badge 2 */}
                <div className="p-3 bg-gradient-to-br from-[#12131a] to-indigo-950/20 border border-indigo-900/30 rounded-xl min-w-[120px] shrink-0 snap-center text-left space-y-1">
                  <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-wider block leading-none font-bold">WEEKLY COMPLETES</span>
                  <span className="text-lg font-black text-indigo-300 leading-none block">+{completedAlexCount} Sprint</span>
                  <span className="text-[8px] text-secondary block">Pulse benchmark</span>
                </div>
                {/* Badge 3 */}
                <div className="p-3 bg-surface-2 border border-default/80 rounded-xl min-w-[120px] shrink-0 snap-center text-left space-y-1">
                  <span className="text-[8px] font-mono text-secondary uppercase tracking-wider block leading-none font-bold">STREAMS COUNT</span>
                  <span className="text-lg font-black text-primary leading-none block">3 Targets</span>
                  <span className="text-[8px] text-gray-550 text-secondary block">Mobile App Revamp</span>
                </div>
              </div>

              {/* Sparkline line widget */}
              <div className="p-3.5 rounded-xl bg-surface-2/70 border border-gray-850/60 flex items-center justify-between gap-4">
                <div className="text-left space-y-0.5">
                  <span className="text-[8px] font-mono text-gray-550 text-secondary uppercase tracking-wider block font-bold">Sprinting metrics</span>
                  <span className="text-xs font-bold text-primary block">Completion progress</span>
                  <span className="text-[9px] text-[#10b981] font-semibold block mt-1">+18.4% Week ratio</span>
                </div>
                {/* Simple Sparkline visual */}
                <svg className="w-18 h-8" viewBox="0 0 40 15">
                  <path d="M0,13 L8,9 L16,11 L24,4 L32,8 L40,1" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Alex tasks checklists */}
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[9px] font-mono text-secondary uppercase tracking-widest font-bold">Priority Tasks</span>
                  <button 
                    onClick={() => alert("Please swap to full desktop view 'Project Board' node for detail creates.")}
                    className="p-1 px-1.5 rounded-md bg-surface-2 border border-gray-805 text-[8px] font-mono text-[#10b981] font-bold flex items-center gap-0.5"
                  >
                    <Plus className="w-2.5 h-2.5" /> ADD
                  </button>
                </div>

                <div className="space-y-1.5 max-h-52 overflow-y-auto pr-0.5">
                  {alexTasks.length === 0 ? (
                    <div className="p-6 text-center text-[10px] text-gray-550 border border-dashed border-gray-805 rounded-xl select-none">
                      No task parameters assigned.
                    </div>
                  ) : (
                    alexTasks.map((task) => (
                      <div key={task.id} className="p-2.5 bg-surface-2 border bg-surface-2
hover:bg-indigo-100
border border-default rounded-lg flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate text-left">
                          <button
                            onClick={() => onToggleTaskStatus(task.id)}
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 ${
                              task.status === TaskStatus.DONE 
                                ? "bg-[#10b981] border-[#10b981] text-primary" 
                                : "border-default hover:border-gray-500"
                            }`}
                          >
                            {task.status === TaskStatus.DONE && <CheckCircle2 className="w-3 h-3" />}
                          </button>
                          <div className="truncate">
                            <span className={`text-[10px] font-bold block truncate ${
                              task.status === TaskStatus.DONE ? "line-through text-gray-600" : "text-primary"
                            }`}>{task.title}</span>
                            <span className="text-[8px] font-mono text-secondary block">Due: {task.dueDate}</span>
                          </div>
                        </div>

                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${getPriorityMarker(task.priority)}`} title={`Priority: ${task.priority}`} />
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Kanban / Cards view */}
          {selectedMobileTab === "board" && (
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between pb-1 border-b bg-surface-2
hover:bg-indigo-100
border border-default">
                <span className="text-[10px] font-mono text-gray-505 text-secondary uppercase font-bold">Mobile Board Revamp</span>
                <span className="text-[9px] font-semibold bg-indigo-950/40 text-indigo-400 px-2 rounded-full border border-indigo-900/60">
                  Sprint active
                </span>
              </div>

              {/* Stack views of backlog, todo, in_progress in scroll */}
              <div className="space-y-3.5">
                {tasks.slice(0, 4).map((task) => (
                  <div key={task.id} className="p-3 bg-surface-2 border bg-surface-2
hover:bg-indigo-100
border border-default rounded-xl space-y-2 text-left">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-gray-150 text-primary leading-tight block truncate col-span-2 max-w-[180px]">
                        {task.title}
                      </span>
                      <span className={`text-[7px] font-mono font-bold px-1 rounded uppercase bg-surface-2 ${
                        task.priority === Priority.URGENT ? "text-red-400" : "text-indigo-400"
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t bg-surface-2
hover:bg-indigo-100
border border-default/60 pt-2 text-[8px] font-mono text-gray-555 text-secondary">
                      <span>Status: <strong className="text-gray-300">{task.status}</strong></span>
                      <span>{task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile View */}
          {selectedMobileTab === "profile" && (
            <div className="space-y-4 flex-1 text-center py-4">
              <div className="relative inline-block">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"
                  alt="Alex"
                  className="w-18 h-18 rounded-2xl object-cover mx-auto border-2 border-indigo-505 border-indigo-500"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0c0d12]" />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-sm font-black text-primary uppercase tracking-tight">Alex Rivera</h4>
                <p className="text-[9px] font-mono text-gray-450 text-secondary font-semibold uppercase">Lead Product Manager</p>
                <p className="text-[9px] font-mono text-gray-600 font-light block">alex.rivera@pulse.io</p>
              </div>

              {/* Divider skills details */}
              <div className="p-3.5 bg-surface-2 border bg-surface-2
hover:bg-indigo-100
border border-default rounded-xl space-y-2.5">
                <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-widest block font-bold">Skills Portfolio</span>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {["Strategy", "Figma", "React", "Roadmap"].map((skill, rid) => (
                    <span key={rid} className="px-1.5 py-0.5 text-[8px] font-mono bg-surface-2 border border-gray-805 text-secondary rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Tactical interactive bottom bar */}
        <div className="bg-surface border-t bg-surface-2
hover:bg-indigo-100
border border-default h-14 px-6 flex justify-between items-center z-30 select-none">
          <button
            onClick={() => setSelectedMobileTab("home")}
            className={`flex flex-col items-center gap-0.5 ${
              selectedMobileTab === "home" ? "text-indigo-400 font-bold" : "text-secondary hover:text-gray-300"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[8px] font-sans font-semibold tracking-wide">Home</span>
          </button>
          
          <button
            onClick={() => setSelectedMobileTab("board")}
            className={`flex flex-col items-center gap-0.5 ${
              selectedMobileTab === "board" ? "text-indigo-400 font-bold" : "text-[#10b981]"
            }`}
          >
            <Kanban className="w-4 h-4" />
            <span className="text-[8px] font-sans font-semibold tracking-wide">Board</span>
          </button>

          <button
            onClick={() => setSelectedMobileTab("profile")}
            className={`flex flex-col items-center gap-0.5 ${
              selectedMobileTab === "profile" ? "text-indigo-400 font-bold" : "text-secondary hover:text-gray-300"
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[8px] font-sans font-semibold tracking-wide">Profile</span>
          </button>
        </div>

      </div>

    </div>
  );
}
