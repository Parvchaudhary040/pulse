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
        <div className="min-h-screen bg-[#0b0c10] text-white p-8">

          {/* Header */}

          <div className="rounded-3xl border border-gray-800 bg-[#12131a] p-8">

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

                <div className="mt-3 flex flex-wrap gap-6 text-gray-400">

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

            <div className="rounded-2xl bg-[#12131a] border border-gray-800 p-5">

              <ListTodo
                className="text-indigo-400 mb-3"
                size={22}
              />

              <p className="text-gray-400 text-sm">
                Total Tasks
              </p>

              <h2 className="text-3xl font-black mt-2">
                {totalTasks}
              </h2>

            </div>

            <div className="rounded-2xl bg-[#12131a] border border-gray-800 p-5">

              <CheckCircle2
                className="text-green-400 mb-3"
                size={22}
              />

              <p className="text-gray-400 text-sm">
                Completed
              </p>

              <h2 className="text-3xl font-black mt-2">
                {completedTasks}
              </h2>

            </div>

            <div className="rounded-2xl bg-[#12131a] border border-gray-800 p-5">

              <Clock3
                className="text-yellow-400 mb-3"
                size={22}
              />

              <p className="text-gray-400 text-sm">
                In Progress
              </p>

              <h2 className="text-3xl font-black mt-2">
                {inProgressTasks}
              </h2>

            </div>

            <div className="rounded-2xl bg-[#12131a] border border-gray-800 p-5">

              <Layers
                className="text-blue-400 mb-3"
                size={22}
              />

              <p className="text-gray-400 text-sm">
                Todo
              </p>

              <h2 className="text-3xl font-black mt-2">
                {todoTasks}
              </h2>

            </div>

            <div className="rounded-2xl bg-[#12131a] border border-gray-800 p-5">

              <Award
                className="text-purple-400 mb-3"
                size={22}
              />

              <p className="text-gray-400 text-sm">
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

            <div className="rounded-2xl border border-gray-800 bg-[#12131a] p-6">

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

            <div className="lg:col-span-2 rounded-2xl border border-gray-800 bg-[#12131a] p-6">

              <h2 className="text-xl font-bold mb-5">
                Recent Tasks
              </h2>

              <div className="space-y-4">

                {recentTasks.length === 0 ? (

                  <div className="text-center py-12 text-gray-500">

                    No tasks available.

                  </div>

                ) : (

                  recentTasks.map((task) => (

                    <div
                      key={task.id}
                      className="flex items-center justify-between rounded-xl border border-gray-700 bg-[#0f1015] px-5 py-4"
                    >

                      <div>

                        <h3 className="font-semibold text-white">
                          {task.title}
                        </h3>

                        <p className="text-sm text-gray-400 mt-1">
                          {task.description}
                        </p>

                      </div>

                      <div className="flex flex-col items-end gap-2">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            task.status === TaskStatus.DONE
                              ? "bg-green-600/20 text-green-400"

                              : task.status === TaskStatus.IN_PROGRESS
                              ? "bg-yellow-600/20 text-yellow-400"

                              : task.status === TaskStatus.TODO
                              ? "bg-blue-600/20 text-blue-400"

                              : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {task.status.replace("_", " ")}
                        </span>

                        <span
                          className="text-xs text-indigo-300"
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