import { prisma } from "../../lib/prisma"
import { Prisma } from "@prisma/client"
import { TaskRepository } from "../task-repository"

export class PrismaTasksRepository implements TaskRepository {
  update(data: Prisma.TaskCreateInput): Promise<{ id: string; title: string; completed: boolean; due_date: Date | null; created_at: Date }> {
    throw new Error("Method not implemented.")
  }
  toggleCompleted(id: string): Promise<{ id: string; title: string; completed: boolean; due_date: Date | null; created_at: Date }> {
    throw new Error("Method not implemented.")
  }
  delete(id: string): Promise<{ id: string; title: string; completed: boolean; due_date: Date | null; created_at: Date }> {
    throw new Error("Method not implemented.")
  }
  async create(data: Prisma.TaskCreateInput) {
    const task = await prisma.task.create({ data })

    return task
  }
  async list() {
    const tasks = await prisma.task.findMany()

    return tasks
  }
}
