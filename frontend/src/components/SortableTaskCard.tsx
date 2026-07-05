import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Edit,
  Trash2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import {
  Task,
  TaskStatus,
  Priority,
} from "../types";

interface Props {
  task: Task;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  moveTask: (
    task: Task,
    direction: "left" | "right"
  ) => void;
}

export default function SortableTaskCard({
  task,
  onEditTask,
  onDeleteTask,
  moveTask,
}: Props) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition:
      transition ??
      "transform 180ms ease",
  };

  return (

    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        rounded-2xl
        border
        border-default
        bg-surface
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-2xl
        hover:border-indigo-400
        hover:scale-[1.02]
        cursor-grab active:cursor-grabbing
        ${
        isDragging
        ? `
        opacity-30
        scale-110
        rotate-3
        shadow-2xl
        z-50
        `
        : ""
        }
      `}
    >

      <h3 className="text-lg font-semibold">
        {task.title}
      </h3>

      <p className="mt-3 line-clamp-2 text-sm text-secondary">
        {task.description}
      </p>

      <div className="mt-5 flex items-center justify-between">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold text-white
          ${
            task.priority === Priority.URGENT
              ? "bg-red-600"
              : task.priority === Priority.HIGH
              ? "bg-orange-500"
              : task.priority === Priority.MEDIUM
              ? "bg-indigo-600"
              : "bg-emerald-600"
          }`}
        >
          {task.priority}
        </span>

        <div className="flex items-center gap-2">

          {task.status !== TaskStatus.BACKLOG && (

            <button
              onClick={() =>
                moveTask(task, "left")
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-default bg-surface-2 transition hover:bg-indigo-100 dark:hover:bg-indigo-900"
            >
              <ArrowLeft size={15} />
            </button>

          )}

          {task.status !== TaskStatus.DONE && (

            <button
              onClick={() =>
                moveTask(task, "right")
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-default bg-surface-2 transition hover:bg-indigo-100 dark:hover:bg-indigo-900"
            >
              <ArrowRight size={15} />
            </button>

          )}

          <button
            onClick={() =>
              onEditTask(task)
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white transition hover:bg-blue-600"
          >
            <Edit size={15} />
          </button>

          <button
            onClick={() =>
              onDeleteTask(Number(task.id))
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white transition hover:bg-red-600"
          >
            <Trash2 size={15} />
          </button>

        </div>

      </div>

    </div>

  );

}