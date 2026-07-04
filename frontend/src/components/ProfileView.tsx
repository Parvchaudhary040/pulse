import React from "react";
import {
  User,
  Mail,
  Briefcase,
  CheckCircle2,
  Clock3,
  ListTodo,
  Layers,
  Award,
} from "lucide-react";

import {
  User as UserType,
  Task,
  TaskStatus,
  Priority,
} from "../types";

interface ProfileViewProps {
  user: UserType;
  tasks: Task[];
}

export default function ProfileView({
  user,
  tasks,
}: ProfileViewProps) {

  // ===========================
  // Statistics
  // ===========================

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === TaskStatus.DONE
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === TaskStatus.IN_PROGRESS
  ).length;

  const todoTasks = tasks.filter(
    (task) => task.status === TaskStatus.TODO
  ).length;

  const backlogTasks = tasks.filter(
    (task) => task.status === TaskStatus.BACKLOG
  ).length;

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  const skills =
    user.skills ?? [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Docker",
    ];

  const bio =
    user.bio ??
    "AI Engineer passionate about building scalable full-stack applications using React, Express, PostgreSQL and Docker.";

  const recentTasks = [...tasks]
    .reverse()
    .slice(0, 6);
      return (
        <div className="min-h-screen bg-app text-primary p-8">

          {/* Header */}

          <div className="rounded-3xl border border-default bg-surface p-8">

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

              {/* Avatar */}

              <img
                src={
                  user.avatar ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(user.name) +
                    "&background=4f46e5&color=fff&size=256"
                }
                alt={user.name}
                className="w-36 h-36 rounded-full border-4 border-indigo-600 object-cover"
              />

              {/* User Details */}

              <div className="flex-1">

                <h1 className="text-4xl font-black">
                  {user.name}
                </h1>

                <div className="mt-3 flex flex-wrap gap-6 text-secondary">

                  <div className="flex items-center gap-2">
                    <Mail size={18} />
                    {user.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase size={18} />
                    {user.role}
                  </div>

                </div>

                <p className="mt-6 text-gray-300 leading-7 max-w-3xl">
                  {bio}
                </p>

              </div>

            </div>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-8">

            <div className="rounded-2xl bg-surface border border-default p-5">

              <ListTodo
                className="text-indigo-400 mb-3"
                size={22}
              />

              <p className="text-secondary text-sm">
                Total Tasks
              </p>

              <h2 className="text-3xl font-black mt-2">
                {totalTasks}
              </h2>

            </div>

            <div className="rounded-2xl bg-surface border border-default p-5">

              <CheckCircle2
                className="text-green-400 mb-3"
                size={22}
              />

              <p className="text-secondary text-sm">
                Completed
              </p>

              <h2 className="text-3xl font-black mt-2">
                {completedTasks}
              </h2>

            </div>

            <div className="rounded-2xl bg-surface border border-default p-5">

              <Clock3
                className="text-yellow-400 mb-3"
                size={22}
              />

              <p className="text-secondary text-sm">
                In Progress
              </p>

              <h2 className="text-3xl font-black mt-2">
                {inProgressTasks}
              </h2>

            </div>

            <div className="rounded-2xl bg-surface border border-default p-5">

              <Layers
                className="text-blue-400 mb-3"
                size={22}
              />

              <p className="text-secondary text-sm">
                Todo
              </p>

              <h2 className="text-3xl font-black mt-2">
                {todoTasks}
              </h2>

            </div>

            <div className="rounded-2xl bg-surface border border-default p-5">

              <Award
                className="text-purple-400 mb-3"
                size={22}
              />

              <p className="text-secondary text-sm">
                Completed %
              </p>

              <h2 className="text-3xl font-black mt-2">
                {completionPercentage}%
              </h2>

            </div>

          </div>
          {/* Bottom Section */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

            {/* Skills */}

            <div className="rounded-2xl border border-default bg-surface p-6">

              <h2 className="text-xl font-bold mb-5">
                Skills
              </h2>

              <div className="flex flex-wrap gap-3">

                {skills.map((skill, index) => (

                  <span
                    key={index}
                    className="px-3 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500 text-indigo-300 text-sm font-medium"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>
            {/* Recent Tasks */}
            <div className="lg:col-span-2 rounded-2xl border border-default bg-surface p-6">

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <h2 className="text-3xl font-bold text-primary">
                    Recent Tasks
                  </h2>

                  <p className="mt-1 text-secondary">
                    Tasks recently assigned to you.
                  </p>

                </div>

              </div>

              <div className="space-y-4">

                {tasks.length === 0 ? (

                  <div className="rounded-2xl border border-dashed border-default p-10 text-center text-secondary">
                    No tasks assigned yet.
                  </div>

                ) : (

                  recentTasks.map((task) => (

                    <div
                      key={task.id}
                      className="flex items-center justify-between rounded-2xl border border-default bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >

                      <div>

                        <h3 className="text-lg font-semibold text-primary">
                          {task.title}
                        </h3>

                        <p className="mt-1 text-sm text-secondary">
                          {task.description}
                        </p>

                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            task.status === TaskStatus.TODO
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                              : task.status === TaskStatus.IN_PROGRESS
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200"
                              : task.status === TaskStatus.DONE
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {task.status}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            task.priority === Priority.URGENT
                              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                              : task.priority === Priority.HIGH
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200"
                              : task.priority === Priority.MEDIUM
                              ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200"
                          }`}
                        >
                          {task.priority}
                        </span>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>
          </div>

        </div>
    );
}