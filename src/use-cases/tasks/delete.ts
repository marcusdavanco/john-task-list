import { TaskRepository } from '@/repositories/tasks/task-repository'
import { Task } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteUseCaseRequest {
  id: string
}

export class DeleteUseCase {
  constructor(private TaskRepository: TaskRepository) {}

  async execute({ id }: DeleteUseCaseRequest): Promise<Task> {
    const task = await this.TaskRepository.findById(id)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    const deletedTask = await this.TaskRepository.delete(id)

    return deletedTask
  }
}
