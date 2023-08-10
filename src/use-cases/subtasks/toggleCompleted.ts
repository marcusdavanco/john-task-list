import { SubtaskRepository } from "@/repositories/subtasks/subtask-repository";
import { Subtask } from "@prisma/client";

interface ToggleCompletedUseCaseRequest {
  id: string, 
}

export class ToggleCompletedUseCase {
  constructor(private SubtaskRepository: SubtaskRepository) {}

  async execute({
    id,    
  }:ToggleCompletedUseCaseRequest) : Promise<Subtask> {
    const updatedSubtask = await this.SubtaskRepository.toggleCompleted(
      id
    )

    return updatedSubtask    
  }
}