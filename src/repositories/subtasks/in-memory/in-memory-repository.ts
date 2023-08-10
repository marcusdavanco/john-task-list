import { Prisma, Subtask } from '@prisma/client'
import { SubtaskRepository } from '../subtask-repository'

export class InMemorySubtasksRepository implements SubtaskRepository {
  public items: Subtask[] = []

  async findById(id: string) {
    const subtask = this.items.find((subtask) => subtask.id === id) || null

    return subtask
  }

  async create(data: Prisma.TaskCreateInput) {
    const subtask = {
      id: 'subtask-1',
      title: data.title,
      completed: false,
      due_date: data.due_date ? new Date(data.due_date) : null,
      created_at: new Date(),
      task_id: 'task-1',
    }

    this.items.push(subtask)

    return subtask
  }

  async list(task_id: string) {
    const subtasks = this.items.filter((subtask) => subtask.task_id === task_id)

    return subtasks
  }

  async update(id: string, data: Prisma.TaskCreateInput) {
    const subtaskIndex = this.items.findIndex((subtask) => subtask.id === id)

    if (subtaskIndex === -1) {
      throw new Error('Subtask not found')
    }

    const subtask = {
      ...this.items[subtaskIndex],
      title: data.title,
      due_date: data.due_date ? new Date(data.due_date!) : null,
    }

    this.items[subtaskIndex] = subtask

    return this.items[subtaskIndex]
  }

  async toggleCompleted(id: string) {
    const subtaskIndex = this.items.findIndex((subtask) => subtask.id === id)

    if (subtaskIndex === -1) {
      throw new Error('Subtask not found')
    }

    const subtask = {
      ...this.items[subtaskIndex],
      completed: !this.items[subtaskIndex].completed,
    }

    this.items[subtaskIndex] = subtask

    return this.items[subtaskIndex]
  }

  async delete(id: string) {
    const subtask = this.items.find((subtask) => subtask.id === id)

    if (!subtask) {
      throw new Error('Subtask not found')
    }

    this.items = this.items.filter((subtask) => subtask.id !== id)

    return subtask
  }
}
