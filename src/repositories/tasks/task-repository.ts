import { Prisma, Task } from '@prisma/client';

export interface TaskRepository {
  create(data: Prisma.TaskCreateInput): Promise<Task>;
  update(data: Prisma.TaskCreateInput): Promise<Task>;
  toggleCompleted(id: string): Promise<Task>;
  delete(id: string): Promise<Task>;
  list(): Promise<Task[]>;
}