import AIChatPanel from "./components/AI/AIChatPanel";
import { useAI } from "./hooks/useAI";
import { useWorkspaceContext } from "./hooks/useWorkspaceContext";
import * as activityService from "./services/activityService";
import * as dashboardService from "./services/dashboardService";
import * as projectService from "./services/projectService";
import ProjectTimelinePage from "./pages/ProjectTimelinePage";
import * as taskService from "./services/taskService";
import ProjectModal from "./components/ProjectModal";
import ProjectsView from "./components/ProjectsView";
import { useTheme } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  notifyError,
  notifyInfo,
} from "./services/notificationService";
import React, { useState, useEffect } from "react";
import {
  projects as seedProjects,
} from "./data";
import { Task, TaskStatus, Project, ActivityLog, Notification, Priority } from "./types";
// Inner-components imports
import LandingPage from "./components/LandingPage";
import SimpleLoginSignup from "./components/SimpleLoginSignup";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardView from "./components/DashboardView";
import ProjectBoardView from "./components/ProjectBoardView";
import ProfileView from "./components/ProfileView";
import SettingsView from "./components/SettingsView";
import MobilePreview from "./components/MobilePreview";
import TaskModal from "./components/TaskModal";
import { useAuth } from "./context/AuthContext";
// ======================
// APP COMPONENT
// ======================
export default function App() {
// ======================
// APPLICATION STATE
// ======================
  const {
  isOpen: isAIOpen,
  toggleAI,
  closeAI,
} = useAI();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [dashboardStats, setDashboardStats] =
  useState({
    totalTasks: 0,
    completedTasks: 0,
    activeProjects: 0,
    completionRate: 0,
  });
  // Session Authentication state
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    isSignUpMode: boolean;
    isLandingMode: boolean;
    email: string;
  }>(() => {
    const savedAuth = localStorage.getItem("pulse_auth");
    if (savedAuth) {
      try {
        return JSON.parse(savedAuth);
      } catch (e) {
        // Fallback
      }
    }
    return {
      isAuthenticated: false,
      isSignUpMode: false,
      isLandingMode: true,
      email: ""
    };
  });

  // Active workspace navbar tab
  const [currentTab, setCurrentTab] = useState<string>(() => {
    return localStorage.getItem("pulse_last_tab") || "dashboard";
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  // Load / Persist Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] =
    useState<number | null>(null);
  const visibleTasks =
    selectedProjectId === null
      ? tasks
      : tasks.filter(
          task => task.project_id === selectedProjectId
        );
  // Load / Persist Activities
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  // Load / Persist Alerts
  const [notifications, setNotifications] = useState<Notification[]>([]);
  // Task Creator Modal indicators
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  // Profile username edits in settings
  const [userName, setUserName] = useState(() => {
  const savedUser = localStorage.getItem("pulse_user");

  if (savedUser) {
    try {
      return JSON.parse(savedUser).name;
    } catch {
      return "User";
    }
  }

  return "User";
});
  const workspaceContext =
    useWorkspaceContext({

      userName,

      tasks,

      projects,

      activities: activityLogs,

      dashboard: dashboardStats,

  });

// ======================
// DATA LOADER FUNCTIONS
// ======================

const loadTasks = async () => {
  try {
    const response = await taskService.getTasks();
    setTasks(response.tasks || []);
  } catch (error) {
    console.error("Failed to load tasks", error);
    setTasks([]);
  }
};

const loadProjects = async () => {
  try {
    const response = await projectService.getProjects();
    console.log("Projects API Response:", response);
    setProjects(response.projects || []);
  } catch (error) {
    console.error("Failed to load projects", error);
    setProjects([]);
  }
};
console.log("Projects:", projects);

const loadActivities = async () => {
  try {
    const response = await activityService.getActivities();
    setActivityLogs(response.activities || []);
  } catch (error) {
    console.error("Failed to load activities", error);
    setActivityLogs([]);
  }
};

const loadDashboard = async () => {
  try {
    const response = await dashboardService.getStats();
    setDashboardStats(response.stats);
  } catch (error) {
    console.error("Failed to load dashboard", error);
  }
};

const loadAllData = async () => {
  await Promise.all([
    loadTasks(),
    loadProjects(),
    loadActivities(),
    loadDashboard(),
  ]);
};
// ======================
// EFFECTS
// ======================
useEffect(() => {
  loadProjects();
}, []);

useEffect(() => {
  loadActivities();
}, []);

useEffect(() => {
  loadDashboard();
}, []);

useEffect(() => {
  if (!authState.isAuthenticated) {
    setTasks([]);
    return;
  }

  loadTasks();
}, [authState.isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("pulse_auth", JSON.stringify(authState));
  }, [authState]);

  useEffect(() => {
    localStorage.setItem("pulse_last_tab", currentTab);
  }, [currentTab]);
  useEffect(() => {
  // Automatically re-calculate overall progress
  const projTasks = tasks.filter(
    t => t.projectId === "proj-1"
  );

  const completedProjTasks = projTasks.filter(
    t => t.status === TaskStatus.DONE
  );

  const progressPercent =
    projTasks.length > 0
      ? Math.round(
          (completedProjTasks.length / projTasks.length) * 100
        )
      : 0;

  setProjects(prev =>
    prev.map(p => {
      if (p.id === selectedProjectId) {
        return {
          ...p,
          progress: progressPercent,
        };
      }

      return p;
    })
  );
}, [tasks]);
// ======================
// AUTHENTICATION
// ======================
const handleLoginSuccess = async (email: string) => {
  setAuthState({
    isAuthenticated: true,
    isSignUpMode: false,
    isLandingMode: false,
    email,
  });

  setCurrentTab("dashboard");

  // Load all user data immediately
  await loadAllData();
};

const handleLogout = () => {
  setAuthState({
    isAuthenticated: false,
    isSignUpMode: false,
    isLandingMode: true,
    email: "",
  });

  // Clear React state
  setTasks([]);
  setProjects([]);
  setActivityLogs([]);
  setNotifications([]);

  setDashboardStats({
    totalTasks: 0,
    completedTasks: 0,
    activeProjects: 0,
    completionRate: 0,
  });

  localStorage.removeItem("pulse_auth");
  localStorage.removeItem("pulse_last_tab");
  localStorage.removeItem("pulse_token");
  localStorage.removeItem("pulse_user");
};
  const handleToggleAuthMode = () => {
    setAuthState(prev => ({
      ...prev,
      isSignUpMode: !prev.isSignUpMode
    }));
  };

  // Notification Operations
  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Task operations: Adding & Modifying cards
  const handleOpenNewTaskModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTaskModal = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };
// ======================
// TASK MANAGEMENT
// ======================
const handleSaveTask = async (
  taskData: Omit<Task, "id" | "createdAt"> & {
    id?: string;
  }
) => {
  try {

    if (taskData.id) {

      // =====================
      // UPDATE TASK
      // =====================

      await taskService.updateTask(
        Number(taskData.id),
        {
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          priority: taskData.priority,

          project_id: taskData.project_id || null,
          due_date: taskData.due_date || null,
        }
      );

      await activityService.createActivity({
        user_name: userName,
        action: "updated task",
        target_type: "task",
        target_name: taskData.title,
        details: `Updated "${taskData.title}"`,
      });

    } else {

      // =====================
      // CREATE TASK
      // =====================

      await taskService.createTask({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        project_id: taskData.project_id || null,
        due_date: taskData.due_date || null,
      });

      await activityService.createActivity({
        user_name: userName,
        action: "created task",
        target_type: "task",
        target_name: taskData.title,
        details: `Created "${taskData.title}"`,
      });

    }

    // =====================
    // REFRESH EVERYTHING
    // =====================

    await loadTasks();

    await loadDashboard();

    await loadActivities();
    notifyInfo("Task status updated.");

    setEditingTask(null);

    setIsTaskModalOpen(false);

  } catch (error) {

    console.error(error);

    notifyError("Failed to save task");

  }
};
const handleDeleteTask = async (task: Task) => {
  const confirmed = window.confirm(
    `Delete "${task.title}"?`
  );

  if (!confirmed) return;

  try {
    await taskService.deleteTask(Number(task.id));

    await loadTasks();
    await loadActivities();
    await loadDashboard();

    notifySuccess("Task deleted");

  } catch (error) {
    console.error(error);

    notifyError("Failed to delete task");
  }
};
const handleSaveProject = async (
  projectData: {
    id?: number;
    name: string;
    description: string;
    status: string;
  }
) => {
  try {

    if (projectData.id) {

      // UPDATE

      await projectService.updateProject(
        projectData.id,
        {
          name: projectData.name,
          description: projectData.description,
          status: projectData.status,
        }
      );

    } else {

      // CREATE

      const response =
        await projectService.createProject({
          name: projectData.name,
          description: projectData.description,
          status: projectData.status,
        });

      if (response.project) {
        setSelectedProjectId(
          Number(response.project.id)
        );
      }

    }

    await loadProjects();

    setCurrentTab("board");

    setEditingProject(null);

    setIsProjectModalOpen(false);

  } catch (error) {

    console.error(error);

    notifyError("Failed to save project");

  }
};
const handleEditProject = (
  project: Project
) => {

  setEditingProject(project);

  setIsProjectModalOpen(true);

};
const handleDeleteProject = async (
  project: Project
) => {

  const confirmed = window.confirm(
    `Delete "${project.name}"?`
  );

  if (!confirmed) return;

  try {

    await projectService.deleteProject(
      Number(project.id)
    );

    if (
      selectedProjectId === Number(project.id)
    ) {
      setSelectedProjectId(null);
    }

    await loadProjects();

  } catch (error) {

    console.error(error);

    notifyError("Failed to delete project");

  }

};
const handleUpdateTaskStatus = async (
  id: number,
  nextStatus: TaskStatus
) => {
  try {
    const targetTask = tasks.find(
      (t) => Number(t.id) === Number(id)
    );

    if (!targetTask) return;

    await taskService.updateTask(id, {
      title: targetTask.title,
      description: targetTask.description,
      status: nextStatus,
      priority: targetTask.priority,
      project_id: targetTask.project_id,
      due_date: targetTask.due_date,
    });

    // Reload everything from PostgreSQL
    await loadTasks();
    await loadProjects();
    await loadDashboard();
    await loadActivities();
    notifyInfo("Task status updated.");

  } catch (error) {
    console.error(error);
    notifyError("Failed to update task status");
  }
};

const handleToggleTaskStatusCheckbox = async (
  id: string
) => {
  try {
    const task = tasks.find(
      (t) => String(t.id) === String(id)
    );

    if (!task) return;

    const nextStatus =
      task.status === TaskStatus.DONE
        ? TaskStatus.TODO
        : TaskStatus.DONE;

    await taskService.updateTask(
      Number(id),
      {
        title: task.title,
        description: task.description,
        status: nextStatus,
        priority: task.priority,
      }
    );

    const response =
      await taskService.getTasks();

    setTasks(response.tasks);

    const log: ActivityLog = {
      id: "log-" + Date.now(),
      userId: "user-1",
      userName: userName,
      userAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
      action:
        nextStatus === TaskStatus.DONE
          ? "completed task"
          : "reopened task",
      targetType: "task",
      targetName: task.title,
      timestamp: "Just now",
      details:
        nextStatus === TaskStatus.DONE
          ? "Marked checkbox status as accomplished."
          : "Re-routed coordinate back to active column."
    };

    setActivityLogs(prev => [log, ...prev]);

  } catch (error) {
    console.error(error);
    notifyError("Failed to update task status");
  }
};
  // Activity additions: posting milestone logs
  const handleAddActivityLog = (details: string) => {
    const newLog: ActivityLog = {
      id: "log-" + Date.now(),
      userId: "user-1",
      userName: userName,
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
      action: "posted milestone highlight on",
      targetType: "project",
      targetName: "Mobile App Revamp",
      timestamp: "Just now",
      details
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };
  const handleUpdateUserNameInSettings = (name: string) => {
    setUserName(name);
  };
// ======================
// RENDER HELPERS
// ======================
  console.log("Current Tab:", currentTab);
  const renderTabContent = () => {
    const primaryRevampProject = projects.find(p => p.id === selectedProjectId) || projects[0];

    switch (currentTab) {
      case "dashboard":
        return (
          <DashboardView
            tasks={visibleTasks}
            projects={projects}
            activityLogs={activityLogs}
            dashboardStats={dashboardStats}
            onToggleTaskStatus={handleToggleTaskStatusCheckbox}
            onOpenTaskModal={handleOpenNewTaskModal}
          />
        );
// ======================
// APPLICATION UI
// ======================
      case "board":
        return (
          <ProjectBoardView
            tasks={visibleTasks}
            onAddTask={handleOpenNewTaskModal}
            onEditTask={handleOpenEditTaskModal}
            onDeleteTask={handleDeleteTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
          />
        );
      case "projects":
        return (
          <ProjectsView
            projects={projects}
            tasks={tasks}
          />
        );
      case "timeline":
        return <ProjectTimelinePage />;
      case "profile":
        return (
            <ProfileView
              user={user!}
              tasks={visibleTasks}
            />
          );
      case "settings":
        return (
          <SettingsView
            onUpdateUserName={handleUpdateUserNameInSettings}
          />
        );
      case "mobile":
        return (
          <MobilePreview
            currentTab={currentTab}
            user={user!}
            tasks={visibleTasks}
            projects={projects}
            notifications={notifications}
            onToggleTaskStatus={handleToggleTaskStatusCheckbox}
          />
        );
      default:
        return (
          <DashboardView
            tasks={visibleTasks}
            projects={projects}
            activityLogs={activityLogs}
            dashboardStats={dashboardStats}
            onToggleTaskStatus={handleToggleTaskStatusCheckbox}
            onOpenTaskModal={handleOpenNewTaskModal}
          />
        );
    }
  };

  // OUTER ROUTER SCREEN DECISION
  if (authState.isLandingMode) {
    return (
      <LandingPage
        onEnterApp={() => handleLoginSuccess("alex.rivera@pulse.io")}
        onGoToLogin={() => setAuthState(p => ({ ...p, isLandingMode: false, isSignUpMode: false }))}
        onGoToSignup={() => setAuthState(p => ({ ...p, isLandingMode: false, isSignUpMode: true }))}
      />
    );
  }

  if (!authState.isAuthenticated) {
    return (
      <SimpleLoginSignup
        initialIsSignUp={authState.isSignUpMode}
        onLoginSuccess={handleLoginSuccess}
        onToggleMode={handleToggleAuthMode}
      />
    );
  }

  // Active platform layout
  return (
    <div
      className={`flex h-screen overflow-hidden font-sans transition-colors duration-300 ${
        theme === "dark"
          ? "bg-app text-[#f4f6fe]"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* 1. Left Navigation Navigation panel */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}

        projects={projects}

        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}

        onOpenProjectModal={() => {
          setEditingProject(null);
          setIsProjectModalOpen(true);
        }}

        onEditProject={handleEditProject}

        onDeleteProject={handleDeleteProject}

        activeTasksCount={
          tasks.filter(
            t => t.status !== TaskStatus.DONE
          ).length
        }

        onLogout={handleLogout}
      />
      {/* 2. Content view layout including Header */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header
          currentTab={currentTab}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          onOpenTaskModal={handleOpenNewTaskModal}
          onToggleAI={toggleAI}
        />

        {/* Real Content Scrolling Panel */}
        <main className="flex-1 overflow-y-auto bg-app">
          {renderTabContent()}
        </main>
      </div>

      {/* 3. Global Task Form dialog card modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
        projects={projects}
      />
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setEditingProject(null);
          setIsProjectModalOpen(false);
        }}
        editingProject={editingProject}
        onSave={handleSaveProject}
      />
      <AIChatPanel
        isOpen={isAIOpen}
        onClose={closeAI}
        workspaceContext={workspaceContext}
      />
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />

    </div>
  );
}
