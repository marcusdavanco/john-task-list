import { TaskRepository } from '@/repositories/tasks/task-repository'
import { Task } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateUseCaseRequest {
  id: string
  title: string
  due_date?: Date
}

export class UpdateUseCase {
  constructor(private TaskRepository: TaskRepository) {}

  async execute({ id, title, due_date }: UpdateUseCaseRequest): Promise<Task> {
    const task = await this.TaskRepository.findById(id)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    const updatedTask = await this.TaskRepository.update(id, {
      title,
      due_date,
    })

    return updatedTask
  }
}
