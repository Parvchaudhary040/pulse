import React, { useState, useEffect } from "react";
import { X, Calendar, User, Tag, Layout, ShieldAlert } from "lucide-react";
import { Task, TaskStatus, Priority, TeamMember } from "../types";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Omit<Task, "id" | "createdAt"> & { id?: string }) => void;
  teamMembers: TeamMember[];
  editingTask?: Task | null;
}

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  teamMembers,
  editingTask
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const [assigneeId, setAssigneeId] = useState("");
  const [dueDate, setDueDate] = useState("2026-06-30");
  const [labelInput, setLabelInput] = useState("");
  const [errorOnSubmit, setErrorOnSubmit] = useState("");

  // Sync edit mode values
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
      setAssigneeId(editingTask.assigneeId);
      setDueDate(editingTask.dueDate);
      setLabelInput(editingTask.labels.join(", "));
    } else {
      // Clear values for new create
      setTitle("");
      setDescription("");
      setStatus(TaskStatus.TODO);
      setPriority(Priority.MEDIUM);
      if (teamMembers.length > 0) {
        setAssigneeId(teamMembers[0].id);
      }
      setDueDate("2026-06-30");
      setLabelInput("Design, UI");
    }
    setErrorOnSubmit("");
  }, [editingTask, isOpen, teamMembers]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorOnSubmit("");

    if (!title.trim()) {
      setErrorOnSubmit("Task title coordinates are mandatory.");
      return;
    }

    if (!assigneeId) {
      setErrorOnSubmit("Assignee selection is required.");
      return;
    }

    // Process labels
    const labels = labelInput
      .split(",")
      .map(l => l.trim())
      .filter(l => l.length > 0);

    onSave({
      id: editingTask?.id,
      title,
      description,
      status,
      priority,
      assigneeId,
      projectId: "proj-1", // Fixed to primary revamp project code
      dueDate,
      labels
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#06070a]/90 backdrop-blur-md flex items-center justify-center z-50 p-4 selection:bg-[#4f46e5]">
      
      {/* Container Box */}
      <div className="w-full max-w-xl bg-[#12131a] rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800 bg-gray-900/40">
          <div className="flex items-center gap-2">
            <Layout className="w-4.5 h-4.5 text-[#10b981]" />
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              {editingTask ? "Revision Parameters on Card" : "Configure New Task Node"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-1.5 bg-[#0b0c10] border border-gray-800 hover:border-gray-700 rounded-lg text-gray-400 hover:text-white transition-all text-sm font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Errors Block */}
        {errorOnSubmit && (
          <div className="px-5 pt-4">
            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/60 text-red-350 text-red-400 text-xs flex items-center gap-2 font-light">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorOnSubmit}</span>
            </div>
          </div>
        )}

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5.5 space-y-4">
          
          {/* Title Area */}
          <div>
            <label id="task-title-lbl" className="block text-xs font-mono uppercase tracking-widest text-gray-450 text-gray-400 mb-1.5">Task Label / Summary</label>
            <input
              id="task-title-input"
              type="text"
              placeholder="e.g. Establish authentication proxy flow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 bg-[#0b0c10] border border-gray-800 focus:border-indigo-500 focus:outline-none rounded-xl px-4 text-sm text-gray-200"
              maxLength={80}
            />
          </div>

          {/* Description Area */}
          <div>
            <label id="task-desc-lbl" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Specification parameters</label>
            <textarea
              id="task-desc-input"
              placeholder="Detail specific criteria, unit tests configuration guidelines, or design asset links..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-[#0b0c10] border border-gray-800 focus:border-indigo-500 focus:outline-none rounded-xl p-4 text-xs text-gray-200 resize-none leading-relaxed"
            />
          </div>

          {/* Properties grid (Two col) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Status Drop */}
            <div>
              <label id="task-status-lbl" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Status Column</label>
              <select
                id="task-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full h-11 bg-[#0b0c10] border border-gray-800 focus:border-indigo-500 focus:outline-none rounded-xl px-4 text-xs text-gray-250 font-semibold cursor-pointer"
              >
                <option value={TaskStatus.BACKLOG}>Backlog</option>
                <option value={TaskStatus.TODO}>Todo</option>
                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatus.DONE}>Done</option>
              </select>
            </div>

            {/* Priority Selection */}
            <div>
              <label id="task-priority-lbl" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Sprint Priority</label>
              <select
                id="task-priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full h-11 bg-[#0b0c10] border border-gray-800 focus:border-indigo-500 focus:outline-none rounded-xl px-4 text-xs text-gray-250 font-semibold cursor-pointer"
              >
                <option value={Priority.URGENT}>Urgent</option>
                <option value={Priority.HIGH}>High</option>
                <option value={Priority.MEDIUM}>Medium</option>
                <option value={Priority.LOW}>Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Assignees Selection */}
            <div>
              <label id="task-assignee-lbl" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Assignee node</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                <select
                  id="task-assignee-select"
                  value={assigneeId}
                  onChange={(e) => setAssigneeId(e.target.value)}
                  className="w-full h-11 bg-[#0b0c10] border border-gray-800 focus:border-indigo-500 focus:outline-none rounded-xl pl-10 pr-4 text-xs text-gray-205 cursor-pointer font-medium"
                >
                  <option value="" disabled>Select teammate...</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.role.split(" ")[0]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Due date Calendar picker */}
            <div>
              <label id="task-date-lbl" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Target deadline</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                <input
                  id="task-date-input"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full h-11 bg-[#0b0c10] border border-gray-800 focus:border-indigo-500 focus:outline-none rounded-xl pl-10 pr-4 text-xs text-gray-250 cursor-text font-mono"
                />
              </div>
            </div>
          </div>

          {/* Labels array text */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label id="task-labels-lbl" className="block text-xs font-mono uppercase tracking-widest text-gray-400">Class Tags</label>
              <span className="text-[10px] text-gray-550 text-gray-500 font-mono">Use comma seperators</span>
            </div>
            <div className="relative">
              <Tag className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-550 text-gray-500" />
              <input
                id="task-labels-input"
                type="text"
                placeholder="e.g. Design, UI, React, Mobile"
                value={labelInput}
                onChange={(e) => setLabelInput(e.target.value)}
                className="w-full h-11 bg-[#0b0c10] border border-gray-800 focus:border-indigo-500 focus:outline-none rounded-xl pl-10 pr-4 text-xs text-gray-200"
              />
            </div>
          </div>

          {/* Footer Save / Cancel button triggers */}
          <div className="border-t border-gray-800/60 pt-4.5 mt-6 flex justify-end gap-3.5">
            <button
              id="task-cancel-btn"
              type="button"
              onClick={onClose}
              className="px-5 h-11 rounded-xl border border-gray-800 hover:bg-gray-850/60 hover:bg-gray-900 text-gray-300 hover:text-white text-xs font-bold transition-all text-center"
            >
              Cancel
            </button>
            <button
              id="task-save-btn"
              type="submit"
              className="px-6 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-indigo-600/30"
            >
              {editingTask ? "Commit Revision" : "Formulate Card"}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
