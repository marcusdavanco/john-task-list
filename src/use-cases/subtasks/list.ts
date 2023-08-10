import { SubtaskRepository } from '@/repositories/subtasks/subtask-repository'
import { Subtask } from '@prisma/client'

interface ListUseCaseRequest {
  task_id: string
}

interface ListUseCaseResponse {
  subtasks: Subtask[]
}

export class ListUseCase {
  constructor(private SubtaskRepository: SubtaskRepository) {}

  async execute({ task_id }: ListUseCaseRequest): Promise<ListUseCaseResponse> {
    const subtasks = await this.SubtaskRepository.list(task_id)

    return {
      subtasks,
    }
  }
}
