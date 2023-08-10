import { Prisma, Subtask } from '@prisma/client'

export interface SubtaskRepository {
  create(data: Prisma.SubtaskCreateInput): Promise<Subtask>
  update(id: string, data: Prisma.SubtaskUpdateInput): Promise<Subtask>
  toggleCompleted(id: string): Promise<Subtask>
  delete(id: string): Promise<Subtask>
  list(task_id: string): Promise<Subtask[]>
  findById(id: string): Promise<Subtask | null>
}
