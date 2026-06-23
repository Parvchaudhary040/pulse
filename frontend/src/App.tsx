import React, { useState, useEffect } from "react";
import { 
  currentUser, 
  teamMembers, 
  projects as seedProjects, 
  initialTasks, 
  initialActivityLogs, 
  initialProjectFiles, 
  initialMockNotifications 
} from "./data";
import { Task, TaskStatus, Project, ActivityLog, ProjectFile, Notification, Priority } from "./types";
import AppRoutes from "./routes/AppRoutes";
// Inner-components imports
import LandingPage from "./components/LandingPage";
import SimpleLoginSignup from "./components/SimpleLoginSignup";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardView from "./components/DashboardView";
import ProjectBoardView from "./components/ProjectBoardView";
import ProjectDetailView from "./components/ProjectDetailView";
import ProfileView from "./components/ProfileView";
import SettingsView from "./components/SettingsView";
import MobileSimulator from "./components/MobileSimulator";
import TaskModal from "./components/TaskModal";

export default function App() {
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

  // Load / Persist Tasks State
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("pulse_tasks");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialTasks;
  });

  // Load / Persist Projects State
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("pulse_projects");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return seedProjects;
  });

  // Load / Persist Activities
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem("pulse_activities");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialActivityLogs;
  });

  // Load / Persist Files lists
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>(() => {
    const saved = localStorage.getItem("pulse_files");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialProjectFiles;
  });

  // Load / Persist Alerts
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem("pulse_notifs");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialMockNotifications;
  });

  // Task Creator Modal indicators
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Profile username edits in settings
  const [userName, setUserName] = useState("Alex Rivera");

  // Sync to localCache
  useEffect(() => {
    localStorage.setItem("pulse_auth", JSON.stringify(authState));
  }, [authState]);

  useEffect(() => {
    localStorage.setItem("pulse_last_tab", currentTab);
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem("pulse_tasks", JSON.stringify(tasks));
    
    // Automatically re-calculate overall progress of Mobile App Revamp dynamically when tasks change!
    const projTasks = tasks.filter(t => t.projectId === "proj-1");
    const completedProjTasks = projTasks.filter(t => t.status === TaskStatus.DONE);
    const progressPercent = projTasks.length > 0 
      ? Math.round((completedProjTasks.length / projTasks.length) * 100) 
      : 0;

    setProjects(prev => prev.map(p => {
      if (p.id === "proj-1") {
        return { ...p, progress: progressPercent };
      }
      return p;
    }));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("pulse_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("pulse_activities", JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem("pulse_files", JSON.stringify(projectFiles));
  }, [projectFiles]);

  useEffect(() => {
    localStorage.setItem("pulse_notifs", JSON.stringify(notifications));
  }, [notifications]);

  // Auth Operations handlers
  const handleLoginSuccess = (email: string) => {
    setAuthState({
      isAuthenticated: true,
      isSignUpMode: false,
      isLandingMode: false,
      email
    });
    setCurrentTab("dashboard");
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      isSignUpMode: false,
      isLandingMode: true,
      email: ""
    });
    // Optional: Clear storage cache values to allow fresh reloads
    localStorage.removeItem("pulse_auth");
    localStorage.removeItem("pulse_last_tab");
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

  const handleSaveTask = (taskData: Omit<Task, "id" | "createdAt"> & { id?: string }) => {
    const defaultUserAvatar = "https://images.unsplash.com/photo-1534528741775-53994a60daeb?auto=format&fit=crop&q=80&w=256&h=256";
    
    if (taskData.id) {
      // Edit operation
      setTasks(prev => prev.map(t => {
        if (t.id === taskData.id) {
          return {
            ...t,
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
            priority: taskData.priority,
            assigneeId: taskData.assigneeId,
            dueDate: taskData.dueDate,
            labels: taskData.labels
          };
        }
        return t;
      }));

      // Register activity log
      const log: ActivityLog = {
        id: "log-" + Date.now(),
        userId: "user-1",
        userName: userName,
        userAvatar: defaultUserAvatar,
        action: "revised parameters on",
        targetType: "task",
        targetName: taskData.title,
        timestamp: "Just now",
        details: `Updated fields for sprint task: ${taskData.title}`
      };
      setActivityLogs(prev => [log, ...prev]);

    } else {
      // Create Operation
      const newTask: Task = {
        id: "task-" + Date.now(),
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        assigneeId: taskData.assigneeId,
        projectId: taskData.projectId,
        dueDate: taskData.dueDate,
        labels: taskData.labels,
        createdAt: new Date().toISOString().split("T")[0]
      };

      setTasks(prev => [...prev, newTask]);

      // Register activity log
      const log: ActivityLog = {
        id: "log-" + Date.now(),
        userId: "user-1",
        userName: userName,
        userAvatar: defaultUserAvatar,
        action: "created task inside",
        targetType: "task",
        targetName: taskData.title,
        timestamp: "Just now",
        details: `Formulated card: ${taskData.title}. Priority set to ${taskData.priority}.`
      };
      setActivityLogs(prev => [log, ...prev]);

      // Trigger standard system notification
      const systemNotif: Notification = {
        id: "notif-" + Date.now(),
        title: "Task Registered successfully",
        message: `Task node '${taskData.title}' has been dispatched to workspace columns.`,
        type: "success",
        read: false,
        createdAt: "Now"
      };
      setNotifications(prev => [systemNotif, ...prev]);
    }
  };

  const handleDeleteTask = (id: string) => {
    const targetTask = tasks.find(t => t.id === id);
    if (!targetTask) return;

    if (confirm(`Are you sure you want to purge task coordinate: "${targetTask.title}"?`)) {
      setTasks(prev => prev.filter(t => t.id !== id));

      // Append file timeline activity log
      const log: ActivityLog = {
        id: "log-" + Date.now(),
        userId: "user-1",
        userName: userName,
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
        action: "purged card from",
        targetType: "task",
        targetName: targetTask.title,
        timestamp: "Just now",
        details: `Successfully filtered out task ID: ${id}`
      };
      setActivityLogs(prev => [log, ...prev]);
    }
  };

  const handleUpdateTaskStatus = (id: string, nextStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));

    const targetTask = tasks.find(t => t.id === id);
    if (!targetTask) return;

    // Append log
    const log: ActivityLog = {
      id: "log-" + Date.now(),
      userId: "user-1",
      userName: userName,
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
      action: "shifted status of",
      targetType: "task",
      targetName: targetTask.title,
      timestamp: "Just now",
      details: `Moved card to column: ${nextStatus}`
    };
    setActivityLogs(prev => [log, ...prev]);
  };

  const handleToggleTaskStatusCheckbox = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === TaskStatus.DONE ? TaskStatus.TODO : TaskStatus.DONE;
        
        // Log action
        const log: ActivityLog = {
          id: "log-" + Date.now(),
          userId: "user-1",
          userName: userName,
          userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
          action: nextStatus === TaskStatus.DONE ? "completed task" : "reopened task",
          targetType: "task",
          targetName: t.title,
          timestamp: "Just now",
          details: nextStatus === TaskStatus.DONE 
            ? "Marked checkbox status as accomplished." 
            : "Re-routed coordinate back to active column."
        };
        setActivityLogs(p => [log, ...p]);

        return { ...t, status: nextStatus };
      }
      return t;
    }));
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

  // Doc items upload appender
  const handleUploadProjectFile = (filename: string, filesize: string) => {
    const newFile: ProjectFile = {
      id: "file-" + Date.now(),
      name: filename,
      size: filesize,
      uploadedBy: userName,
      uploadedAt: "Today",
      type: filename.endsWith(".xlsx") || filename.endsWith(".csv") ? "spreadsheet" : "code"
    };
    setProjectFiles(prev => [newFile, ...prev]);

    // Append log
    const log: ActivityLog = {
      id: "log-" + Date.now(),
      userId: "user-1",
      userName: userName,
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
      action: "attached project file",
      targetType: "project",
      targetName: filename,
      timestamp: "Just now",
      details: `Added speculative assets item: ${filename} (${filesize})`
    };
    setActivityLogs(p => [log, ...p]);
  };

  const handleUpdateUserNameInSettings = (name: string) => {
    setUserName(name);
  };

  // Workspace subtab router renderer
  const renderTabContent = () => {
    const primaryRevampProject = projects.find(p => p.id === "proj-1") || projects[0];

    switch (currentTab) {
      case "dashboard":
        return (
          <DashboardView
            tasks={tasks}
            projects={projects}
            activityLogs={activityLogs}
            onToggleTaskStatus={handleToggleTaskStatusCheckbox}
            onOpenTaskModal={handleOpenNewTaskModal}
          />
        );
      case "board":
        return (
          <ProjectBoardView
            tasks={tasks}
            teamMembers={teamMembers}
            onAddTask={handleOpenNewTaskModal}
            onEditTask={handleOpenEditTaskModal}
            onDeleteTask={handleDeleteTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
          />
        );
      case "timeline":
        return (
          <ProjectDetailView
            project={primaryRevampProject}
            teamMembers={teamMembers}
            projectFiles={projectFiles}
            activityLogs={activityLogs}
            onAddActivityLog={handleAddActivityLog}
            onUploadFile={handleUploadProjectFile}
          />
        );
      case "profile":
        return (
          <ProfileView
            user={{ ...currentUser, name: userName }}
            tasks={tasks}
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
          <MobileSimulator
            tasks={tasks}
            onToggleTaskStatus={handleToggleTaskStatusCheckbox}
          />
        );
      default:
        return (
          <DashboardView
            tasks={tasks}
            projects={projects}
            activityLogs={activityLogs}
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
  return <AppRoutes />;
  return (
    <div className="flex bg-[#0b0c10] text-[#f4f6fe] h-screen overflow-hidden font-sans select-none antialiased selection:bg-[#4f46e5] selection:text-white">
      
      {/* 1. Left Navigation Navigation panel */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        projects={projects}
        activeTasksCount={tasks.filter(t => t.status !== TaskStatus.DONE).length}
        myTasksCount={tasks.filter(t => t.assigneeId === "user-1").length}
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
        />

        {/* Real Content Scrolling Panel */}
        <main className="flex-1 overflow-y-auto bg-[#0b0c10]">
          {renderTabContent()}
        </main>
      </div>

      {/* 3. Global Task Form dialog card modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        teamMembers={teamMembers}
        editingTask={editingTask}
      />

    </div>
  );
}
