import { TaskRepository } from '@/repositories/tasks/task-repository'
import { Task } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ToggleCompletedUseCaseRequest {
  id: string
}

export class ToggleCompletedUseCase {
  constructor(private TaskRepository: TaskRepository) {}

  async execute({ id }: ToggleCompletedUseCaseRequest): Promise<Task> {
    const task = await this.TaskRepository.findById(id)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    const updatedTask = await this.TaskRepository.toggleCompleted(id)

    return updatedTask
  }
}
