import { SubtaskRepository } from "@/repositories/subtasks/subtask-repository";
import { Subtask } from "@prisma/client";

interface RegisterUseCaseRequest {
  title: string;
  due_date?: Date;
  task_id: string;
}

export class RegisterUseCase {
  constructor(private SubtaskRepository: SubtaskRepository) {}

  async execute({
    title,
    due_date,
    task_id    
  }:RegisterUseCaseRequest) : Promise<Subtask> {
    const subtask = await this.SubtaskRepository.create({
      title,
      due_date,
      task: {
        connect: {
          id: task_id
        }
      }
    })

    return subtask    
  }
}