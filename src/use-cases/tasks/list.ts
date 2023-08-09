import { TaskRepository } from "@/repositories/tasks/task-repository";
import { Task } from "@prisma/client";

interface ListUseCaseResponse {
  tasks: Task[]
}

export class ListUseCase {
  constructor(private TaskRepository: TaskRepository) {}

  async execute() : Promise<ListUseCaseResponse> {
    const tasks = await this.TaskRepository.list()

    return {
      tasks, 
    }
  }
}