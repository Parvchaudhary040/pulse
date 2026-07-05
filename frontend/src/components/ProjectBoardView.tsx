import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Task, TaskStatus, Priority } from "../types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "react-toastify";
import SortableTaskCard from "./SortableTaskCard";
import DroppableColumn from "./DroppableColumn";
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
  const totalTasks = tasks.length;
  const backlogCount = tasks.filter(
    t => t.status === TaskStatus.BACKLOG
  ).length;
  const todoCount = tasks.filter(
    t => t.status === TaskStatus.TODO
  ).length;
  const inProgressCount = tasks.filter(
    t => t.status === TaskStatus.IN_PROGRESS
  ).length;
  const doneCount = tasks.filter(
    t => t.status === TaskStatus.DONE
  ).length;
  const [search, setSearch] = useState("");
  const [activeTask, setActiveTask] =
    useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    })
  );

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
const handleDragStart = (
  event: any
) => {

  const task = tasks.find(
    t => t.id.toString() === event.active.id
  );

  if (task) {

    setActiveTask(task);

  }

};
const handleDragEnd = (
  event: DragEndEvent
) => {
  const { active, over } = event;

  setActiveTask(null);

  if (!over) return;

  const task = tasks.find(
    (t) => t.id.toString() === active.id
  );

  if (!task) return;

  const newStatus =
    over.id as TaskStatus;

  if (task.status === newStatus) return;

  onUpdateTaskStatus(
  Number(task.id),
  newStatus
);

toast.success(
  `"${task.title}" moved to ${newStatus}`,
  {
    autoClose: 1800,
    position: "bottom-right",
  }
);

};
return (
  <div className="bg-app min-h-screen p-6 text-primary">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-4xl font-black">
          ACTIVE SPRINT KANBAN
        </h1>

        <p className="text-secondary mt-2">
          Organize and manage your tasks.
        </p>
      </div>

      <button
        onClick={onAddTask}
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-105 hover:bg-indigo-700"
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
        className="w-full bg-surface border border-default rounded-xl py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
      />

    </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">

        <div className="rounded-2xl border border-default bg-surface p-5">

          <p className="text-sm text-secondary">
            Total Tasks
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {totalTasks}
          </h2>

        </div>

        <div className="rounded-2xl border border-default bg-surface p-5">

          <p className="text-sm text-secondary">
            Backlog
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-500">
            {backlogCount}
          </h2>

        </div>

        <div className="rounded-2xl border border-default bg-surface p-5">

          <p className="text-sm text-secondary">
            Todo
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-500">
            {todoCount}
          </h2>

        </div>

        <div className="rounded-2xl border border-default bg-surface p-5">

          <p className="text-sm text-secondary">
            In Progress
          </p>

          <h2 className="mt-2 text-3xl font-bold text-orange-500">
            {inProgressCount}
          </h2>

        </div>

        <div className="rounded-2xl border border-default bg-surface p-5">

          <p className="text-sm text-secondary">
            Done
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-500">
            {doneCount}
          </h2>

        </div>

      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
      <DragOverlay>

        {activeTask && (

          <div
            className="
            w-[300px]
            rounded-2xl
            border
            border-indigo-500
            bg-surface
            p-5
            shadow-2xl
            rotate-2
            scale-105
            opacity-95
            "
          >

            <h3 className="text-lg font-bold">
              {activeTask.title}
            </h3>

            <p className="mt-3 text-sm text-secondary">
              {activeTask.description}
            </p>

            <div className="mt-4">

              <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs text-white">

                {activeTask.priority}

              </span>

            </div>

          </div>

        )}

      </DragOverlay>
      <div className="flex gap-6 overflow-x-auto pb-4">

        {columns.map(column => {

          const filteredTasks = tasks.filter((task) => {
            const matchesStatus =
              task.status === column.id;

            const matchesSearch =
              task.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              task.description
                .toLowerCase()
                .includes(search.toLowerCase());

            return matchesStatus && matchesSearch;
          });
          return (
            
            <DroppableColumn
              key={column.id}
              id={column.id}
            >
            <div
              className={`w-[340px] shrink-0 rounded-2xl border ${column.border} bg-surface shadow-sm p-5`}
            >

              <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-2">
                <span
                className={`w-3 h-3 rounded-full
                ${
                column.id === TaskStatus.BACKLOG
                ? "bg-slate-500"
                : column.id === TaskStatus.TODO
                ? "bg-blue-500"
                : column.id === TaskStatus.IN_PROGRESS
                ? "bg-orange-500"
                : "bg-emerald-500"
                }`}
                />
                <h2 className="text-lg font-bold">
                {column.title}
                </h2>
                </div>

                <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-secondary">
                  {filteredTasks.length}
                </span>

              </div>

              <div className="space-y-3">

                {filteredTasks.length === 0 ? (

                  <div className="flex h-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-default text-secondary">
                    <div className="mb-3 text-4xl">
                      📋
                    </div>

                    <p className="font-semibold">
                      No Tasks
                    </p>

                    <p className="mt-1 text-sm">
                      Create your first task
                    </p>
                  </div>

                ) : (

                  <SortableContext
                    items={filteredTasks.map((task) =>
                      task.id.toString()
                    )}
                    strategy={verticalListSortingStrategy}
                  >

                    {filteredTasks.map((task) => (

                      <SortableTaskCard
                        key={task.id}
                        task={task}
                        onEditTask={onEditTask}
                        onDeleteTask={onDeleteTask}
                        moveTask={moveTask}
                      />

                    ))}

                  </SortableContext>

                )}

              </div>

            </div>
            </DroppableColumn>

          );

        })}

      </div>
      </DndContext>
    </div>
  );
}