import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Task, TaskStatus } from "../types";

const statusOrder = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE,
];

interface ProjectBoardViewProps {
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  onUpdateTaskStatus: (
    id: number,
    status: TaskStatus
  ) => void;
}

export default function ProjectBoardView({
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onUpdateTaskStatus,
}: ProjectBoardViewProps) {
  const [search, setSearch] = useState("");

  const columns = [
    {
      id: TaskStatus.BACKLOG,
      title: "BACKLOG",
      border: "border-slate-700",
    },
    {
      id: TaskStatus.TODO,
      title: "TODO",
      border: "border-blue-500",
    },
    {
      id: TaskStatus.IN_PROGRESS,
      title: "IN PROGRESS",
      border: "border-orange-500",
    },
    {
      id: TaskStatus.DONE,
      title: "DONE",
      border: "border-green-500",
    },
  ];

  const moveTask = (
    task: Task,
    direction: "left" | "right"
  ) => {

    const currentIndex = statusOrder.indexOf(
      task.status as TaskStatus
    );

    if (currentIndex === -1) return;

    const nextIndex =
      direction === "left"
        ? currentIndex - 1
        : currentIndex + 1;

    if (
      nextIndex < 0 ||
      nextIndex >= statusOrder.length
    ) {
      return;
    }

    onUpdateTaskStatus(
      Number(task.id),
      statusOrder[nextIndex]
    );
  };
return (
  <div className="bg-[#0b0c10] min-h-screen p-6 text-white">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-4xl font-black">
          ACTIVE SPRINT KANBAN
        </h1>

        <p className="text-gray-400 mt-2">
          Organize and manage your tasks.
        </p>
      </div>

      <button
        onClick={onAddTask}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium"
      >
        <Plus size={18} />
        New Task
      </button>

    </div>

    {/* Search */}
    <div className="relative mb-8">

      <Search
        size={18}
        className="absolute left-3 top-3 text-gray-500"
      />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="w-full bg-[#12131a] border border-gray-700 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
      />

    </div>
      <div className="grid grid-cols-4 gap-5">

        {columns.map(column => {

          const filteredTasks = useMemo(() => {
            return tasks.filter(task => {
              const matchesStatus =
                task.status.toLowerCase() ===
                column.id.toLowerCase();

              const matchesSearch =
                task.title
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                task.description
                  .toLowerCase()
                  .includes(search.toLowerCase());

              return matchesStatus && matchesSearch;
            });
          }, [tasks, column.id, search]);

          return (

            <div
              key={column.id}
              className={`rounded-xl border ${column.border} bg-[#12131a] p-4`}
            >

              <div className="flex justify-between mb-4">

                <h2 className="font-bold">
                  {column.title}
                </h2>

                <span className="bg-gray-800 rounded px-2 py-1 text-xs">
                  {filteredTasks.length}
                </span>

              </div>

              <div className="space-y-3">

                {filteredTasks.length === 0 ? (

                  <div className="border border-dashed border-gray-700 rounded-xl h-28 flex items-center justify-center text-gray-500">
                    Empty
                  </div>

                ) : (

                  filteredTasks.map(task => (

                    <div
                      key={task.id}
                      className="bg-[#1b1c24] border border-gray-700 rounded-xl p-4"
                    >

                      <h3 className="font-bold">
                        {task.title}
                      </h3>

                      <p className="text-sm text-gray-400 mt-2">
                        {task.description}
                      </p>

                      <div className="flex justify-between items-center mt-4">

                        <span className="bg-indigo-600 px-2 py-1 rounded text-xs">
                          {task.priority}
                        </span>

                        <div className="flex gap-2 items-center">

                          {task.status !== TaskStatus.BACKLOG && (
                            <button
                              onClick={() => moveTask(task,"left")}
                              className="p-1 rounded bg-gray-800 hover:bg-gray-700"
                            >
                              <ArrowLeft size={14}/>
                            </button>
                          )}

                          {task.status !== TaskStatus.DONE && (
                            <button
                              onClick={() => moveTask(task,"right")}
                              className="p-1 rounded bg-gray-800 hover:bg-gray-700"
                            >
                              <ArrowRight size={14}/>
                            </button>
                          )}

                          <button
                            onClick={() => {
                              console.log("EDIT CLICKED", task);
                              onEditTask(task);
                            }}
                            className="p-1 rounded bg-blue-600 hover:bg-blue-700"
                          >
                            <Edit size={14} />
                          </button>

                          <button
                            onClick={() => onDeleteTask(Number(task.id))}
                            className="p-1 rounded bg-red-600 hover:bg-red-700"
                          >
                            <Trash2 size={14}/>
                          </button>

                        </div>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}