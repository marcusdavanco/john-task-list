import { TaskRepository } from "@/repositories/tasks/task-repository";
import { Task } from "@prisma/client";

interface RegisterUseCaseRequest {
  title: string;
  due_date?: Date;
}

export class RegisterUseCase {
  constructor(private TaskRepository: TaskRepository) {}

  async execute({
    title,
    due_date    
  }:RegisterUseCaseRequest) : Promise<Task> {
    const task = await this.TaskRepository.create({
      title,
      due_date
    })

    return task    
  }
}