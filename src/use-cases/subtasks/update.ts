import { SubtaskRepository } from "@/repositories/subtasks/subtask-repository";
import { Subtask } from "@prisma/client";

interface UpdateUseCaseRequest {
  id: string, 
  title: string,
  due_date?: Date,
}

export class UpdateUseCase {
  constructor(private SubtaskRepository: SubtaskRepository) {}

  async execute({
    id,
    title,
    due_date    
  }:UpdateUseCaseRequest) : Promise<Subtask> {
    const updatedSubtask = await this.SubtaskRepository.update(
      id, 
      {
        title,
        due_date
      }
    )    
    return updatedSubtask    
  }
}