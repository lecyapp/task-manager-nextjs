"use client";

import { useState } from "react";
import { deleteTask } from "@/app/actions/task";

interface DeleteButtonProps {
  taskId: string;
  onDeleted?: () => void;
}

export default function DeleteButton({ taskId, onDeleted }: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTask(taskId);
      setShowConfirm(false);
      onDeleted?.();
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex gap-1">
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium disabled:opacity-50 transition"
        >
          {isLoading ? "..." : "Confirm"}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded text-sm font-medium transition"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded text-sm font-medium transition"
    >
      Delete
    </button>
  );
}
