import { TaskRepository } from "@/repositories/tasks/task-repository";
import { Task } from "@prisma/client";

interface DeleteUseCaseRequest {
  id: string, 
}

export class DeleteUseCase {
  constructor(private TaskRepository: TaskRepository) {}

  async execute({
    id,    
  }:DeleteUseCaseRequest) : Promise<Task> {
    const deletedTask = await this.TaskRepository.delete(
      id
    )

    return deletedTask    
  }
}