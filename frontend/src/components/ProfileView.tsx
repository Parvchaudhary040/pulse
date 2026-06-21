import React from "react";
import { 
  User, 
  MapPin, 
  Mail, 
  Briefcase, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ArrowUpRight,
  Sparkles,
  Zap
} from "lucide-react";
import { User as UserType, Task, TaskStatus } from "../types";

interface ProfileViewProps {
  user: UserType;
  tasks: Task[];
}

export default function ProfileView({ user, tasks }: ProfileViewProps) {
  // Filter Alex Rivera tasks
  const alexTasks = tasks.filter(t => t.assigneeId === "user-1");
  const completedCount = alexTasks.filter(t => t.status === TaskStatus.DONE).length;

  return (
    <div className="bg-[#0b0c10] text-[#f4f6fe] min-h-full pb-10 selection:bg-[#4f46e5]">
      
      {/* Cover Banner photo */}
      <div className="h-44 md:h-56 relative overflow-hidden bg-gray-900 border-b border-gray-800">
        <img
          src={user.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200&h=400"}
          alt="Alex Cover photo"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] to-transparent" />
      </div>

      {/* Main Container profile content */}
      <div className="max-w-4xl mx-auto px-6 relative -mt-16 sm:-mt-20">
        
        {/* Profile Card & Bio Info */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 border-b border-gray-800/80 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-[#0b0c10] shadow-2xl relative z-10 bg-gray-950"
            />
            <div className="text-left leading-tight">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">{user.name}</h2>
                <span className="bg-indigo-950/40 text-indigo-400 border border-indigo-900/60 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
                  PRO NODE
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1.5 font-light flex items-center gap-1.5 select-none font-mono">
                <Briefcase className="w-3.5 h-3.5 text-[#10b981]" />
                <span>{user.role}</span>
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-3 font-light font-sans">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-600" /> San Francisco, CA
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-gray-600" /> {user.email}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-[#12131a] border border-gray-800 p-4 rounded-xl min-w-[220px]">
            <div className="text-left leading-none">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Closed Cards</span>
              <span id="profile-closed-count" className="text-2xl font-black text-white mt-1.5 block">{completedCount}</span>
            </div>
            <div className="text-left leading-none border-l border-gray-800 pl-4">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Assigned total</span>
              <span id="profile-total-count" className="text-2xl font-black text-white mt-1.5 block">{alexTasks.length}</span>
            </div>
          </div>
        </div>

        {/* Divided columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Bio & Skills */}
          <div className="space-y-6">
            
            {/* Bio Card */}
            <div className="p-5 rounded-2xl bg-[#12131a]/95 border border-gray-800/80 shadow">
              <span className="block text-[10px] font-mono tracking-widest text-[#10b981] uppercase mb-2 font-bold select-none">formal portfolio</span>
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">About Alex</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {user.bio}
              </p>
            </div>

            {/* Skills checklist */}
            <div className="p-5 rounded-2xl bg-[#12131a]/95 border border-gray-800/80 shadow">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-400" />
                <span>Primary Skill Matrix</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.skills?.map((skill, rid) => (
                  <span key={rid} className="px-2.5 py-1 text-[11px] font-mono font-semibold bg-indigo-950/20 text-[#a855f7] rounded-lg border border-[#a855f7]/30 text-indigo-305">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Work/Contribution Checklist tracking list */}
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-[#12131a]/95 border border-gray-800/80 shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800/60">
                  <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#10b981]" />
                    <span>Recent Work Contributions</span>
                  </h3>
                  <span className="text-[10px] font-mono text-gray-500 rounded font-semibold">{alexTasks.length} NODES</span>
                </div>

                <div className="space-y-2.5">
                  {alexTasks.length === 0 ? (
                    <div className="py-12 text-center text-xs text-gray-500 font-light select-none">
                      No contribution records found on current node matrix.
                    </div>
                  ) : (
                    alexTasks.map((task) => (
                      <div key={task.id} className="p-3.5 bg-gray-900/30 border border-gray-800/50 rounded-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 text-left leading-tight truncate">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${
                            task.status === TaskStatus.DONE ? "bg-emerald-500" : "bg-indigo-400"
                          }`} />
                          <div className="truncate">
                            <span className="text-xs font-semibold text-gray-205 text-gray-200 block truncate">{task.title}</span>
                            <span className="text-[9px] font-mono text-gray-500 block uppercase font-bold mt-0.5">Due: {task.dueDate}</span>
                          </div>
                        </div>

                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                          task.status === TaskStatus.DONE 
                            ? "bg-emerald-950/20 text-emerald-400 border border-emerald-900/40" 
                            : "bg-[#12131a] text-gray-400 border border-gray-800"
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
