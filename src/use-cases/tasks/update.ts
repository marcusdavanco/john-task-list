import { TaskRepository } from "@/repositories/tasks/task-repository";
import { Task } from "@prisma/client";

interface UpdateUseCaseRequest {
  id: string, 
  title: string,
  due_date?: Date,
}

export class UpdateUseCase {
  constructor(private TaskRepository: TaskRepository) {}

  async execute({
    id,
    title,
    due_date    
  }:UpdateUseCaseRequest) : Promise<Task> {
    const updatedTask = await this.TaskRepository.update(
      id, 
      {
        title,
        due_date
      }
    )

    return updatedTask    
  }
}