import React, { useState } from "react";
import { 
  Search, 
  Plus,
  Bell,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Notification } from "../types";

interface HeaderProps {
  currentTab: string;
  notifications: Notification[];
  onMarkNotificationRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
  onOpenTaskModal: () => void;
}

export default function Header({
  currentTab,
  notifications,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onOpenTaskModal
}: HeaderProps) {
  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { user } = useAuth();

  // Derive title from active tab
  const getBreadcrumb = () => {
    switch (currentTab) {
      case "dashboard":
        return "dashboard / Dashboard Analytics";
      case "board":
        return "board / Mobile App Revamp / Sprint Board";
      case "timeline":
        return "timeline / Mobile App Revamp / Timeline Activity";
      case "profile":
        return `Profile / ${user?.name ?? "User"}`;
      case "settings":
        return "settings / Account Dashboard";
      case "mobile":
        return "mobile / Vertical Device Emulation";
      default:
        return "Workspace / Coordinates";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-[#0e1017]/85 border-b border-gray-800/60 flex items-center justify-between px-6 sticky top-0 z-40 backdrop-blur-md">
      
      {/* Search breadcrumb and title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-xs font-mono text-gray-400 select-none font-medium">{getBreadcrumb()}</span>
        </div>
      </div>

      {/* Action panel */}
      <div className="flex items-center gap-4">
        
        {/* Command Menu Input */}
        <div className={`relative hidden md:block transition-all duration-300 ${searchFocused ? "w-64" : "w-48"}`}>
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search tasks... (⌘K)"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log("Search:", e.currentTarget.value);
              }
            }}
            className="w-full h-8.5 bg-[#12141f] border border-gray-800/80 focus:border-indigo-500 focus:outline-none rounded-lg text-xs pl-9 pr-3 text-gray-200 placeholder-gray-500 font-light"
          />
          <span className="absolute right-2 top-2 text-[9px] font-mono font-bold text-gray-600 bg-gray-900 border border-gray-800 px-1 rounded select-none pointer-events-none">
            ⌘K
          </span>
        </div>

        {/* Notifications Tray Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifPopover(!showNotifPopover)}
            className="p-2 rounded-lg bg-gray-900 hover:bg-gray-850 text-gray-400 hover:text-white border border-gray-800/80 transition-all relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-[#0e1017]" />
            )}
          </button>

          {showNotifPopover && (
            <div className="absolute right-0 top-11 w-80 bg-[#12131a] border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wide">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-indigo-600 text-white font-mono rounded px-1.5 font-bold">
                      {unreadCount} NEW
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllNotificationsRead}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-gray-800/50">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-505 text-gray-500 font-light">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => onMarkNotificationRead(notif.id)}
                      className={`p-3.5 text-left text-xs transition-colors cursor-pointer ${
                        notif.read ? "bg-transparent hover:bg-gray-900/30" : "bg-indigo-950/15 hover:bg-[#161824]"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <span className={`font-semibold ${notif.read ? "text-gray-300" : "text-white"}`}>
                          {notif.title}
                        </span>
                        <span className="text-[9px] text-gray-500 font-mono shrink-0">{notif.createdAt}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-tight font-light truncate">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick New Task Trigger */}
        <button
          onClick={onOpenTaskModal}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3.5 h-8.5 rounded-lg transition-all duration-150 flex items-center gap-1.5 shadow-lg shadow-indigo-600/25 hover:scale-[1.01]"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Task</span>
        </button>
      </div>
    </header>
  );
}
