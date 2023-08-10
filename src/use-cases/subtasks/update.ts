import { SubtaskRepository } from "@/repositories/subtasks/subtask-repository";
import { Subtask } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

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
    const subtask = await this.SubtaskRepository.findById(id)

    if(!subtask){
      throw new ResourceNotFoundError()
    }

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