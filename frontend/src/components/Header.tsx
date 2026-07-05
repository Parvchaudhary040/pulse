import React, { useState } from "react";
import {
  Search,
  Bell,
  Plus,
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
  onOpenTaskModal,
}: HeaderProps) {

  const { user } = useAuth();

  const [showNotifPopover, setShowNotifPopover] =
    useState(false);

  const [searchFocused, setSearchFocused] =
    useState(false);

  const unreadCount =
    notifications.filter(
      (n) => !n.read
    ).length;

  const getBreadcrumb = () => {

    switch (currentTab) {

      case "dashboard":
        return "Workspace / Dashboard";

      case "board":
        return "Workspace / Project Board";

      case "timeline":
        return "Workspace / Timeline";

      case "profile":
        return `Workspace / ${user?.name || "Profile"}`;

      case "settings":
        return "Workspace / Settings";

      case "mobile":
        return "Workspace / Mobile";

      default:
        return "Workspace";

    }

  };

  return (

<header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-default bg-surface/90 px-6 backdrop-blur-md transition-colors">

{/* Left */}

<div className="flex items-center gap-3">

<div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />

<span className="font-mono text-xs font-medium text-secondary">

{getBreadcrumb()}

</span>

</div>

{/* Right */}

<div className="flex items-center gap-4">

{/* Search */}

<div
className={`relative hidden transition-all duration-300 md:block ${
searchFocused
? "w-64"
: "w-52"
}`}
>

<Search
size={15}
className="absolute left-3 top-3 text-secondary"
/>

<input

type="text"

placeholder="Search tasks..."

onFocus={()=>
setSearchFocused(true)
}

onBlur={()=>
setSearchFocused(false)
}

onKeyDown={(e)=>{

if(e.key==="Enter"){

console.log(
"Searching:",
e.currentTarget.value
);

}

}}

className="h-10 w-full rounded-lg border border-default bg-surface-2 pl-10 pr-12 text-sm text-primary outline-none transition-colors placeholder:text-secondary focus:border-indigo-500"

/>

<span

className="pointer-events-none absolute right-2 top-2 rounded border border-default bg-surface px-2 py-1 text-[10px] font-bold text-secondary"

>

⌘K

</span>

</div>

{/* Notification */}

<div className="relative">

<button

onClick={()=>
setShowNotifPopover(
!showNotifPopover
)
}

className="relative rounded-lg border border-default bg-surface p-2 transition hover:bg-surface-2"

>

<Bell
size={18}
className="text-secondary"
/>

{unreadCount>0 && (

<span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-surface"/>

)}

</button>
{/* Notification Popover */}

{showNotifPopover && (

<div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-default bg-surface shadow-2xl">

  {/* Header */}

  <div className="flex items-center justify-between border-b border-default p-4">

    <div>

      <h3 className="text-sm font-bold text-primary">

        Notifications

      </h3>

      <p className="mt-1 text-xs text-secondary">

        {unreadCount} unread notification{unreadCount !== 1 && "s"}

      </p>

    </div>

    {unreadCount > 0 && (

      <button

        onClick={onMarkAllNotificationsRead}

        className="text-xs font-semibold text-indigo-500 hover:text-indigo-400"

      >

        Mark all read

      </button>

    )}

  </div>

  {/* Notifications */}

  <div className="max-h-80 overflow-y-auto divide-y divide-default">

    {notifications.length === 0 ? (

      <div className="p-8 text-center">

        <Bell
          size={28}
          className="mx-auto mb-3 text-secondary"
        />

        <p className="text-sm text-secondary">

          You're all caught up.

        </p>

      </div>

    ) : (

      notifications.map((notification) => (

        <button

          key={notification.id}

          onClick={() =>
            onMarkNotificationRead(
              notification.id
            )
          }

          className={`w-full p-4 text-left transition ${
            notification.read
              ? "hover:bg-surface-2"
              : "bg-indigo-500/10 hover:bg-indigo-500/20"
          }`}

        >

          <div className="flex items-start justify-between gap-3">

            <div className="flex-1">

              <h4 className="font-semibold text-primary">

                {notification.title}

              </h4>

              <p className="mt-1 text-sm text-secondary">

                {notification.message}

              </p>

            </div>

            {!notification.read && (

              <span className="mt-2 h-2 w-2 rounded-full bg-indigo-500"/>

            )}

          </div>

          <p className="mt-3 text-[11px] text-secondary">

            {notification.createdAt}

          </p>

        </button>

      ))

    )}

  </div>

</div>

)}

</div>
        {/* New Task Button */}
        <button
          onClick={onOpenTaskModal}
          className="flex h-10 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-primary transition hover:bg-indigo-700"
        >
          <Plus size={18} />

          <span className="hidden sm:block">
            New Task
          </span>
        </button>

      </div>

    </header>

  );

}