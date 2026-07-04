import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Task, TaskStatus, Priority } from "../types";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    taskData: Omit<Task, "id" | "createdAt"> & {
      id?: string;
    }
  ) => void;
  editingTask?: Task | null;
}

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  editingTask,
}: TaskModalProps) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] =
    useState<TaskStatus>(TaskStatus.TODO);

  const [priority, setPriority] =
    useState<Priority>(Priority.MEDIUM);

  const [error, setError] = useState("");

  useEffect(() => {

    if (editingTask) {

      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);

    } else {

      setTitle("");
      setDescription("");
      setStatus(TaskStatus.TODO);
      setPriority(Priority.MEDIUM);

    }

    setError("");

  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    onSave({
      id: editingTask?.id,
      title,
      description,
      status,
      priority,
    });

    onClose();

  };
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <div className="w-full max-w-xl rounded-2xl border border-default bg-surface shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-default px-6 py-5">

          <h2 className="text-lg font-bold text-primary">

            {editingTask ? "Edit Task" : "Create Task"}

          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-secondary hover:bg-gray-800 hover:text-primary"
          >
            <X size={18} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {error && (

            <div className="rounded-lg border border-red-500 bg-red-500/10 p-3 text-sm text-red-400">

              {error}

            </div>

          )}

          {/* Title */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-300">

              Title

            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full rounded-xl border border-default bg-app px-4 py-3 text-primary outline-none focus:border-indigo-500"
              placeholder="Enter task title"
            />

          </div>

          {/* Description */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-300">

              Description

            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full resize-none rounded-xl border border-default bg-app px-4 py-3 text-primary outline-none focus:border-indigo-500"
              placeholder="Describe this task..."
            />

          </div>

          {/* Status + Priority */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-300">

                Status

              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as TaskStatus
                  )
                }
                className="w-full rounded-xl border border-default bg-app px-4 py-3 text-primary outline-none focus:border-indigo-500"
              >

                <option value={TaskStatus.BACKLOG}>
                  Backlog
                </option>

                <option value={TaskStatus.TODO}>
                  Todo
                </option>

                <option value={TaskStatus.IN_PROGRESS}>
                  In Progress
                </option>

                <option value={TaskStatus.DONE}>
                  Done
                </option>

              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-300">

                Priority

              </label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(
                    e.target.value as Priority
                  )
                }
                className="w-full rounded-xl border border-default bg-app px-4 py-3 text-primary outline-none focus:border-indigo-500"
              >

                <option value={Priority.URGENT}>
                  Urgent
                </option>

                <option value={Priority.HIGH}>
                  High
                </option>

                <option value={Priority.MEDIUM}>
                  Medium
                </option>

                <option value={Priority.LOW}>
                  Low
                </option>

              </select>

            </div>

          </div>

                    {/* Footer */}

          <div className="flex justify-end gap-3 border-t border-default pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-default px-5 py-3 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-primary hover:bg-indigo-700"
            >
              {editingTask
                ? "Save Changes"
                : "Create Task"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}