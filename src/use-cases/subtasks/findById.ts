import { SubtaskRepository } from '@/repositories/subtasks/subtask-repository'
import { Subtask } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface FindByIdCaseRequest {
  id: string
}

export class FindByIdUseCase {
  constructor(private SubtaskRepository: SubtaskRepository) {}

  async execute({ id }: FindByIdCaseRequest): Promise<Subtask> {
    const subtask = await this.SubtaskRepository.findById(id)

    if (!subtask) {
      throw new ResourceNotFoundError()
    }

    return subtask
  }
}
