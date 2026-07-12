import React from "react";
import {
  CheckCircle2,
  Clock,
  FolderKanban,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Task,
  Project,
  ActivityLog,
  TaskStatus,
  Priority,
  AIWorkspaceInsight,
} from "../types";

import AIInsightsCard from "./AIInsightsCard";

interface DashboardViewProps {
  tasks: Task[];
  projects: Project[];
  activityLogs: ActivityLog[];
  aiInsight: AIWorkspaceInsight | null;
  aiLoading: boolean;

  dashboardStats: {
    totalTasks: number;
    completedTasks: number;
    activeProjects: number;
    completionRate: number;
  };

  onToggleTaskStatus: (id: string) => void;
  onOpenTaskModal: () => void;
}

export default function DashboardView({
  tasks,
  projects,
  activityLogs,
  dashboardStats,
  aiInsight,
  aiLoading,
  onToggleTaskStatus,
  onOpenTaskModal,
}: DashboardViewProps) {

  /* ==============================
      ANALYTICS
  ============================== */

  const completedTasks = tasks.filter(
    task => task.status === TaskStatus.DONE
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  const backlogTasks = tasks.filter(
    task => task.status === TaskStatus.BACKLOG
  ).length;

  const todoTasks = tasks.filter(
    task => task.status === TaskStatus.TODO
  ).length;

  const progressTasks = tasks.filter(
    task => task.status === TaskStatus.IN_PROGRESS
  ).length;

  const urgentTasks = tasks.filter(
    task => task.priority === Priority.URGENT
  ).length;

  const highTasks = tasks.filter(
    task => task.priority === Priority.HIGH
  ).length;

  const mediumTasks = tasks.filter(
    task => task.priority === Priority.MEDIUM
  ).length;

  const lowTasks = tasks.filter(
    task => task.priority === Priority.LOW
  ).length;

  const overdueTasks = tasks.filter(task => {

    if (!task.dueDate) return false;

    return (
      new Date(task.dueDate) < new Date() &&
      task.status !== TaskStatus.DONE
    );

  }).length;

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks / tasks.length) * 100
        );

  const productivityScore = Math.min(
    100,
    Math.round(
      completionRate * 0.7 +
      projects.length * 5
    )
  );

  /* ==============================
      CHART DATA
  ============================== */

  const statusData = [
    {
      name: "Backlog",
      value: backlogTasks,
    },
    {
      name: "Todo",
      value: todoTasks,
    },
    {
      name: "Progress",
      value: progressTasks,
    },
    {
      name: "Done",
      value: completedTasks,
    },
  ];

  const priorityData = [
    {
      name: "Urgent",
      value: urgentTasks,
      color: "#ef4444",
    },
    {
      name: "High",
      value: highTasks,
      color: "#f97316",
    },
    {
      name: "Medium",
      value: mediumTasks,
      color: "#6366f1",
    },
    {
      name: "Low",
      value: lowTasks,
      color: "#10b981",
    },
  ];

  const analytics = {
    totalTasks: tasks.length,
    completedTasks,
    pendingTasks,
    completionRate,
    overdueTasks,
    activeProjects: projects.length,
    productivityScore,
  };

  const currentUser =
    JSON.parse(
      localStorage.getItem("pulse_user") || "{}"
    );
  return (
  <div className="space-y-8 p-6 bg-app min-h-screen text-primary">

    {/* ==========================================
        HEADER
    =========================================== */}

    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-black">
          Welcome back,
          {" "}
          {currentUser.name || "User"}
        </h1>

        <p className="mt-2 text-secondary">

          Here's what's happening in your workspace today.

        </p>

      </div>

      <button
        onClick={onOpenTaskModal}
        className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700"
      >
        New Task
      </button>

    </div>

    {/* ==========================================
        KPI CARDS
    =========================================== */}

    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

      {/* Total */}

      <div className="rounded-2xl border border-default bg-surface p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-secondary">

              Total Tasks

            </p>

            <h2 className="mt-3 text-4xl font-black">

              {analytics.totalTasks}

            </h2>

          </div>

          <FolderKanban
            className="text-indigo-500"
            size={34}
          />

        </div>

      </div>

      {/* Completed */}

      <div className="rounded-2xl border border-default bg-surface p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-secondary">

              Completed

            </p>

            <h2 className="mt-3 text-4xl font-black text-green-500">

              {analytics.completedTasks}

            </h2>

          </div>

          <CheckCircle2
            className="text-green-500"
            size={34}
          />

        </div>

      </div>

      {/* Pending */}

      <div className="rounded-2xl border border-default bg-surface p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-secondary">

              Pending

            </p>

            <h2 className="mt-3 text-4xl font-black text-orange-500">

              {analytics.pendingTasks}

            </h2>

          </div>

          <Clock
            className="text-orange-500"
            size={34}
          />

        </div>

      </div>

      {/* Productivity */}

      <div className="rounded-2xl border border-default bg-surface p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-secondary">

              Productivity

            </p>

            <h2 className="mt-3 text-4xl font-black text-indigo-500">

              {analytics.productivityScore}%

            </h2>

          </div>

          <TrendingUp
            className="text-indigo-500"
            size={34}
          />

        </div>

      </div>

    </div>

    {/* AI Insights */}

    <AIInsightsCard
      insight={aiInsight}
      loading={aiLoading}
    />

    {/* ==========================================
        CHARTS
    =========================================== */}

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

      {/* STATUS */}

      <div className="xl:col-span-2 rounded-2xl border border-default bg-surface p-6">

        <h2 className="mb-6 text-2xl font-bold">

          Task Status

        </h2>

        <div className="h-80">

          <ResponsiveContainer>

            <BarChart
              data={statusData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[8,8,0,0]}
                fill="#6366f1"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* PIE */}

      <div className="rounded-2xl border border-default bg-surface p-6">

        <h2 className="mb-6 text-2xl font-bold">

          Priority

        </h2>

        <div className="h-80">

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={priorityData}
                dataKey="value"
                outerRadius={95}
                innerRadius={55}
              >

                {priorityData.map((entry,index)=>(
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
    {/* ==========================================
    BOTTOM SECTION
    =========================================== */}
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

      {/* Recent Activity */}

      <div className="rounded-2xl border border-default bg-surface p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Recent Activity
        </h2>

        {activityLogs.length === 0 ? (

          <div className="rounded-xl border border-dashed border-default p-8 text-center text-secondary">

            No activity yet.

          </div>

        ) : (

          <div className="space-y-4">

            {activityLogs.slice(0,5).map((log) => (

              <div
                key={log.id}
                className="rounded-xl border border-default bg-surface-2 p-4"
              >

                <p className="font-semibold">
                  {log.action}
                </p>

                <p className="mt-1 text-sm text-secondary">
                  {log.description}
                </p>

                <p className="mt-2 text-xs text-secondary">
                  {log.createdAt}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Upcoming Deadlines */}

      <div className="rounded-2xl border border-default bg-surface p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Upcoming Deadlines
        </h2>

        <div className="space-y-4">

          {tasks
            .filter(task => task.status !== TaskStatus.DONE)
            .sort((a,b)=>
              new Date(a.dueDate || "").getTime() -
              new Date(b.dueDate || "").getTime()
            )
            .slice(0,5)
            .map(task=>(

              <div
                key={task.id}
                className="rounded-xl border border-default bg-surface-2 p-4"
              >

                <div className="flex items-center justify-between">

                  <span className="font-semibold">
                    {task.title}
                  </span>

                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
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

                </div>

                <p className="mt-2 text-sm text-secondary">

                  {task.dueDate || "No deadline"}

                </p>

              </div>

            ))}

        </div>

      </div>

    </div>

  </div>

  );
  }