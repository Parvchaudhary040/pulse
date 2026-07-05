import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  id: string;
  children: React.ReactNode;
}

export default function DroppableColumn({
  id,
  children,
}: Props) {
  const { setNodeRef, isOver } =
    useDroppable({
      id,
    });

  return (
    <div
      ref={setNodeRef}
      className={`
      transition-all
      duration-300
      rounded-2xl
      min-h-[220px]
      ${
            isOver
                ? "scale-[1.02] ring-2 ring-indigo-500 bg-indigo-500/5"
                : ""
        }
        `}
      >
      {children}
    </div>
  );
}