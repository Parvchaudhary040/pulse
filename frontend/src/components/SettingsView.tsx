import React, { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Moon,
  LogOut,
  Save,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import {
  notifySuccess,
  notifyInfo,
} from "../services/notificationService";

interface SettingsViewProps {
  onUpdateUserName: (name: string) => void;
}

export default function SettingsView({
  onUpdateUserName,
}: SettingsViewProps) {

  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "account" | "notifications" | "security"
  >("account");

  const [name, setName] = useState(
    user?.name || ""
  );

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [desktopNotifications, setDesktopNotifications] =
    useState(true);

  const [darkTheme] = useState(true);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const handleSaveProfile = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!name.trim()) return;

    onUpdateUserName(name);

    notifySuccess(
      "Profile updated successfully."
    );

  };

  const handlePassword = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    notifyInfo(
      "Password update will be connected to the backend soon."
    );

    setCurrentPassword("");

    setNewPassword("");

  };

  const handleLogout = () => {

    logout();

    window.location.reload();

  };

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

  return (
    <div className="min-h-screen bg-[#0b0c10] p-8 text-white">

      <h1 className="text-4xl font-black">
        Settings
      </h1>

      <p className="text-gray-400 mt-2">
        Manage your Pulse account preferences.
      </p>

      <div className="mt-8 grid grid-cols-12 gap-8">

        {/* Sidebar */}

        <div className="col-span-3">

          <div className="rounded-2xl border border-gray-800 bg-[#12131a] p-3">

            {tabs.map((tab) => {

              const Icon = tab.icon;

              return (

                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(tab.id as any)
                  }
                  className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-gray-800"
                  }`}
                >

                  <Icon size={18} />

                  {tab.label}

                </button>

              );

            })}

          </div>

        </div>

        {/* Content */}

        <div className="col-span-9">
          {/* ================= ACCOUNT ================= */}
          {activeTab === "account" && (

            <div className="rounded-2xl border border-gray-800 bg-[#12131a] p-8">

              <h2 className="text-2xl font-bold mb-6">
                Account Information
              </h2>

              <form
                onSubmit={handleSaveProfile}
                className="space-y-6"
              >

                {/* Avatar */}

                <div className="flex items-center gap-5">

                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.name || "User"
                    )}&background=4f46e5&color=ffffff&size=256`}
                    alt={user?.name}
                    className="w-20 h-20 rounded-full border-2 border-indigo-600"
                  />

                  <div>

                    <h3 className="text-lg font-semibold">
                      {user?.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {user?.email}
                    </p>

                  </div>

                </div>

                {/* Name */}

                <div>

                  <label className="block mb-2 text-sm text-gray-300">

                    Full Name

                  </label>

                  <input
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-700 bg-[#0b0c10] px-4 py-3 outline-none focus:border-indigo-500"
                  />

                </div>

                {/* Email */}

                <div>

                  <label className="block mb-2 text-sm text-gray-300">

                    Email Address

                  </label>

                  <input
                    value={user?.email || ""}
                    disabled
                    className="w-full rounded-xl border border-gray-700 bg-[#090a0d] px-4 py-3 text-gray-500"
                  />

                  <p className="mt-2 text-xs text-gray-500">

                    Email is managed through your account.

                  </p>

                </div>

                {/* Role */}

                <div>

                  <label className="block mb-2 text-sm text-gray-300">

                    Role

                  </label>

                  <input
                    value="AI Engineer"
                    disabled
                    className="w-full rounded-xl border border-gray-700 bg-[#090a0d] px-4 py-3 text-gray-500"
                  />

                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-700"
                >

                  <Save size={18} />

                  Save Changes

                </button>

              </form>

            </div>

          )}
          {/* ================= NOTIFICATIONS ================= */}

          {activeTab === "notifications" && (

            <div className="rounded-2xl border border-gray-800 bg-[#12131a] p-8">

              <h2 className="text-2xl font-bold mb-6">
                Notification Preferences
              </h2>

              <div className="space-y-6">

                {/* Email Notifications */}

                <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-[#0b0c10] p-5">

                  <div>

                    <h3 className="font-semibold">
                      Email Notifications
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                      Receive important updates through email.
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setEmailNotifications(
                        !emailNotifications
                      )
                    }
                    className={`w-12 h-7 rounded-full transition ${
                      emailNotifications
                        ? "bg-green-500"
                        : "bg-gray-700"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white mt-1 transition-transform ${
                        emailNotifications
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>

                </div>

                {/* Desktop Notifications */}

                <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-[#0b0c10] p-5">

                  <div>

                    <h3 className="font-semibold">
                      Desktop Notifications
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                      Show browser notifications for task updates.
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setDesktopNotifications(
                        !desktopNotifications
                      )
                    }
                    className={`w-12 h-7 rounded-full transition ${
                      desktopNotifications
                        ? "bg-green-500"
                        : "bg-gray-700"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white mt-1 transition-transform ${
                        desktopNotifications
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>

                </div>

                {/* Theme */}

                <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-[#0b0c10] p-5">

                  <div>

                    <div className="flex items-center gap-2">

                      <Moon size={18} />

                      <h3 className="font-semibold">
                        Dark Theme
                      </h3>

                    </div>

                    <p className="text-sm text-gray-400 mt-1">
                      Pulse currently uses the dark theme.
                    </p>

                  </div>

                  <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold">
                    Enabled
                  </span>

                </div>

              </div>

            </div>
          )}
          {/* ================= SECURITY ================= */}

          {activeTab === "security" && (

            <div className="space-y-8">

              {/* Password */}

              <div className="rounded-2xl border border-gray-800 bg-[#12131a] p-8">

                <h2 className="text-2xl font-bold mb-6">
                  Security
                </h2>

                <form
                  onSubmit={handlePassword}
                  className="space-y-6"
                >

                  <div>

                    <label className="block mb-2 text-sm text-gray-300">
                      Current Password
                    </label>

                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) =>
                        setCurrentPassword(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-gray-700 bg-[#0b0c10] px-4 py-3 outline-none focus:border-indigo-500"
                    />

                  </div>

                  <div>

                    <label className="block mb-2 text-sm text-gray-300">
                      New Password
                    </label>

                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-gray-700 bg-[#0b0c10] px-4 py-3 outline-none focus:border-indigo-500"
                    />

                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-700"
                  >
                    Update Password
                  </button>

                </form>

              </div>

              {/* Logout */}

              <div className="rounded-2xl border border-red-900 bg-[#12131a] p-8">

                <h2 className="text-xl font-bold text-red-400">
                  Logout
                </h2>

                <p className="mt-2 text-gray-400">
                  Sign out from your Pulse account on this device.
                </p>

                <button
                  onClick={handleLogout}
                  className="mt-6 flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
                >

                  <LogOut size={18} />

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