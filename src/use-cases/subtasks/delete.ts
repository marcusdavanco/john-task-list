import { SubtaskRepository } from "@/repositories/subtasks/subtask-repository"; 
import { Subtask } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteUseCaseRequest {
  id: string, 
}

export class DeleteUseCase {
  constructor(private SubtaskRepository: SubtaskRepository) {}

  

  async execute({
    id,    
  }:DeleteUseCaseRequest) : Promise<Subtask> {

    const subtask = await this.SubtaskRepository.findById(id)

    if(!subtask){
      throw new ResourceNotFoundError()
    }

    const deletedSubtask = await this.SubtaskRepository.delete(
      id
    )

    return deletedSubtask    
  }
}