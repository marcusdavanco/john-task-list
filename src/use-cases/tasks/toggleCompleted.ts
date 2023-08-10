import { TaskRepository } from '@/repositories/tasks/task-repository'
import { Task } from '@prisma/client'

interface ToggleCompletedUseCaseRequest {
  id: string
}

export class ToggleCompletedUseCase {
  constructor(private TaskRepository: TaskRepository) {}

  async execute({ id }: ToggleCompletedUseCaseRequest): Promise<Task> {
    const updatedTask = await this.TaskRepository.toggleCompleted(id)

    return updatedTask
  }
}
