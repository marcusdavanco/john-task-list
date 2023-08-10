import { SubtaskRepository } from "@/repositories/subtasks/subtask-repository"; 
import { Subtask } from "@prisma/client";

interface DeleteUseCaseRequest {
  id: string, 
}

export class DeleteUseCase {
  constructor(private SubtaskRepository: SubtaskRepository) {}

  async execute({
    id,    
  }:DeleteUseCaseRequest) : Promise<Subtask> {
    const deletedSubtask = await this.SubtaskRepository.delete(
      id
    )

    return deletedSubtask    
  }
}