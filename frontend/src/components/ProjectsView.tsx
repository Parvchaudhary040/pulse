import React from "react";
import { FolderOpen } from "lucide-react";
import { Project, Task, TaskStatus } from "../types";

interface ProjectsViewProps {
  projects: Project[];
  tasks: Task[];

  onOpenProject?: (id: number) => void;
}

export default function ProjectsView({
  projects,
  tasks,
  onOpenProject,
}: ProjectsViewProps) {
  return (
    <div className="min-h-screen bg-app p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-black text-primary">
            Projects
          </h1>

          <p className="mt-2 text-secondary">
            Manage all your projects.
          </p>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {projects.map((project) => {

          const projectTasks = tasks.filter(
            task => task.project_id === project.id
          );

          const completed = projectTasks.filter(
            task => task.status === TaskStatus.DONE
          ).length;

          const progress =
            projectTasks.length === 0
              ? 0
              : Math.round(
                  (completed / projectTasks.length) * 100
                );

          return (

            <div
              key={project.id}
              className="rounded-2xl border border-default bg-surface p-6 shadow-sm"
            >

              <div className="mb-4 flex items-center gap-3">

                <div className="rounded-xl bg-indigo-600 p-3">

                  <FolderOpen
                    size={20}
                    className="text-white"
                  />

                </div>

                <div>

                  <h2 className="text-xl font-bold text-primary">
                    {project.name}
                  </h2>

                  <p className="text-sm text-secondary">
                    {project.status}
                  </p>

                </div>

              </div>

              <p className="mb-6 line-clamp-2 text-secondary">
                {project.description}
              </p>

              <div className="mb-4">

                <div className="mb-2 flex justify-between text-sm">

                  <span>Progress</span>

                  <span>{progress}%</span>

                </div>

                <div className="h-2 rounded-full bg-surface-2">

                  <div
                    className="h-2 rounded-full bg-indigo-600 transition-all"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <p className="text-sm text-secondary">
                    Tasks
                  </p>

                  <p className="text-2xl font-bold text-primary">
                    {projectTasks.length}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-secondary">
                    Completed
                  </p>

                  <p className="text-2xl font-bold text-green-500">
                    {completed}
                  </p>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}