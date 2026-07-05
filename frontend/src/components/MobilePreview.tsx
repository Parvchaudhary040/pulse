import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import {
  BatteryFull,
  Wifi,
  CheckCircle2,
  Smartphone,
} from "lucide-react";

import {
  User,
  Task,
  Project,
  Notification,
  TaskStatus,
  Priority,
} from "../types";

interface MobilePreviewProps {
  currentTab: string;
  user: User;
  tasks: Task[];
  projects: Project[];
  notifications: Notification[];
  onToggleTaskStatus: (id: string) => void;
}

const APP_URL =
  import.meta.env.PROD
    ? "https://pulse-parv.vercel.app"
    : window.location.origin;

export default function MobilePreview({
  currentTab,
  user,
  tasks,
  projects,
  notifications,
  onToggleTaskStatus,
}: MobilePreviewProps) {
  const [synced, setSynced] = useState(true);

  useEffect(() => {
    setSynced(false);

    const timer = setTimeout(() => {
      setSynced(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [tasks, projects, notifications, currentTab]);

  const completedTasks = tasks.filter(
    (task) => task.status === TaskStatus.DONE
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="min-h-screen bg-app p-8">

      {/* Page Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-black text-primary">
          Mobile Preview
        </h1>

        <p className="mt-2 text-secondary">
          Live preview of Pulse on a mobile device.
        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[390px_1fr] gap-12">

        {/* ================================================= */}
        {/* PHONE */}
        {/* ================================================= */}

        <div className="flex justify-center">

          <div className="relative">

            {/* Phone Shadow */}

            <div className="absolute inset-0 scale-105 rounded-[52px] bg-black/15 blur-3xl dark:bg-black/50" />

            {/* Phone */}

            <div className="relative h-[760px] w-[360px] overflow-hidden rounded-[48px] border-[10px] border-neutral-900 bg-black shadow-2xl">

              {/* Dynamic Island */}

              <div className="absolute left-1/2 top-3 z-50 h-7 w-36 -translate-x-1/2 rounded-full bg-black" />

              {/* Screen */}

              <div className="flex h-full flex-col bg-app">

                {/* Status Bar */}

                <div className="flex items-center justify-between px-6 pt-4 pb-3">

                  <span className="text-xs font-semibold text-primary">
                    9:41
                  </span>

                  <div className="flex items-center gap-2">

                    <Wifi
                      size={15}
                      className="text-primary"
                    />

                    <BatteryFull
                      size={16}
                      className="text-primary"
                    />

                  </div>

                </div>

                {/* ================================================= */}
                {/* PHONE CONTENT STARTS HERE */}
                {/* ================================================= */}

                <div className="flex-1 overflow-y-auto px-5 pb-5">

                  {/* Greeting */}

                  <div className="mb-6">

                    <p className="text-sm text-secondary">
                      Good Morning 👋
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-primary">
                      {user.name}
                    </h2>

                    <p className="mt-2 text-sm text-secondary">
                      Welcome back to Pulse.
                    </p>

                  </div>

                  {/* Quick Stats */}

                  <div className="mb-6 grid grid-cols-2 gap-3">

                    <div className="rounded-2xl border border-default bg-surface p-4">

                      <p className="text-xs text-secondary">
                        Pending
                      </p>

                      <h3 className="mt-2 text-2xl font-black text-primary">
                        {pendingTasks}
                      </h3>

                    </div>

                    <div className="rounded-2xl border border-default bg-surface p-4">

                      <p className="text-xs text-secondary">
                        Completed
                      </p>

                      <h3 className="mt-2 text-2xl font-black text-primary">
                        {completedTasks}
                      </h3>

                    </div>

                  </div>

                  {/* Current Screen */}

                  <div className="mb-5">

                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">

                      {currentTab.charAt(0).toUpperCase() +
                        currentTab.slice(1)}

                    </span>

                  </div>

                  {/* ================================ */}
                  {/* DASHBOARD PREVIEW */}
                  {/* ================================ */}

                  {currentTab === "dashboard" && (

                    <>

                      <h3 className="mb-4 text-lg font-bold text-primary">
                        Today's Tasks
                      </h3>

                      <div className="space-y-3">

                        {tasks.length === 0 ? (

                          <div className="rounded-2xl border border-dashed border-default p-8 text-center text-secondary">
                            No tasks available.
                          </div>

                        ) : (

                          tasks.slice(0, 4).map((task) => (

                            <div
                              key={task.id}
                              className="rounded-2xl border border-default bg-surface p-4 shadow-sm transition-all"
                            >

                              <div className="flex items-start justify-between">

                                <div className="flex-1">

                                  <h4 className="font-semibold text-primary">
                                    {task.title}
                                  </h4>

                                  <p className="mt-1 line-clamp-2 text-xs text-secondary">
                                    {task.description}
                                  </p>

                                </div>

                                <button
                                  onClick={() =>
                                    onToggleTaskStatus(
                                      task.id.toString()
                                    )
                                  }
                                  className={`ml-3 h-5 w-5 rounded-full border-2 transition-all ${
                                    task.status === TaskStatus.DONE
                                      ? "border-emerald-500 bg-emerald-500"
                                      : "border-gray-400"
                                  }`}
                                />

                              </div>

                              <div className="mt-4 flex items-center justify-between">

                                <span
                                  className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                                    task.priority === Priority.URGENT
                                      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"

                                      : task.priority === Priority.HIGH
                                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"

                                      : task.priority === Priority.MEDIUM
                                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"

                                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                                  }`}
                                >
                                  {task.priority}
                                </span>

                                <span className="text-[11px] text-secondary">
                                  {task.status}
                                </span>

                              </div>

                            </div>

                          ))

                        )}

                      </div>

                    </>

                  )}

                  {/* ================================ */}
                  {/* BOARD PREVIEW */}
                  {/* ================================ */}

                  {currentTab === "board" && (

                    <>

                      <h3 className="mb-4 text-lg font-bold text-primary">
                        Sprint Board
                      </h3>

                      <div className="space-y-3">

                        {tasks.slice(0, 5).map((task) => (

                          <div
                            key={task.id}
                            className="rounded-2xl border border-default bg-surface p-4"
                          >

                            <div className="flex items-center justify-between">

                              <h4 className="font-semibold text-primary">
                                {task.title}
                              </h4>

                              <div
                                className={`h-3 w-3 rounded-full ${
                                  task.status === TaskStatus.DONE
                                    ? "bg-emerald-500"

                                    : task.status === TaskStatus.IN_PROGRESS
                                    ? "bg-amber-500"

                                    : task.status === TaskStatus.TODO
                                    ? "bg-blue-500"

                                    : "bg-slate-400"
                                }`}
                              />

                            </div>

                            <p className="mt-2 line-clamp-2 text-xs text-secondary">
                              {task.description}
                            </p>

                          </div>

                        ))}

                      </div>

                    </>

                  )}

                  {/* ================================ */}
                  {/* PROFILE PREVIEW */}
                  {/* ================================ */}

                  {currentTab === "profile" && (

                    <>

                      <div className="flex flex-col items-center">

                        <img
                          src={
                            user.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.name
                            )}&background=4f46e5&color=fff`
                          }
                          alt={user.name}
                          className="h-24 w-24 rounded-full border-4 border-indigo-600 object-cover"
                        />

                        <h3 className="mt-4 text-xl font-bold text-primary">
                          {user.name}
                        </h3>

                        <p className="mt-1 text-sm text-secondary">
                          {user.email}
                        </p>

                      </div>

                      <div className="mt-8 grid grid-cols-2 gap-3">

                        <div className="rounded-xl border border-default bg-surface p-4 text-center">

                          <p className="text-xs text-secondary">
                            Tasks
                          </p>

                          <h4 className="mt-2 text-2xl font-black text-primary">
                            {tasks.length}
                          </h4>

                        </div>

                        <div className="rounded-xl border border-default bg-surface p-4 text-center">

                          <p className="text-xs text-secondary">
                            Projects
                          </p>

                          <h4 className="mt-2 text-2xl font-black text-primary">
                            {projects.length}
                          </h4>

                        </div>

                      </div>

                    </>

                  )}

                  {/* ================================ */}
                  {/* TIMELINE PREVIEW */}
                  {/* ================================ */}

                  {currentTab === "timeline" && (

                    <>

                      <h3 className="mb-5 text-lg font-bold text-primary">
                        Project Timeline
                      </h3>

                      <div className="space-y-4">

                        {projects.slice(0, 4).map((project) => (

                          <div
                            key={project.id}
                            className="rounded-2xl border border-default bg-surface p-4"
                          >

                            <div className="flex items-center justify-between">

                              <h4 className="font-semibold text-primary">
                                {project.name}
                              </h4>

                              <span className="text-xs font-bold text-indigo-600">
                                {project.progress}%
                              </span>

                            </div>

                            <div className="mt-3 h-2 rounded-full bg-surface-2">

                              <div
                                className="h-2 rounded-full bg-indigo-600"
                                style={{
                                  width: `${project.progress}%`,
                                }}
                              />

                            </div>

                          </div>

                        ))}

                      </div>

                    </>

                  )}

                  {/* ================================ */}
                  {/* SETTINGS PREVIEW */}
                  {/* ================================ */}

                  {currentTab === "settings" && (

                    <>

                      <h3 className="mb-5 text-lg font-bold text-primary">
                        Settings
                      </h3>

                      <div className="space-y-3">

                        {[
                          "Appearance",
                          "Notifications",
                          "Security",
                          "Privacy",
                          "Account",
                        ].map((item) => (

                          <div
                            key={item}
                            className="flex items-center justify-between rounded-xl border border-default bg-surface p-4"
                          >

                            <span className="font-medium text-primary">
                              {item}
                            </span>

                            <span className="text-secondary">
                              ›
                            </span>

                          </div>

                        ))}

                      </div>

                    </>

                  )}

                  {/* ================================ */}
                  {/* MOBILE PREVIEW PAGE */}
                  {/* ================================ */}

                  {currentTab === "mobile" && (

                    <div className="flex h-full flex-col items-center justify-center text-center">

                      <Smartphone
                        size={60}
                        className="text-indigo-500"
                      />

                      <h2 className="mt-6 text-2xl font-bold text-primary">
                        Live Mobile Preview
                      </h2>

                      <p className="mt-3 max-w-xs text-secondary">
                        This phone reflects the same data
                        and state as your desktop
                        workspace.
                      </p>

                    </div>

                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* RIGHT PANEL */}
        {/* ================================================= */}

        <div className="space-y-6">

          {/* Live Status */}

          <div className="rounded-3xl border border-default bg-surface p-8">

            <h2 className="text-2xl font-bold text-primary">
              Live Preview
            </h2>

            <p className="mt-3 leading-7 text-secondary">

              This mobile preview shares the same
              React state as your desktop
              workspace. Any change made anywhere
              in Pulse appears here instantly.

            </p>

            <div className="mt-6 flex items-center gap-3">

              <div
                className={`h-3 w-3 rounded-full ${
                  synced
                    ? "bg-emerald-500"
                    : "bg-amber-500 animate-pulse"
                }`}
              />

              <span className="font-medium text-primary">

                {synced
                  ? "Live Sync Active"
                  : "Syncing Changes..."}

              </span>

            </div>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-2xl border border-default bg-surface p-5">

              <p className="text-sm text-secondary">
                Tasks
              </p>

              <h3 className="mt-2 text-3xl font-black text-primary">
                {tasks.length}
              </h3>

            </div>

            <div className="rounded-2xl border border-default bg-surface p-5">

              <p className="text-sm text-secondary">
                Projects
              </p>

              <h3 className="mt-2 text-3xl font-black text-primary">
                {projects.length}
              </h3>

            </div>

            <div className="rounded-2xl border border-default bg-surface p-5">

              <p className="text-sm text-secondary">
                Pending
              </p>

              <h3 className="mt-2 text-3xl font-black text-primary">
                {pendingTasks}
              </h3>

            </div>

            <div className="rounded-2xl border border-default bg-surface p-5">

              <p className="text-sm text-secondary">
                Notifications
              </p>

              <h3 className="mt-2 text-3xl font-black text-primary">
                {unreadNotifications}
              </h3>

            </div>

          </div>

                    {/* QR Code */}

          <div className="rounded-3xl border border-default bg-surface p-8">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold text-primary">
                Open on Your Phone
              </h2>

              <div
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  synced
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                }`}
              >
                {synced ? "Synced" : "Syncing"}
              </div>

            </div>

            <div className="mt-8 flex justify-center">

              <div className="rounded-2xl bg-white p-4 shadow-lg">

                <QRCode
                  value={APP_URL}
                  size={180}
                />

              </div>

            </div>

            <h3 className="mt-6 text-center text-lg font-bold text-primary">
              Scan QR Code
            </h3>

            <p className="mt-2 text-center text-sm text-secondary">

              After deployment, scan this QR code to
              instantly open Pulse on your mobile device.

            </p>

            <div className="mt-6 rounded-2xl border border-default bg-surface-2 p-4">

              <p className="text-xs uppercase tracking-wider text-secondary">

                Application URL

              </p>

              <p className="mt-2 break-all text-sm font-medium text-primary">

                {APP_URL}

              </p>

            </div>

          </div>

          {/* Current Session */}

          <div className="rounded-3xl border border-default bg-surface p-8">

            <h2 className="text-2xl font-bold text-primary">
              Current Session
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex items-center justify-between">

                <span className="text-secondary">
                  Logged in as
                </span>

                <span className="font-semibold text-primary">
                  {user.name}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-secondary">
                  Current Screen
                </span>

                <span className="capitalize font-semibold text-primary">
                  {currentTab}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-secondary">
                  Completed Tasks
                </span>

                <span className="font-semibold text-primary">
                  {completedTasks}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-secondary">
                  Pending Tasks
                </span>

                <span className="font-semibold text-primary">
                  {pendingTasks}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-secondary">
                  Projects
                </span>

                <span className="font-semibold text-primary">
                  {projects.length}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-secondary">
                  Notifications
                </span>

                <span className="font-semibold text-primary">
                  {unreadNotifications}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}