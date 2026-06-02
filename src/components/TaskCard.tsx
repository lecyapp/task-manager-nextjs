"use client";

import { Task } from "@/generated/prisma";
import { toggleTaskStatus } from "@/app/actions/task";
import { useState } from "react";
import DeleteButton from "./DeleteButton";

const statusColors = {
  pending: "bg-gray-200 text-gray-800",
  in_progress: "bg-yellow-200 text-yellow-800",
  completed: "bg-green-200 text-green-800",
};

const priorityColors = {
  low: "text-green-600",
  medium: "text-yellow-600",
  high: "text-red-600",
};

interface TaskCardProps {
  task: Task;
  onStatusChange?: () => void;
  onDeleted?: () => void;
}

export default function TaskCard({ task, onStatusChange, onDeleted }: TaskCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusToggle = async () => {
    setIsLoading(true);
    try {
      await toggleTaskStatus(task.id);
      onStatusChange?.();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-slate-600">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status as keyof typeof statusColors]}`}>
          {task.status.replace("_", " ")}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-500 text-sm mb-3">{task.description}</p>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {formattedDate && (
            <span className="text-xs text-gray-400">Due: {formattedDate}</span>
          )}
          <span
            className={`text-sm font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleStatusToggle}
          disabled={isLoading}
          className="flex-1 bg-slate-700 hover:bg-slate-800 text-white py-2 rounded text-sm font-medium disabled:opacity-50 transition"
        >
          {isLoading ? "Updating..." : "Next Status"}
        </button>
        <DeleteButton taskId={task.id} onDeleted={onDeleted} />
      </div>
    </div>
  );
}
