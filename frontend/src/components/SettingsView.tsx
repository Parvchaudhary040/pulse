import React, { useState } from "react";
import { 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Sparkles, 
  Settings, 
  CloudLightning,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

interface SettingsViewProps {
  onUpdateUserName: (name: string) => void;
}

export default function SettingsView({ onUpdateUserName }: SettingsViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<string>("profile");
  const [nameInput, setNameInput] = useState("Alex Rivera");
  const [bioInput, setBioInput] = useState("Lead Product Manager focused on crafting high-impact tools for modern builders.");
  
  // Interactive notification toggles code state
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [securityLogs, setSecurityLogs] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);

  // Password fields
  const [currentPW, setCurrentPW] = useState("");
  const [newPW, setNewPW] = useState("");

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      alert("Name coordinate cannot be blank.");
      return;
    }
    onUpdateUserName(nameInput);
    alert("Profile parameters updated successfully inside local state!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPW || !newPW) {
      alert("Please fill in current and new password credentials.");
      return;
    }
    alert("Security credentials refreshed successfully.");
    setCurrentPW("");
    setNewPW("");
  };

  const menuItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "security", label: "Access Security", icon: Lock },
    { id: "notifications", label: "Notification Rules", icon: Bell },
    { id: "billing", label: "Subscription Billing", icon: CreditCard },
  ];

  return (
    <div className="p-6 bg-[#0b0c10] text-[#f4f6fe] min-h-full selection:bg-[#4f46e5]">
      
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-xl font-black text-white uppercase tracking-tight">Account Parameters & Coordinates</h2>
        <p className="text-xs text-gray-400 font-light mt-1">
          Coordinate local user options, security access levels, notification digests, and billing ledgers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-[#12131a]/85 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl min-h-[480px]">
        
        {/* Vertical subnavigation panel */}
        <div className="md:col-span-1 border-r border-gray-800 bg-[#0e1017]/70 p-4 space-y-1 select-none">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSubTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSubTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 h-10 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive 
                    ? "bg-indigo-650/15 border border-indigo-505/25 text-white bg-indigo-600/10" 
                    : "hover:bg-gray-900 hover:text-white border border-transparent text-gray-405"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#10b981]" : "text-gray-500"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content detail panels */}
        <div className="md:col-span-3 p-6 md:p-8 overflow-y-auto">
          
          {/* TAB 1: Profile Edits */}
          {activeSubTab === "profile" && (
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-3">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wide">Workspace Profile Settings</h3>
                <p className="text-[11px] text-gray-500 font-light mt-1">These settings affect your name cards across sprint boards.</p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label id="profile-name-lbl" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Formal Full Name</label>
                  <input
                    id="profile-name-input"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full h-11 bg-[#0b0c10] border border-gray-800 focus:outline-none focus:border-indigo-505 focus:border-indigo-500 rounded-xl px-4 text-xs text-gray-200"
                  />
                </div>

                <div>
                  <label id="profile-email-lbl" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Primary Email Coordinates</label>
                  <input
                    id="profile-email-input"
                    type="email"
                    value="alex.rivera@pulse.io"
                    disabled
                    className="w-full h-11 bg-[#08090d] border border-gray-850/80 rounded-xl px-4 text-xs text-gray-500 font-mono"
                  />
                  <span className="text-[10px] text-gray-550 text-gray-500 font-light mt-1.5 block">Managed directly by the platform administration controls.</span>
                </div>

                <div>
                  <label id="profile-bio-lbl" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Formulate Bio description</label>
                  <textarea
                    id="profile-bio-input"
                    rows={3}
                    value={bioInput}
                    onChange={(e) => setBioInput(e.target.value)}
                    className="w-full bg-[#0b0c10] border border-gray-800 focus:outline-none focus:border-indigo-500 rounded-xl p-4 text-xs text-gray-200 resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    id="profile-save-btn"
                    type="submit"
                    className="h-11 px-6 rounded-xl bg-indigo-650/15 border border-indigo-505/25 text-white bg-indigo-600 hover:bg-indigo-500 text-xs font-bold transition-all shadow shadow-indigo-600/10"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: Access Security */}
          {activeSubTab === "security" && (
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-3">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wide">Security Access phrase</h3>
                <p className="text-[11px] text-gray-550 text-gray-500 font-light mt-1">Re-engineer credentials or authorization variables.</p>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPW}
                    onChange={(e) => setCurrentPW(e.target.value)}
                    className="w-full h-11 bg-[#0b0c10] border border-gray-800 focus:outline-none focus:border-indigo-500 rounded-xl px-4 text-xs text-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5">New Password Node</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPW}
                    onChange={(e) => setNewPW(e.target.value)}
                    className="w-full h-11 bg-[#0b0c10] border border-gray-800 focus:outline-none focus:border-indigo-500 rounded-xl px-4 text-xs text-gray-200"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow shadow-indigo-600/15"
                  >
                    Refresh Credentials
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: Notifications rules */}
          {activeSubTab === "notifications" && (
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-3">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wide">Notification & Telemetry Alerts Rules</h3>
                <p className="text-[11px] text-gray-500 font-light mt-1">Toggle live signals routing to client channels.</p>
              </div>

              <div className="space-y-4">
                {/* Rule 1 */}
                <div className="p-4 bg-gray-900/30 border border-gray-800/80 rounded-xl flex items-center justify-between gap-4">
                  <div className="text-left leading-tight">
                    <span className="text-xs font-bold text-gray-200 block">Sprinting Relocation Signals</span>
                    <span className="text-[10px] text-gray-500 font-light block mt-1">Send dispatch emails when active cards move statuses.</span>
                  </div>
                  <button
                    onClick={() => setEmailNotifs(!emailNotifs)}
                    className={`h-6 w-11 rounded-full relative p-0.5 transition-colors focus:outline-none cursor-pointer ${
                      emailNotifs ? "bg-[#10b981]" : "bg-gray-800"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${
                      emailNotifs ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>

                {/* Rule 2 */}
                <div className="p-4 bg-gray-900/30 border border-gray-800/80 rounded-xl flex items-center justify-between gap-4">
                  <div className="text-left leading-tight">
                    <span className="text-xs font-bold text-gray-200 block">System Integrity Logs</span>
                    <span className="text-[10px] text-gray-550 text-gray-500 font-light block mt-1">Receive alerts regarding API proxy client failures.</span>
                  </div>
                  <button
                    onClick={() => setSecurityLogs(!securityLogs)}
                    className={`h-6 w-11 rounded-full relative p-0.5 transition-colors focus:outline-none cursor-pointer ${
                      securityLogs ? "bg-[#10b981]" : "bg-gray-800"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${
                      securityLogs ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>

                {/* Rule 3 */}
                <div className="p-4 bg-gray-900/30 border border-gray-800/80 rounded-xl flex items-center justify-between gap-4">
                  <div className="text-left leading-tight">
                    <span className="text-xs font-bold text-gray-200 block">Daily Workspace Digests</span>
                    <span className="text-[10px] text-gray-550 text-gray-500 font-light block mt-1">Compile and mail a layout summary of yesterday's releases.</span>
                  </div>
                  <button
                    onClick={() => setDailyDigest(!dailyDigest)}
                    className={`h-6 w-11 rounded-full relative p-0.5 transition-colors focus:outline-none cursor-pointer ${
                      dailyDigest ? "bg-[#10b981]" : "bg-gray-800"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${
                      dailyDigest ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Billing ledgers */}
          {activeSubTab === "billing" && (
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-3 flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wide">Subscription Ledger Details</h3>
                  <p className="text-[11px] text-gray-500 font-light mt-1">Audit current credits allocation metrics.</p>
                </div>
                <span className="text-[10px] tracking-wider font-mono px-2.5 py-0.5 rounded-full uppercase bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25 font-bold">
                  ACTIVE
                </span>
              </div>

              {/* Pro plan credit status */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/20 via-[#131524] to-[#161a29] border border-indigo-900/40 space-y-4">
                <div className="flex items-center gap-2">
                  <CloudLightning className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-bold text-white">Pulse Pro Node tier</span>
                </div>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Your node workspace is preloaded with uncapped project board creations and priority queue routing. 
                  Next auto-billing statement is scheduled on <strong className="text-white font-mono">July 21, 2026</strong> for a total parameters cost of <strong className="text-[#10b981] font-mono">$24.00</strong>.
                </p>
                <div className="w-full h-1.5 bg-gray-900 border border-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-2/3" />
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase font-bold">
                  <span>Usage: 6.5 GB / 10 GB Capacity</span>
                  <span>65% Allocated</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
