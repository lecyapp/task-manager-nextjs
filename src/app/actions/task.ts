"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(
  title: string,
  description: string | null,
  priority: string,
  dueDate: Date | null
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority,
      dueDate,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
  return task;
}

export async function updateTask(
  id: string,
  data: {
    title?: string;
    description?: string | null;
    status?: string;
    priority?: string;
    dueDate?: Date | null;
  }
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task || task.userId !== session.user.id) {
    throw new Error("Task not found or unauthorized");
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data,
  });

  revalidatePath("/dashboard");
  return updatedTask;
}

export async function deleteTask(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task || task.userId !== session.user.id) {
    throw new Error("Task not found or unauthorized");
  }

  await prisma.task.delete({ where: { id } });

  revalidatePath("/dashboard");
}

export async function toggleTaskStatus(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const task = await prisma.task.findUnique({ where: { id } });

  if (!task || task.userId !== session.user.id) {
    throw new Error("Task not found or unauthorized");
  }

  const newStatus =
    task.status === "completed"
      ? "pending"
      : task.status === "pending"
        ? "in_progress"
        : "completed";

  const updatedTask = await prisma.task.update({
    where: { id },
    data: { status: newStatus },
  });

  revalidatePath("/dashboard");
  return updatedTask;
}

export async function getTasks() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
}
