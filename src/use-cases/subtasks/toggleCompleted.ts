import { SubtaskRepository } from '@/repositories/subtasks/subtask-repository'
import { Subtask } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ToggleCompletedUseCaseRequest {
  id: string
}

export class ToggleCompletedUseCase {
  constructor(private SubtaskRepository: SubtaskRepository) {}

  async execute({ id }: ToggleCompletedUseCaseRequest): Promise<Subtask> {
    const subtask = await this.SubtaskRepository.findById(id)

    if (!subtask) {
      throw new ResourceNotFoundError()
    }

    const updatedSubtask = await this.SubtaskRepository.toggleCompleted(id)

    return updatedSubtask
  }
}
