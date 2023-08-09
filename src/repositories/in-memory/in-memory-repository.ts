import { Prisma, Task } from '@prisma/client';
import { TaskRepository } from '../task-repository';

export class InMemoryTasksRepository implements TaskRepository {
  update(data: Prisma.TaskCreateInput): Promise<{ id: string; title: string; completed: boolean; due_date: Date | null; created_at: Date; }> {
    throw new Error('Method not implemented.');
  }
  toggleCompleted(id: string): Promise<{ id: string; title: string; completed: boolean; due_date: Date | null; created_at: Date; }> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<{ id: string; title: string; completed: boolean; due_date: Date | null; created_at: Date; }> {
    throw new Error('Method not implemented.');
  }
  public items: Task[] = [];
  
  async create(data: Prisma.TaskCreateInput) {
    const task = {
      id: 'task-1',
      title: data.title,
      completed: false,
      due_date: data.due_date ? new Date(data.due_date) : null,
      created_at: new Date(),
    }

    this.items.push(task)

    return task
  }
  async list() {
    const tasks = this.items;

    return tasks
  }
}