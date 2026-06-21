import React, { useState } from "react";
import { 
  Plus, 
  Circle, 
  Paperclip, 
  Users, 
  FileText, 
  Download, 
  Send, 
  Activity, 
  Trash2,
  ListTodo
} from "lucide-react";
import { Project, TeamMember, ProjectFile, ActivityLog } from "../types";

interface ProjectDetailViewProps {
  project: Project;
  teamMembers: TeamMember[];
  projectFiles: ProjectFile[];
  activityLogs: ActivityLog[];
  onAddActivityLog: (details: string) => void;
  onUploadFile: (filename: string, filesize: string) => void;
}

export default function ProjectDetailView({
  project,
  teamMembers,
  projectFiles,
  activityLogs,
  onAddActivityLog,
  onUploadFile
}: ProjectDetailViewProps) {
  const [newLogDetail, setNewLogDetail] = useState("");
  const [fakeFileName, setFakeFileName] = useState("");
  const [fakeFileSize, setFakeFileSize] = useState("1.2 MB");

  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogDetail.trim()) return;
    onAddActivityLog(newLogDetail);
    setNewLogDetail("");
  };

  const handleFakeUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fakeFileName.trim()) return;
    
    // Add extension if missing
    let filename = fakeFileName;
    if (!filename.includes(".")) {
      filename += ".spec";
    }
    
    onUploadFile(filename, fakeFileSize);
    setFakeFileName("");
    alert(`File "${filename}" has been successfully appended to the project documents list.`);
  };

  return (
    <div className="p-6 space-y-6 bg-[#0b0c10] text-[#f4f6fe] min-h-full">
      
      {/* Project Banner Title & Progress Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#12131a] via-[#101118] to-[#1a1b26] border border-gray-800/80 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1] animate-ping" />
              <span className="text-[10px] bg-[#6366f1]/15 text-[#6366f1] border border-[#6366f1]/25 px-2 py-0.5 rounded-md font-mono uppercase font-bold text-indigo-400">
                ACTIVE SPRINT LOGS
              </span>
            </div>
            <h2 id="proj-detail-heading" className="text-2xl font-black text-white uppercase tracking-tight">{project.name}</h2>
            <p className="text-xs text-gray-400 font-light max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Project Deadline</span>
            <span className="text-sm font-bold text-white block mt-0.5 font-mono">{project.dueDate}</span>
          </div>
        </div>

        {/* Progress bar row */}
        <div className="border-t border-gray-850 border-gray-800/60 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          <div className="md:col-span-2 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-light">Overall Sprint Milestones Completion</span>
              <strong id="detail-progress-percent" className="font-mono text-indigo-400 font-bold">{project.progress}% Complete</strong>
            </div>
            <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden border border-gray-800 relative">
              <div 
                id="detail-progress-fill" 
                className="h-full bg-gradient-to-r from-indigo-500 via-[#a855f7] to-indigo-650 bg-indigo-600 rounded-full transition-all duration-500" 
                style={{ width: `${project.progress}%` }} 
              />
            </div>
          </div>

          <div className="flex -space-x-2 md:justify-end">
            {teamMembers.map((member) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                title={`${member.name} - ${member.role}`}
                className="w-8 h-8 rounded-full object-cover border-2 border-[#12131a] shadow hover:scale-110 transition-transform cursor-pointer"
              />
            ))}
            <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#12131a] flex items-center justify-center text-[10px] font-bold text-gray-400" title="Add external teammate">
              +
            </div>
          </div>

        </div>
      </div>

      {/* Main Layout Divided */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Activity Timeline with Quick log addition */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#12131a]/95 border border-gray-800/85 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-800/60">
              <h3 className="text-sm font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-450 text-indigo-450" />
                <span>Operational Activity Timeline</span>
              </h3>
              <span className="text-[10px] font-mono text-gray-550 text-gray-500 font-semibold">Live Events Logger</span>
            </div>

            {/* Quick action logger form */}
            <form onSubmit={handleSubmitLog} className="mb-6 flex gap-2">
              <input
                id="log-input"
                type="text"
                placeholder="Share a milestone comment or document progress directly..."
                value={newLogDetail}
                onChange={(e) => setNewLogDetail(e.target.value)}
                className="w-full bg-[#0b0c10] border border-gray-800 focus:border-indigo-505 focus:border-indigo-500 focus:outline-none rounded-xl h-10 px-4 text-xs text-gray-205 placeholder-gray-550"
              />
              <button
                id="log-submit"
                type="submit"
                className="px-4.5 bg-indigo-650/15 border border-[#3e398d]/40 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all h-10 rounded-xl text-xs font-bold"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Simulated Event Vertical Threads */}
            <div className="space-y-6 relative pl-4 border-l border-gray-800 pr-1">
              {activityLogs.map((log) => (
                <div key={log.id} className="relative space-y-1">
                  {/* Pulse bullet circle icon */}
                  <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-indigo-800 border-2 border-[#12131a] flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-indigo-400" />
                  </span>

                  <div className="flex items-center gap-2">
                    <img
                      src={log.userAvatar}
                      alt={log.userName}
                      className="w-5.5 h-5.5 rounded-full object-cover border border-gray-850"
                    />
                    <span className="text-xs text-gray-400 font-light text-[11px]">
                      <strong className="text-white text-xs">{log.userName}</strong> {log.action}
                    </span>
                    <span className="text-[9px] font-mono text-gray-600 ml-auto select-none shrink-0">{log.timestamp}</span>
                  </div>

                  <p className="text-[11px] text-gray-200 leading-normal pl-7 py-2 rounded-lg bg-[#0b0c10]/40 border border-gray-800/30 max-w-xl">
                    {log.details || `Synchronized operational parameter: ${log.targetName}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Project Files & Fake uploader */}
        <div id="project-files-panel" className="p-6 rounded-2xl bg-[#12131a]/95 border border-gray-800/85 shadow-xl space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800/60">
              <h3 className="text-sm font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-[#10b981]" />
                <span>Project Spec Files</span>
              </h3>
              <span className="text-[10px] font-mono text-gray-500 rounded font-semibold">{projectFiles.length} FILES</span>
            </div>

            {/* Simple append document files form */}
            <form onSubmit={handleFakeUpload} className="p-3 rounded-xl bg-gray-900/40 border border-gray-800 space-y-2.5">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none">Register Document</p>
              <div className="flex gap-2">
                <input
                  id="file-input"
                  type="text"
                  placeholder="e.g. Spec_Matrix.xlsx"
                  value={fakeFileName}
                  onChange={(e) => setFakeFileName(e.target.value)}
                  className="w-full h-8.5 bg-[#0b0c10] border border-gray-800 focus:outline-none focus:border-indigo-500 rounded-lg text-[10px] px-3 font-light text-gray-250 placeholder-gray-550"
                />
                <button
                  type="submit"
                  className="px-3.5 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-lg text-[10px] font-bold border border-gray-801"
                >
                  Save
                </button>
              </div>
            </form>

            {/* List of Files */}
            <div className="space-y-2.5 mt-4">
              {projectFiles.map((file) => (
                <div key={file.id} className="p-3 bg-gray-900/30 hover:bg-gray-900/60 border border-gray-800/80 rounded-xl flex items-center justify-between gap-3 transition-colors">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-7.5 h-7.5 rounded-lg bg-indigo-900/10 border border-indigo-900/35 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="truncate text-left leading-tight">
                      <span className="text-[11px] font-bold text-gray-200 block truncate" title={file.name}>
                        {file.name}
                      </span>
                      <span className="text-[9px] text-gray-505 text-gray-500 font-mono block mt-0.5">
                        {file.size} • by {file.uploadedBy.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Beginning mock download stream for: ${file.name}`)}
                    title="Download coordinates layout"
                    className="p-1 px-1.5 bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg border border-gray-815 border-gray-800/60 transition-colors shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
