import React, { useEffect, useState } from "react";
import { Project } from "../types";
import { X } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;

  editingProject?: Project | null;

  onSave: (project: {
    id?: number;
    name: string;
    description: string;
    status: string;
  }) => void;
}

export default function ProjectModal({
  isOpen,
  onClose,
  onSave,
  editingProject,
}: ProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [error, setError] = useState("");

useEffect(() => {

  if (editingProject) {

    setName(editingProject.name);
    setDescription(editingProject.description);
    setStatus(editingProject.status);

  } else {

    setName("");
    setDescription("");
    setStatus("active");

  }

  setError("");

}, [editingProject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

  onSave({
    id: editingProject?.id
      ? Number(editingProject.id)
      : undefined,
    name,
    description,
    status,
  });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl border border-default bg-surface shadow-2xl">

        <div className="flex items-center justify-between border-b border-default px-6 py-5">

          <h2 className="text-lg font-bold">
            {editingProject
              ? "Edit Project"
              : "Create Project"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-surface-2"
          >
            <X size={18} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {error && (
            <div className="rounded-lg bg-red-500/10 p-3 text-red-400">
              {error}
            </div>
          )}

          <div>

            <label className="mb-2 block text-sm">
              Project Name
            </label>

            <input
              value={name}
              onChange={(e)=>
                setName(e.target.value)
              }
              className="w-full rounded-xl border border-default bg-app px-4 py-3 outline-none focus:border-indigo-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e)=>
                setDescription(e.target.value)
              }
              className="w-full rounded-xl border border-default bg-app px-4 py-3 outline-none focus:border-indigo-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm">
              Status
            </label>

            <select
              value={status}
              onChange={(e)=>
                setStatus(e.target.value)
              }
              className="w-full rounded-xl border border-default bg-app px-4 py-3"
            >

              <option value="active">
                Active
              </option>

              <option value="planning">
                Planning
              </option>

              <option value="completed">
                Completed
              </option>

            </select>

          </div>

          <div className="flex justify-end gap-3 border-t border-default pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-default px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              {editingProject
                ? "Save Changes"
                : "Create Project"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}