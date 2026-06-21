import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Tag, 
  ArrowLeft, 
  ArrowRight, 
  Trash2, 
  Edit, 
  AlertCircle,
  FolderSync
} from "lucide-react";
import { Task, TaskStatus, Priority, TeamMember } from "../types";

interface ProjectBoardViewProps {
  tasks: Task[];
  teamMembers: TeamMember[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTaskStatus: (id: string, nextStatus: TaskStatus) => void;
}

export default function ProjectBoardView({
  tasks,
  teamMembers,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onUpdateTaskStatus
}: ProjectBoardViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");
  const [selectedAssignee, setSelectedAssignee] = useState<string>("All");

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: TaskStatus.BACKLOG, label: "Backlog", color: "border-t-2 border-t-gray-600" },
    { id: TaskStatus.TODO, label: "Todo", color: "border-t-2 border-t-indigo-505 border-t-indigo-500" },
    { id: TaskStatus.IN_PROGRESS, label: "In Progress", color: "border-t-2 border-t-amber-500" },
    { id: TaskStatus.DONE, label: "Completed", color: "border-t-2 border-t-emerald-505 border-t-emerald-500" }
  ];

  // Helper to find assignee avatar & name
  const getAssignee = (id: string) => {
    return teamMembers.find(m => m.id === id) || {
      name: "Unassigned",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=128&h=128"
    };
  };

  const getPriorityBadge = (p: Priority) => {
    switch (p) {
      case Priority.URGENT: return "bg-red-950/20 text-red-400 border border-red-900/40";
      case Priority.HIGH: return "bg-amber-955/20 text-amber-400 border border-amber-900/40";
      case Priority.MEDIUM: return "bg-indigo-950/20 text-indigo-400 border border-indigo-900/40";
      default: return "bg-gray-900 text-gray-500 border border-gray-800";
    }
  };

  // Move helpers
  const handleShiftBackward = (task: Task) => {
    const order = [TaskStatus.BACKLOG, TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];
    const index = order.indexOf(task.status);
    if (index > 0) {
      onUpdateTaskStatus(task.id, order[index - 1]);
    }
  };

  const handleShiftForward = (task: Task) => {
    const order = [TaskStatus.BACKLOG, TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];
    const index = order.indexOf(task.status);
    if (index < order.length - 1) {
      onUpdateTaskStatus(task.id, order[index + 1]);
    }
  };

  // Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === "All" || task.priority === selectedPriority;
    const matchesAssignee = selectedAssignee === "All" || task.assigneeId === selectedAssignee;
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  return (
    <div className="p-6 space-y-6 bg-[#0b0c10] text-[#f4f6fe] min-h-full">
      
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] bg-indigo-900/35 text-indigo-400 border border-indigo-900/50 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold tracking-wide">
            STREAMS / MOBILE REVAMP
          </span>
          <h2 className="text-2xl font-black text-white mt-1 uppercase tracking-tight">Active Sprint Kanban</h2>
        </div>
        <button
          onClick={onAddTask}
          className="bg-indigo-650/15 border border-indigo-500/25 text-white bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-500/25 hover:scale-[1.01] px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Formulate New Card</span>
        </button>
      </div>

      {/* Filter panel */}
      <div className="p-4 rounded-xl bg-[#12131a] border border-gray-800/80 flex flex-col md:flex-row md:items-center gap-4 justify-between shadow-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
          <input
            id="board-search"
            type="text"
            placeholder="Type filter string... (title or criteria)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-[#0b0c10] border border-gray-800 focus:border-indigo-500 focus:outline-none rounded-xl pl-10 pr-4 text-xs text-gray-200 placeholder-gray-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Priority filter selector */}
          <div className="flex items-center gap-1.5 min-w-[130px]">
            <Filter className="w-3.5 h-3.5 text-gray-550 shrink-0" />
            <select
              id="board-priority-filter"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-[#0b0c10] border border-gray-800 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-300 focus:outline-none"
            >
              <option value="All">Priority: All</option>
              <option value={Priority.URGENT}>Urgent</option>
              <option value={Priority.HIGH}>High</option>
              <option value={Priority.MEDIUM}>Medium</option>
              <option value={Priority.LOW}>Low</option>
            </select>
          </div>

          {/* Assignee filter selector */}
          <div className="flex items-center gap-1.5 min-w-[140px]">
            <User className="w-3.5 h-3.5 text-gray-550 shrink-0" />
            <select
              id="board-assignee-filter"
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="bg-[#0b0c10] border border-gray-800 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-300 focus:outline-none"
            >
              <option value="All">Assignee: All</option>
              {teamMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter(t => t.status === col.id);
          return (
            <div
              key={col.id}
              className={`p-4 rounded-xl bg-[#12131a]/85 border border-gray-800 pb-6 flex flex-col min-h-[500px] shadow ${col.color}`}
            >
              {/* Column Title */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800/60">
                <span className="text-xs font-extrabold text-white uppercase tracking-tight flex items-center gap-1.5 select-none">
                  <span>{col.label}</span>
                  <span className="text-[10px] font-mono font-bold bg-gray-900 border border-gray-800/80 text-gray-500 rounded px-1.5 py-0.2">
                    {colTasks.length}
                  </span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full fill-indigo-400 bg-indigo-400" />
              </div>

              {/* Task Cards list */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colTasks.length === 0 ? (
                  <div className="p-8 text-center text-[11px] text-gray-500 border border-dashed border-gray-800/50 rounded-xl select-none font-light">
                    Empty log nodes.
                  </div>
                ) : (
                  colTasks.map((task) => {
                    const assignee = getAssignee(task.assigneeId);
                    return (
                      <div
                        id={`task-card-${task.id}`}
                        key={task.id}
                        className="p-4 bg-[#161823]/95 hover:bg-[#1a1c2b] border border-gray-800/80 rounded-xl shadow-md transition-all space-y-3.5 group relative"
                      >
                        {/* Title and control triggers */}
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs font-bold text-gray-150 text-gray-200 tracking-wide line-clamp-2 leading-snug">
                            {task.title}
                          </span>
                          <div className="absolute top-2 right-2 flex gap-1 bg-gray-900 border border-gray-850 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button
                              onClick={() => onEditTask(task)}
                              title="Edit coordinates"
                              className="text-gray-550 text-gray-500 hover:text-white p-0.5"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => onDeleteTask(task.id)}
                              title="Purge Card"
                              className="text-red-500 hover:text-red-400 p-0.5"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Description snippet */}
                        <p className="text-[11px] text-gray-400 leading-normal font-light line-clamp-3">
                          {task.description}
                        </p>

                        {/* Middle properties: date & labels */}
                        <div className="flex flex-wrap gap-1 items-center">
                          {task.labels.map((lab, lid) => (
                            <span key={lid} className="text-[9px] font-mono font-bold bg-indigo-950/20 test-[#a855f7] border border-[#a855f7]/25 text-indigo-300 px-1.5 py-0.5 rounded">
                              {lab}
                            </span>
                          ))}
                        </div>

                        {/* Footer details: assignee and date & shift selectors */}
                        <div className="border-t border-gray-850 border-gray-800/60 pt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={assignee.avatar}
                              alt={assignee.name}
                              title={assignee.name}
                              className="w-5.5 h-5.5 rounded-full object-cover border border-gray-700 font-mono text-[8px]"
                            />
                            <div className="text-left leading-none">
                              <span className="text-[9px] font-mono text-gray-500 block uppercase font-bold">DUE COORD</span>
                              <span className="text-[10px] text-gray-400 font-light font-sans">{task.dueDate}</span>
                            </div>
                          </div>

                          {/* Quick relocator triggers */}
                          <div className="flex items-center gap-1.5 shrink-0 bg-gray-900/60 backdrop-blur-sm p-1 rounded-lg border border-gray-850/80">
                            <button
                              disabled={task.status === TaskStatus.BACKLOG}
                              onClick={() => handleShiftBackward(task)}
                              className="p-1 rounded bg-gray-950 border border-gray-800 hover:border-gray-700 disabled:opacity-20 text-gray-400 hover:text-white transition-all disabled:pointer-events-none"
                            >
                              <ArrowLeft className="w-2.5 h-2.5" />
                            </button>
                            <span className={`text-[9px] font-mono font-bold px-1 rounded uppercase ${getPriorityBadge(task.priority)}`}>
                              {task.priority === Priority.URGENT ? "URG" : task.priority === Priority.HIGH ? "HIGH" : "MED"}
                            </span>
                            <button
                              disabled={task.status === TaskStatus.DONE}
                              onClick={() => handleShiftForward(task)}
                              className="p-1 rounded bg-gray-950 border border-gray-800 hover:border-gray-700 disabled:opacity-20 text-gray-400 hover:text-white transition-all disabled:pointer-events-none"
                            >
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
