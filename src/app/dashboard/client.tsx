"use client";

import { useState, useCallback } from "react";
import { Task } from "@/generated/prisma";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import TaskFilter from "@/components/TaskFilter";
import { getTasks } from "@/app/actions/task";

interface DashboardClientProps {
  initialTasks: Task[];
}

export default function DashboardClient({ initialTasks }: DashboardClientProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const refreshTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter && task.status !== statusFilter) {
      return false;
    }
    if (priorityFilter && task.priority !== priorityFilter) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          + New Task
        </button>
      </div>

      <TaskFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">
            {tasks.length === 0
              ? "No tasks yet. Create one to get started!"
              : "No tasks match your filters."}
          </p>
          {tasks.length === 0 && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold transition inline-block"
            >
              Create Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onStatusChange={refreshTasks} />
          ))}
        </div>
      )}

      {isFormOpen && (
        <TaskForm
          onTaskCreated={refreshTasks}
          setIsOpen={setIsFormOpen}
        />
      )}
    </div>
  );
}
