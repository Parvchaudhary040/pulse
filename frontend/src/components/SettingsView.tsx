import React, { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Moon,
  LogOut,
  Save,
  Loader2,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

import {
  notifySuccess,
  notifyError,
} from "../services/notificationService";

import {
  changePassword,
} from "../services/authService";

interface SettingsViewProps {
  onUpdateUserName: (name: string) => void;
}

export default function SettingsView({
  onUpdateUserName,
}: SettingsViewProps) {

  const { user, logout } = useAuth();

  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] =
    useState<
      "account" |
      "notifications" |
      "security"
    >("account");

  const [name, setName] =
    useState(user?.name || "");

  const [currentPassword,
    setCurrentPassword] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [emailNotifications,
    setEmailNotifications] =
    useState(true);

  const [desktopNotifications,
    setDesktopNotifications] =
    useState(true);

  const tabs = [

    {
      id: "account",
      label: "Account",
      icon: User,
    },

    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },

    {
      id: "security",
      label: "Security",
      icon: Lock,
    },

  ];

  const handleSaveProfile = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!name.trim()) {

      notifyError(
        "Name cannot be empty."
      );

      return;

    }

    onUpdateUserName(name);

    notifySuccess(
      "Profile updated successfully."
    );

  };

  const handleLogout = () => {

    logout();

    window.location.reload();

  };

  return (

<div className="min-h-screen bg-app text-primary p-8">

<h1 className="text-4xl font-black">

Settings

</h1>

<p className="mt-2 text-secondary">

Manage your Pulse account.

</p>

<div className="grid grid-cols-12 gap-8 mt-8">

<div className="col-span-3">

<div className="bg-surface border border-default rounded-2xl p-3">

{tabs.map((tab)=>{

const Icon=tab.icon;

return(

<button

key={tab.id}

onClick={()=>setActiveTab(tab.id as any)}

className={`mb-2 w-full flex items-center gap-3 rounded-xl px-4 py-3 transition

${activeTab===tab.id

?"bg-indigo-600 text-primary"

:"hover:bg-surface-2"

}`}

>

<Icon size={18}/>

{tab.label}

</button>

);

})}

</div>

</div>

<div className="col-span-9">

{/* ACCOUNT */}

{activeTab==="account" && (

<div className="bg-surface border border-default rounded-2xl p-8">

<h2 className="text-2xl font-bold mb-8">

Account Information

</h2>

<form

onSubmit={handleSaveProfile}

className="space-y-6"

>

<div className="flex items-center gap-5">

<img

src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name||"User")}&background=4f46e5&color=ffffff`}

className="w-20 h-20 rounded-full"

/>

<div>

<h3 className="text-xl font-bold">

{user?.name}

</h3>

<p className="text-secondary">

{user?.email}

</p>

</div>

</div>

<div>

<label className="block mb-2">

Full Name

</label>

<input

value={name}

onChange={(e)=>

setName(e.target.value)

}

className="w-full rounded-xl border border-default bg-surface-2 px-4 py-3 outline-none focus:border-indigo-500"

/>

</div>

<div>

<label className="block mb-2">

Email

</label>

<input

disabled

value={user?.email||""}

className="w-full rounded-xl border border-default bg-surface-2 px-4 py-3 text-secondary"

/>

</div>

<div>

<label className="block mb-2">

Role

</label>

<input

disabled

value="AI Engineer"

className="w-full rounded-xl border border-default bg-surface-2 px-4 py-3 text-secondary"

/>

</div>

<button

type="submit"

className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl text-primary font-semibold flex items-center gap-2"

>

<Save size={18}/>

Save Changes

</button>

</form>

</div>

)}
{/* ================= NOTIFICATIONS ================= */}

{activeTab === "notifications" && (

<div className="space-y-6">

<div className="rounded-2xl border border-default bg-surface p-8">

<h2 className="mb-6 text-2xl font-bold">

Notification Preferences

</h2>

{/* Email Notifications */}

<div className="mb-6 flex items-center justify-between rounded-xl border border-default bg-surface-2 p-5">

<div>

<h3 className="font-semibold">

Email Notifications

</h3>

<p className="mt-1 text-sm text-secondary">

Receive important updates via email.

</p>

</div>

<button
onClick={() =>
setEmailNotifications(
!emailNotifications
)
}
className={`relative h-7 w-14 rounded-full transition ${
emailNotifications
? "bg-green-500"
: "bg-gray-400"
}`}
>

<div
className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
emailNotifications
? "left-8"
: "left-1"
}`}
/>

</button>

</div>

{/* Desktop Notifications */}

<div className="mb-6 flex items-center justify-between rounded-xl border border-default bg-surface-2 p-5">

<div>

<h3 className="font-semibold">

Desktop Notifications

</h3>

<p className="mt-1 text-sm text-secondary">

Receive browser notifications for task updates.

</p>

</div>

<button
onClick={() =>
setDesktopNotifications(
!desktopNotifications
)
}
className={`relative h-7 w-14 rounded-full transition ${
desktopNotifications
? "bg-green-500"
: "bg-gray-400"
}`}
>

<div
className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
desktopNotifications
? "left-8"
: "left-1"
}`}
/>

</button>

</div>

{/* Theme */}

<div className="flex items-center justify-between rounded-xl border border-default bg-surface-2 p-5">

<div className="flex items-start gap-3">

<Moon
size={20}
className="mt-0.5 text-indigo-500"
/>

<div>

<h3 className="font-semibold">

Theme

</h3>

<p className="mt-1 text-sm text-secondary">

Switch between Dark and Light mode.

</p>

<p className="mt-2 text-xs font-medium capitalize text-indigo-500">

Current Theme: {theme}

</p>

</div>

</div>

<button
onClick={toggleTheme}
className={`relative h-7 w-14 rounded-full transition ${
theme === "dark"
? "bg-indigo-600"
: "bg-gray-400"
}`}
>

<div
className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
theme === "dark"
? "left-8"
: "left-1"
}`}
/>

</button>

</div>

</div>

</div>

)}
{/* ================= SECURITY ================= */}

{activeTab === "security" && (

<div className="space-y-8">

<div className="rounded-2xl border border-default bg-surface p-8">

<h2 className="mb-6 text-2xl font-bold">

Security

</h2>

<form
onSubmit={async (e) => {

e.preventDefault();

if (!currentPassword) {

notifyError("Current password is required.");

return;

}

if (!newPassword) {

notifyError("New password is required.");

return;

}

if (newPassword.length < 8) {

notifyError(
"Password must contain at least 8 characters."
);

return;

}

if (currentPassword === newPassword) {

notifyError(
"New password must be different from the current password."
);

return;

}

try {

setLoading(true);

await changePassword({

currentPassword,

newPassword,

});

notifySuccess(
"Password updated successfully."
);

setCurrentPassword("");

setNewPassword("");

} catch (error: any) {

notifyError(

error?.response?.data?.message ||

"Unable to update password."

);

} finally {

setLoading(false);

}

}}

className="space-y-6"
>

<div>

<label className="mb-2 block">

Current Password

</label>

<input

type="password"

value={currentPassword}

onChange={(e)=>

setCurrentPassword(e.target.value)

}

className="w-full rounded-xl border border-default bg-surface-2 px-4 py-3 outline-none focus:border-indigo-500"

/>

</div>

<div>

<label className="mb-2 block">

New Password

</label>

<input

type="password"

value={newPassword}

onChange={(e)=>

setNewPassword(e.target.value)

}

className="w-full rounded-xl border border-default bg-surface-2 px-4 py-3 outline-none focus:border-indigo-500"

/>

</div>

<button

type="submit"

disabled={loading}

className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-primary transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"

>

{loading ? (

<>

<Loader2
size={18}
className="animate-spin"
/>

Updating...

</>

) : (

<>

<Lock size={18} />

Update Password

</>

)}

</button>

</form>

</div>

{/* Logout */}

<div className="rounded-2xl border border-red-500/30 bg-surface p-8">

<h2 className="text-xl font-bold text-red-500">

Logout

</h2>

<p className="mt-2 text-secondary">

Sign out from your Pulse account on this device.

</p>

<button

onClick={handleLogout}

className="mt-6 flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-primary transition hover:bg-red-700"

>

<LogOut size={18}/>

Logout

</button>

</div>

</div>

)}
        </div>

      </div>

    </div>

  );

}